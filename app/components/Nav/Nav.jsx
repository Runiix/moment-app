'use client';

import Link from 'next/link';
import Profile from './Profile';
import { useState } from 'react';
import { Close, Menu } from '@mui/icons-material';
import NavSearch from './NavSearch';

export default function Nav({ user, search = true }) {
   const [navbarBackground, setNavbarBackground] = useState(false);
   const [toggleMenu, setToggleMenu] = useState(false);

   const changeNavbar = () => {
      if (window.scrollY > 0) {
         setNavbarBackground(true);
      } else {
         setNavbarBackground(false);
      }
   };
   if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => changeNavbar());
   }

   return (
      <nav
         className={
            navbarBackground
               ? 'fixed w-screen top-0 left-0 p-4 z-50 flex md:justify-between items-center bg-gray-900'
               : 'fixed w-screen top-0 left-0 p-4 z-50 flex md:justify-between items-center bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900/0'
         }
      >
         <div className=" flex items-center gap-2 sm:gap-10 ">
            <Link href="/home" className="hover:cursor-pointer">
               <h1 className="text-4xl font-bold text-green-600">MoMent</h1>
               <p className="text-xs">Movie-Entertainment</p>
            </Link>
            <ul className="hidden sm:flex text-xs md:text-base gap-4 xl:gap-10 text-nowrap">
               <Link
                  href="/home"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>Homepage</li>
               </Link>

               <Link
                  href="/movies/1/vote_average/false"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>Movies</li>
               </Link>

               <Link
                  href="/mymovies/Movies/1/vote_average/false"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>My Movies</li>
               </Link>

               <Link
                  href="/mymovielists"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>Movie Lists</li>
               </Link>

               <Link
                  href="/discover"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>Discover</li>
               </Link>
            </ul>
         </div>
         <div className="flex items-center gap-5 absolute lg:static right-8 ">
            {search && (
               <div className="hidden sm:flex">
                  <NavSearch id="webSearch" />
               </div>
            )}
            <div className="hidden sm:flex lg:mr-5 hover:text-slate-400">
               <Profile user={user} />
            </div>
         </div>

         <div className="m-2 flex sm:invisible absolute right-5 top-5 hover:cursor-pointer">
            {toggleMenu ? (
               <Close
                  color="fff"
                  size={27}
                  onClick={() => setToggleMenu(false)}
                  className="bg-gray-900 bg-opacity-50 rounded-lg"
               />
            ) : (
               <Menu
                  color="fff"
                  size={27}
                  onClick={() => setToggleMenu(true)}
               />
            )}
         </div>
         <div
            className={`shadow-xl shadow-black transition-all items-center duration-500 fixed left-0 top-20 text-xl w-full rounded-lg flex flex-col gap-3 text-center bg-gray-900 border border-slate-400  ${
               toggleMenu ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            } `}
         >
            <ul className="">
               <li className="border-b w-screen rounded-t-lg border-slate-400 p-2">
                  <Profile mobile={true} user={user} />
               </li>
               {search && (
                  <li className="border-b w-screen  border-slate-400 p-2">
                     <NavSearch show={true} mobile={true} id="mobileSearch" />
                  </li>
               )}
               <Link
                  href="/home"
                  className="text-slate-100 hover:text-zinc-900   border-b border-slate-400"
               >
                  <li className="border-b w-screen  border-slate-400 hover:bg-green-600 active:bg-green-600 p-4">
                     Homepage
                  </li>
               </Link>

               <Link
                  href="/movies/1/vote_average/false"
                  className="text-slate-100 hover:text-zinc-900 border-b border-slate-400"
               >
                  <li className="border-b w-screen hover:bg-green-600 active:bg-green-600  border-slate-400 p-4">
                     Movies
                  </li>
               </Link>

               <Link
                  href="/mymovies/Movies/1/vote_average/false"
                  className="text-slate-100 hover:text-zinc-900 border-b border-slate-400"
               >
                  <li className="border-b w-screen hover:bg-green-600 active:bg-green-600  border-slate-400 p-4">
                     My Movies
                  </li>
               </Link>

               <Link
                  href="/mymovielists"
                  className="text-slate-100 hover:text-slate-300"
               >
                  <li>Movie Lists</li>
               </Link>

               <Link
                  href="/discover"
                  className="text-slate-100 hover:text-zinc-900 border-b border-slate-400"
               >
                  <li className=" w-screen hover:bg-green-600 active:bg-green-600te-400 p-4">
                     Discover
                  </li>
               </Link>
            </ul>
         </div>
      </nav>
   );
}
