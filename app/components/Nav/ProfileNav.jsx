'use client';

import Link from 'next/link';
import { Article, Gavel, Person, ManageAccounts } from '@mui/icons-material';
import { Help } from '@mui/icons-material';

export default function ProfileNav({ mobile = false, show = false, user }) {
   const username = user.user_metadata.displayName;
   const profileLink = `/profilepage/${username}`;
   return (
      <div
         id="profileNav"
         className={
            !mobile
               ? `z-50 fixed right-5 flex flex-col items-center text-right  bg-gray-900 border border-slate-400 transition-all duration-500 ${
                    show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                 }`
               : `z-50 fixed flex left-0 flex-col w-full items-center bg-gray-900 border rounded-lg border-slate-400 p-10 px-16 transition-all duration-500 ${
                    show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                 }`
         }
      >
         <Link href={profileLink}>
            <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
               <Person />
               <p>Profile</p>
            </div>
         </Link>
         <Link href="/account">
            <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
               <ManageAccounts />
               <p>Account</p>
            </div>
         </Link>
         <Link href="/help">
            <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
               <Help />
               <p>Help</p>
            </div>
         </Link>
         <Link href="/termsofservice">
            <div className="py-2 w-52 items-center justify-center hover:underline hover:text-green-600 hover:cursor-pointer flex border-b border-slate-400">
               <Gavel />
               <p>Terms Of Service</p>
            </div>
         </Link>
         <Link href="/impressum">
            <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
               <Article />
               <p>Impressum</p>
            </div>
         </Link>
         <form action="/auth/signout" method="post">
            <button
               type="submit"
               className="text-zinc-900 bg-green-600 font-bold my-2 py-2 px-4 rounded hover:bg-green-700 hover:text-slate-100"
            >
               Sign Out
            </button>
         </form>
      </div>
   );
}
