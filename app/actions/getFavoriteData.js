'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export default async function getFavoriteData(
   params,
   page,
   pageSize,
   query,
   favoriteMovies,
   dislikeMovies,
   watchlistMovies,
   myMovies
) {
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
   const from = page * pageSize;
   const to = (page + 1) * pageSize - 1;
   if (params.favoritefilters[1] === '1') {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .in('title', list)
         .order(params.favoritefilters[2], {
            ascending: JSON.parse(params.favoritefilters[3]),
         })
         .ilike('title', `%${query}%`)
         .range(from, to);
      if (error) {
         throw new Error('Failed to fetch data');
      }

      return data;
   } else {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .in('title', list)
         .contains('genre_ids', [params.favoritefilters[1]])
         .order(params.favoritefilters[2], {
            ascending: JSON.parse(params.favoritefilters[3]),
         })
         .ilike('title', `%${query}%`)
         .range(from, to);
      if (error) {
         throw new Error('Failed to fetch data');
      }

      return data;
   }
}
