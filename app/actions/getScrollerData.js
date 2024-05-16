'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export default async function getScrollerData(
   page,
   pageSize,
   titles = null,
   genre = null
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
   const from = page * pageSize;
   const to = (page + 1) * pageSize - 1;

   if (genre !== null) {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .contains('genre_ids', [genre])
         .range(from, to);
      if (error) {
         throw new Error('Failed to fetch data');
      }
      const shuffledMovies = [...data].sort(() => Math.random() - 0.5);
      const selectedMovies = shuffledMovies.slice(0, 20);

      return selectedMovies;
   } else {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .in('title', titles)
         .range(from, to);
      if (error) {
         throw new Error('Failed to fetch data');
      }

      return data;
   }
}
