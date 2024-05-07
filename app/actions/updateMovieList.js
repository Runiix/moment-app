'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export default async function updateMovieList(formData) {
   const listId = formData.get('list_id');
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

   const { error: updateError } = await supabaseServer
      .from('MovieLists')
      .update({
         name: title,
         description: description,
      })
      .eq('id', listId);

   if (updateError) {
      console.error('Error updating Movie List:', updateError);
      return { success: false, error: 'Error updating Movie List' };
   }
   revalidatePath(pathname);
}
