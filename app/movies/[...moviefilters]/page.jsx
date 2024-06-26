'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MovieGrid from '../../components/Movies/MovieGrid';
import Nav from '@/app/components/Nav/Nav';
import saveMoviesToDb from '../../actions/saveMoviesToDb';

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

async function getGenres() {
   try {
      const response = await fetch(
         'https://api.themoviedb.org/3/genre/movie/list?api_key=77ea84f8c960e9d8d7e658a914bd428b&language=en'
      );
      if (!response.ok) {
         throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
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

export default async function Movies({ params, searchParams }) {
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
   /*    const safe = await saveMoviesToDb();
    */
   const query = searchParams?.query || '';
   const user = await getUser(supabaseServer);
   const genres = await getGenres();
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const genreName = await getGenreName(params.moviefilters[0], genres);

   return (
      <main className="w-screen bg-gray-900 text-white">
         <Nav user={user} />
         <section>
            <MovieGrid
               user={user}
               genres={genres}
               query={query}
               favorites={false}
               params={params}
               genrename={genreName}
               genre={params.moviefilters[0]}
               sortby={params.moviefilters[1]}
               sortorder={params.moviefilters[2]}
               favorite_titles={favoriteMovies}
               dislike_titles={dislikeMovies}
               watchlist_titles={watchlistMovies}
            />
         </section>
      </main>
   );
}
