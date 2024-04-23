'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export async function addOrRemoveFromDislikes(formData) {
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
            set(name) {
               cookieStore.set({ name, value, ...options });
            },
            remove(name, options) {
               cookieStore.set({ name, value: '', ...options });
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
   console.log(movieTitle, user.id, 'isDisliked:', isDisliked);

   if (isDisliked === 'true') {
      console.log('removed from dislike', isDisliked);
      const { error } = await supabase
         .from('dislikes')
         .delete()
         .match({ user_id: user.id, movie_title: movieTitle });

      if (error) {
         return { success: false, error };
      }
   } else {
      console.log(movieTitle, user.id, 'isDisliked:', isDisliked);
      const { error } = await supabase
         .from('dislikes')
         .insert({ user_id: user.id, movie_title: movieTitle });
      if (error) {
         console.log('error inserting Movie', error);
      }
   }
   revalidatePath('/home');
   revalidatePath('/movies');
   revalidatePath('/favorites');

   return { success: true };
}
