'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export default async function addNewMovieList(formData) {
   const pathname = formData.get('pathname');
   const title = formData.get('movie_list_title');
   const description = formData.get('movie_list_description');
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
      .from('MovieLists')
      .insert({
         user_id: user.id,
         name: title,
         description: description,
      });

   if (insertionError) {
      console.error('Error inserting Movie List:', insertionError);
      return { success: false, error: 'Error inserting Movie List' };
   }
   revalidatePath(pathname);
}
