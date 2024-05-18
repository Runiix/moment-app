'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export async function addOrRemoveFromFavorites(formData) {
   const pathName = formData.get('pathname');
   const movieTitle = formData.get('title');
   const isFavorited = formData.get('isFavorited');
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

   let updatedfavorites;

   if (isFavorited === 'true') {
      'removed from favorites', isFavorited;
      const { error } = await supabase
         .from('favorites')
         .delete()
         .match({ user_id: user.id, movie_title: movieTitle });

      if (error) {
         return { success: false, error };
      }
      updatedfavorites = false;
   } else {
      const { error } = await supabase
         .from('favorites')
         .insert({ user_id: user.id, movie_title: movieTitle });
      if (error) {
         console.error('error inserting Movie', error);
      }
      updatedfavorites = true;
   }

   revalidatePath(pathName);

   return { success: true, isFavorited: updatedfavorites };
}
