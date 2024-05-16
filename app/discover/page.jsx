import DiscoverSlider from '../components/Discover/DiscoverSlider';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Nav from '../components/Nav/Nav';
import moviegrid from '../../assets/images/MovieGrid.png';
import Image from 'next/image';
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

export default async function Discover({ searchParams }) {
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

   const user = await getUser(supabaseServer);
   const query = searchParams?.query || '';
   const genres = await getGenres();
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);

   return (
      <main className="bg-gray-900 text-slate-100 max-h-screen max-w-screen">
         <Nav user={user} />
         {query === '' ? (
            <div>
               <DiscoverSlider user={user} />
               <Image
                  src={moviegrid}
                  className="absolute w-full object-cover h-full left-0 top-0 opacity-10"
                  alt="movies"
               />
            </div>
         ) : (
            <div>
               <MovieGrid
                  user={user}
                  genres={genres}
                  query={query}
                  homepage={true}
                  favorite_titles={favoriteMovies}
                  dislike_titles={dislikeMovies}
                  watchlist_titles={watchlistMovies}
               />
            </div>
         )}
      </main>
   );
}
