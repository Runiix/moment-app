import DiscoverSlider from '../components/DiscoverSlider';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getUser(supabaseServer) {
   const { data: user, error } = await supabaseServer.auth.getUser();

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return user;
}

export default async function Discover() {
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
      <main className="bg-gray-900 text-slate-100 font-doppio ">
         <DiscoverSlider user={user} />
      </main>
   );
}
