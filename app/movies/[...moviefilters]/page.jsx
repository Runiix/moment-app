'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MovieGrid from '../../components/Movies/MovieGrid';
import Nav from '@/app/components/Nav/Nav';
/* import getData from '@/app/actions/getData';
 */
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
   //console.log(dislikeData);
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

async function getData(supabaseServer, params, page, pageSize, query) {
   const from = page * pageSize;
   const to = (page + 1) * pageSize;
   if (params.moviefilters[0] === '1') {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .order(params.moviefilters[1], {
            ascending: JSON.parse(params.moviefilters[2]),
         })
         .ilike('title', `%${query}%`)
         .range(from, to);
      if (error) {
         // This will activate the closest `error.js` Error Boundary
         console.log(params);
         throw new Error('Failed to fetch data');
      }

      return data;
   } else {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .contains('genre_ids', [params.moviefilters[0]])
         .order(params.moviefilters[1], {
            ascending: JSON.parse(params.moviefilters[2]),
         })
         .ilike('title', `%${query}%`)
         .range(from, to);
      if (error) {
         // This will activate the closest `error.js` Error Boundary
         console.log(params);
         throw new Error('Failed to fetch data');
      }

      return data;
   }
}

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
   const query = searchParams?.query || '';
   console.log(params);

   const user = await getUser(supabaseServer);
   const genres = await getGenres();
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const page = 0;
   const pageSize = 1;
   const data = await getData(supabaseServer, params, page, pageSize, query);
   /*    const loadMoreMoviesHandler = async (page, pageSize) => {
      'use server';
      const data = await getData(supabaseServer, params, page, pageSize, query);
   }; */

   return (
      <main className="min-h-screen bg-gray-900 text-white relative font-doppio">
         <Nav user={user} />
         <section>
            <MovieGrid
               user={user}
               genres={genres}
               data={data}
               query={query}
               favorites={false}
               params={params}
               genre={params.moviefilters[0]}
               sortby={params.moviefilters[1]}
               sortorder={params.moviefilters[2]}
               favorite_titles={favoriteMovies}
               dislike_titles={dislikeMovies}
               watchlist_titles={watchlistMovies}
               /*                callBack={loadMoreMoviesHandler()}
                */
            />
         </section>
      </main>
   );
}
