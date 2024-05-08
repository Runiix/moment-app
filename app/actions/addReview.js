'use server';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';

export async function addReview(formData) {
   const pathname = formData.get('pathname');
   const movieId = formData.get('movieId');
   const rating = formData.get('rating');
   const content = formData.get('content');
   const cookieStore = cookies();

   const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
         cookies: {
            get(name) {
               return cookieStore.get(name)?.value;
            },
            set(name, value, options) {
               cookieStore.set({ name, value, ...options });
            },
            remove(name, options) {
               cookieStore.set({ name, value: '', ...options });
            },
         },
      }
   );

   async function fetchUser() {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
         console.error('Error fetching user:', error);
         return null;
      }
      return user;
   }

   const user = await fetchUser();
   if (!user) {
      return { success: false, error: 'User is not authenticated!' };
   }

   const username = user.user.email.split('@')[0];

   const { error: reviewError, data } = await supabase
      .from('reviews')
      .select('*')
      .match({ username: username, movie_id: movieId });

   if (reviewError) {
      return { success: false, error: 'Error getting reviews' };
   }

   if (data[0] !== undefined) {
      const { error } = await supabase
         .from('reviews')
         .update({
            rating: rating,
            content: content,
         })
         .match({ username: username, movie_id: movieId });
      ('updating');
      if (error) {
         console.error('Error deleting Review:', error);
         return { success: false, error: 'Error deleting Review' };
      }
   } else {
      const { error } = await supabase.from('reviews').insert({
         movie_id: movieId,
         username: username,
         rating: rating,
         content: content,
      });
      if (error) {
         console.error('Error inserting Review:', error);
         return { success: false, error: 'Error inserting Review' };
      }
   }

   revalidatePath(pathname);

   return { success: true };
}
