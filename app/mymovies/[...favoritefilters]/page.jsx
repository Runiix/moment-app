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

async function getData(
   supabaseServer,
   params,
   myMovies,
   favoriteMovies,
   dislikeMovies,
   watchlistMovies
) {
   console.log(params.favoritefilters[0]);
   let list = null;
   if (params.favoritefilters[0] === 'Movies') {
      list = myMovies;
   } else if (params.favoritefilters[0] === 'Favorites') {
      list = favoriteMovies;
   } else if (params.favoritefilters[0] === 'Dislikes') {
      list = dislikeMovies;
   } else if (params.favoritefilters[0] === 'Watchlist') {
      list = watchlistMovies;
   } else {
      console.error('Invalid movielist');
      return;
   }
   const { data, error } = await supabaseServer
      .from('Movies')
      .select('*')
      .in('title', list);
   /* .contains('genre_ids', params.favoritefilters[1])
      .ilike('title', `%${params.searchParams}%`); */
   /*       .order(params.favoritefilters[2], { ascending: params.favritefilters[3] })
        .range(from, to); */
   // The return value is *not* serialized
   // You can return Date, Map, Set, etc.

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return data;
}

export default async function Favorites({ params }) {
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
   console.log(params);
   const user = await getUser(supabaseServer);
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const myMovies = getFilteredTitles();
   const data = await getData(
      supabaseServer,
      params,
      myMovies,
      favoriteMovies,
      dislikeMovies,
      watchlistMovies
   );
   /*     const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    } */

   function getFilteredTitles() {
      const filteredTitles = favoriteMovies
         .concat(dislikeMovies)
         .concat(watchlistMovies);
      return filteredTitles;
   }

   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         {/* <Nav onSearch={handleSearch} /> */}
         <MovieGrid
            data={data}
            user={user} /* searchQuery={''}  */
            favorites={true}
            favoritetype={'My ' + params.favoritefilters[0]}
            favorite_titles={favoriteMovies}
            dislike_titles={dislikeMovies}
            watchlist_titles={watchlistMovies}
         />
      </main>
   );
}
