'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export default async function getData(params, page, pageSize, query) {
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
         throw new Error('Failed to fetch data');
      }
      revalidatePath;
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
         throw new Error('Failed to fetch data');
      }
      revalidatePath;
      return data;
   }
}
