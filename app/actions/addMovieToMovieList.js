'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function addMovieToMovieList(formData) {
   const movieId = formData.get('movie_id');
   const listId = formData.get('list_id');
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
   async function fetchUser() {
      const {
         data: { user },
         error,
      } = await supabaseServer.auth.getUser();
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

   const { error: insertionError } = await supabaseServer
      .from('MovieListItems')
      .insert({
         list_id: listId,
         movie_id: movieId,
      });

   if (insertionError) {
      console.error('Error inserting Movie into List:', insertionError);
      return { success: false, error: 'Error inserting Movie into List' };
   }
}
