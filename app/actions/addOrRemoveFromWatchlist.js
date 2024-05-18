'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export async function addOrRemoveFromWatchlist(formData) {
   const pathName = formData.get('pathname');
   const movieTitle = formData.get('title');
   const isOnWatchList = formData.get('isOnWatchlist');
   const cookieStore = cookies();

   const supabase = createServerClient(
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

   const {
      data: { user },
   } = await supabase.auth.getUser();

   if (!user) {
      return { success: false, error: 'User is not authenticated!' };
   }
   movieTitle, user.id, 'isOnWatchlist:', isOnWatchList;

   let updatedWatchlist;

   if (isOnWatchList === 'true') {
      const { error } = await supabase
         .from('watchlist')
         .delete()
         .match({ user_id: user.id, movie_title: movieTitle });

      if (error) {
         return { success: false, error };
      }
      updatedWatchlist = false;
   } else {
      const { error } = await supabase
         .from('watchlist')
         .insert({ user_id: user.id, movie_title: movieTitle });
      if (error) {
         console.error('error inserting Movie', error);
      }
      updatedWatchlist = true;
   }
   revalidatePath(pathName);

   return { success: true, isOnWatchlist: updatedWatchlist };
}
