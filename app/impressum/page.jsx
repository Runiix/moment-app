import Nav from '../components/Nav/Nav';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

async function getUser(supabaseServer) {
   const {
      data: { user },
      error,
   } = await supabaseServer.auth.getUser();

   if (error) {
      throw new Error('Failed to fetch data');
   }

   return user;
}

export default async function Impressum() {
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

   const user = await getUser(supabaseServer);
   return (
      <main className="bg-gray-900 text-slate-100">
         <Nav search={false} user={user} />
         <h1 className="absolute left-1/2 text-4xl top-20">Impressum</h1>
      </main>
   );
}
