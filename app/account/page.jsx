import { Email, Password } from '@mui/icons-material';
import Nav from '../components/Nav/Nav';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import Link from 'next/link';

export default async function Account() {
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
   const {
      data: { user },
   } = await supabaseServer.auth.getUser();

   return (
      <main className="min-h-screen bg-gray-900 text-slate-100 relative p-10 flex flex-col items-center ">
         <Nav user={user} />
         <div className="flex flex-col items-left bg-gray-900 shadow-xl shadow-black border border-slate-400 rounded-xl w-4/6 p-20 mt-40">
            <h1 className="text-5xl font-bold text-slate-100 pb-10 overflow-hidden">
               Account Information and Settings
            </h1>
            <div className="flex gap-3 mb-5 items-center">
               <Email />
               <p className="border border-slate-100 rounded p-2">
                  {user.email}
               </p>
            </div>
            <div className="flex gap-3 items-center">
               <Password />
               <p className="border border-slate-100 rounded p-2">
                  ****************
               </p>
               <Link
                  href="/passwordreset"
                  className="underline hover:text-green-600"
               >
                  Change Password
               </Link>
            </div>
         </div>
      </main>
   );
}
