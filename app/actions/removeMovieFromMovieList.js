'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function removeMovieFromMovieList(formData) {
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
   console.log('removing', data);
   if (data[0] !== undefined) {
      console.log('inner remove');
      const { error: deletionError } = await supabaseServer
         .from('MovieListItems')
         .delete()
         .match({ movie_id: movieId, list_id: listId });
      if (deletionError) {
         console.error('Error deleting Movie List Entry:', deletionError);
         return { success: false, error: 'Error deleting Movie List Entry' };
      }
      updatedList = false;
      return { success: true, isInList: updatedList };
   } else {
      return { success: false };
   }
}
