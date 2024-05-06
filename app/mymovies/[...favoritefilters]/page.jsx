'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MovieGridFavorites from '../../components/MyMovies/MovieGridFavorites';
import Nav from '@/app/components/Nav/Nav';

async function getUser(supabaseServer) {
   const {
      data: { user },
      error,
   } = await supabaseServer.auth.getUser();

   if (error) {
      // This will activate the closest `error.js` Error Boundary
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
   //(dislikeData);
   const dislikeTitles = dislikeData.map((dislike) => dislike.movie_title);

   return dislikeTitles;
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

const getGenreName = (genre, genres) => {
   for (let i = 0; i < 19; i++) {
      if (String(genres.genres[i].id) === genre) {
         return genres.genres[i].name;
      }
   }
   return 'Genres';
};

export default async function Favorites({ params, searchParams }) {
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
   const genres = await getGenres();
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const myMovies = getFilteredTitles();
   const genreName = await getGenreName(params.favoritefilters[1], genres);

   function getFilteredTitles() {
      const filteredTitles = favoriteMovies
         .concat(dislikeMovies)
         .concat(watchlistMovies);
      return filteredTitles;
   }

   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         <Nav user={user} />
         <section>
            <MovieGridFavorites
               user={user}
               genres={genres}
               query={query}
               favorites={true}
               params={params}
               genrename={genreName}
               favoritetype={params.favoritefilters[0]}
               genre={params.favoritefilters[1]}
               sortby={params.favoritefilters[2]}
               sortorder={params.favoritefilters[3]}
               favorite_titles={favoriteMovies}
               dislike_titles={dislikeMovies}
               watchlist_titles={watchlistMovies}
               mymovies={myMovies}
            />
         </section>
      </main>
   );
}
