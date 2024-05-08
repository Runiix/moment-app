'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Nav from '@/app/components/Nav/Nav';
import MovieLists from '@/app/components/Profile/MovieLists';
import MovieGrid from '../components/Movies/MovieGrid';

async function getUser(supabaseServer) {
   const {
      data: { user },
      error,
   } = await supabaseServer.auth.getUser();

   if (error) {
      throw new Error('Failed to fetch data');
   }

   return user;
}

async function getFavoriteData(supabaseServer, u) {
   const { data: favoritesData, error: favoritesError } = await supabaseServer
      .from('favorites')
      .select('movie_title')
      .match({ user_id: u.id });
   if (favoritesError) return favoritesError;
   const favoriteTitles = favoritesData.map((favorite) => favorite.movie_title);

   return favoriteTitles;
}

async function getWatchlistData(supabaseServer, u) {
   const { data: watchlistData, error: watchlistError } = await supabaseServer
      .from('watchlist')
      .select('movie_title')
      .match({ user_id: u.id });
   if (watchlistError) return watchlistError;
   const watchlistTitles = watchlistData.map(
      (watchlist) => watchlist.movie_title
   );
   return watchlistTitles;
}

async function getDislikeData(supabaseServer, u) {
   const { data: dislikeData, error: dislikeError } = await supabaseServer
      .from('dislikes')
      .select('movie_title')
      .match({ user_id: u.id });
   if (dislikeError) return dislikeError;
   const dislikeTitles = dislikeData.map((dislike) => dislike.movie_title);

   return dislikeTitles;
}

async function getMovieLists(supabaseServer, userId) {
   const { data: movieLists, error } = await supabaseServer
      .from('MovieLists')
      .select('*')
      .eq('user_id', userId);
   if (error) console.error('Error getting MovieLists');
   return movieLists;
}
async function getMovieIds(supabaseServer, movieListId) {
   const { data: movieIds, error: idError } = await supabaseServer
      .from('MovieListItems')
      .select('movie_id')
      .eq('list_id', movieListId);
   if (idError) console.error('Error getting Movie IDs', idError);
   return movieIds;
}

async function getMovieImage(supabaseServer, movieIds) {
   const { data: movieImageUrls, error: urlError } = await supabaseServer
      .from('Movies')
      .select('poster_path')
      .in('id', movieIds);
   if (urlError) console.error('Error getting Image Urls', urlError);
   return movieImageUrls;
}

async function getGenres() {
   try {
      const response = await fetch(
         'https://api.themoviedb.org/3/genre/movie/list?api_key=77ea84f8c960e9d8d7e658a914bd428b&language=en'
      );
      if (!response.ok) {
         throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      // Update movie list state with fetched data
      return data;
   } catch (error) {
      console.error('Error fetching genres:', error);
   }
}

export default async function MyMovieLists({ params, searchParams }) {
   const cookieStore = cookies();

   const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
         cookies: {
            get(name) {
               return cookieStore.get(name)?.value;
            },
         },
      }
   );
   const query = searchParams?.query || '';
   const user = await getUser(supabaseServer);
   const username = user.user_metadata.displayName;
   const userId = user.id;
   const genres = await getGenres();

   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);

   const movieLists = await getMovieLists(supabaseServer, userId);
   const listIds = movieLists.map((item) => item.id);
   const allMovieIds = [];
   for (const listId of listIds) {
      const movieIdData = await getMovieIds(supabaseServer, listId);
      const movieIds = movieIdData.map((item) => item.movie_id);
      allMovieIds.push(movieIds);
   }

   const allMovieImages = [];
   for (const idlist of allMovieIds) {
      const imageData = await getMovieImage(supabaseServer, idlist);
      const movieImages = imageData.map((item) => item.poster_path);
      allMovieImages.push(movieImages);
   }
   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         <Nav user={user} />
         {query === '' ? (
            <section className="flex mt-20">
               <MovieLists
                  username={username}
                  paramusername={username}
                  movielists={movieLists}
                  movieimages={allMovieImages}
               />
            </section>
         ) : (
            <section>
               <MovieGrid
                  user={user}
                  genres={genres}
                  query={query}
                  homepage={true}
                  favorite_titles={favoriteMovies}
                  dislike_titles={dislikeMovies}
                  watchlist_titles={watchlistMovies}
               />
            </section>
         )}
      </main>
   );
}
