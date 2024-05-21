import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import HomeHero from '../components/Home/HomeHero';
import MovieScrollerGrid from '../components/Home/MovieScrollerGrid';
import MovieGrid from '../components/Movies/MovieGrid';
import Nav from '../components/Nav/Nav';

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

const getRandomId = async (supabaseServer) => {
   try {
      const { data, error } = await supabaseServer.from('Movies').select('id');
      if (error) console.error('Error fetching Movie Ids', error);
      const IdData = data.map((movie) => movie.id);
      const randomIndex = Math.floor(Math.random() * IdData.length);
      const randomId = IdData[randomIndex];
      return randomId;
   } catch (error) {
      console.error('Error fetching Movie Ids', error);
   }
};

const getHomeHero = async (supabaseServer) => {
   const rand = await getRandomId(supabaseServer);
   try {
      if (rand !== null && rand !== undefined) {
         const { data, error } = await supabaseServer
            .from('Movies')
            .select('*')
            .eq('id', rand);
         if (error) console.error('Error getting Movie', error);
         return data;
      } else {
         console.error('Rand is undefined or null');
      }
   } catch (error) {
      console.error('Error getting data from DB:', error);
   }
};

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

export default async function Home({ searchParams }) {
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

   if (query === '') {
      const homeHeroData = await getHomeHero(supabaseServer);

      return (
         <main className="bg-gray-900 text-slate-100">
            <Nav user={user} />
            <div>
               <HomeHero data={homeHeroData} genres={genres} />
               <MovieScrollerGrid
                  user={user}
                  genres={genres}
                  favoritemovies={favoriteMovies}
                  watchlistmovies={watchlistMovies}
                  dislikemovies={dislikeMovies}
               />
            </div>
         </main>
      );
   } else {
      return (
         <main className="bg-gray-900 text-slate-100 ">
            <Nav user={user} />
            <section className="">
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
         </main>
      );
   }
}
