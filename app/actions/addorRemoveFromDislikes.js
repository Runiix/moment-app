'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export async function addOrRemoveFromDislikes(formData) {
   const pathName = formData.get('pathname');
   const movieTitle = formData.get('title');
   const isDisliked = formData.get('isDisliked');
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

   let updatedDislike;

   if (isDisliked === 'true') {
      const { error } = await supabase
         .from('dislikes')
         .delete()
         .match({ user_id: user.id, movie_title: movieTitle });

      if (error) {
         return { success: false, error };
      }
      updatedDislike = false;
   } else {
      const { error } = await supabase
         .from('dislikes')
         .insert({ user_id: user.id, movie_title: movieTitle });
      if (error) {
         console.error('error inserting Movie', error);
      }
      updatedDislike = true;
   }
   revalidatePath(pathName);

   return { success: true, isDisliked: updatedDislike };
}
