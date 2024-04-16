'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MovieGrid from '../../components/MovieGrid';

async function getUser(supabaseServer) {
   const { data: user, error } = await supabaseServer.auth.getUser();

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
      .match({ user_id: u.user.id });
   if (favoritesError) return favoritesError;
   const favoriteTitles = favoritesData.map((favorite) => favorite.movie_title);

   return favoriteTitles;
}

async function getWatchlistData(supabaseServer, u) {
   const { data: watchlistData, error: watchlistError } = await supabaseServer
      .from('watchlist')
      .select('movie_title')
      .match({ user_id: u.user.id });
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
      .match({ user_id: u.user.id });
   if (dislikeError) return dislikeError;
   //console.log(dislikeData);
   const dislikeTitles = dislikeData.map((dislike) => dislike.movie_title);

   return dislikeTitles;
}

const handleScroll = () => {
   if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current;
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      bottom - 1 <= innerHeight;
      //console.log(bottom-1, innerHeight)
   }
};

async function getData(supabaseServer, params, from, to, query) {
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
   const from = 0;
   const to = 39;
   console.log(params);
   const user = await getUser(supabaseServer);
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const data = await getData(supabaseServer, params, from, to, query);

   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         <MovieGrid
            data={data}
            user={user}
            favorites={false}
            genre={params.moviefilters[0]}
            sortby={params.moviefilters[1]}
            sortorder={params.moviefilters[2]}
            favorite_titles={favoriteMovies}
            dislike_titles={dislikeMovies}
            watchlist_titles={watchlistMovies}
         />
      </main>
   );
}
