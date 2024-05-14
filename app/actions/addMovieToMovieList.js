'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export default async function addMovieToMovieList(formData) {
   const pathName = formData.get('pathname');
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

   let updatedList;

   const { data, error } = await supabaseServer
      .from('MovieListItems')
      .select('*')
      .match({ movie_id: movieId, list_id: listId });
   if (error) console.error('Error fetching mOvieListItem Data', error);
   if (data[0] === undefined) {
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
      updatedList = true;
      revalidatePath(pathName);

      return { success: true, isInList: updatedList };
   } else {
      return { success: false };
   }
}
