'use client';

import Link from 'next/link';
import Profile from './Profile';
import { useState } from 'react';
import { Close, Menu } from '@mui/icons-material';
import NavSearch from './navSearch';

export default function Nav({ onSearch }) {
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
               ? 'fixed w-screen top-0 left-0 p-4 z-10 flex lg:justify-between items-center bg-gray-900'
               : 'fixed w-screen top-0 left-0 p-4 z-10 flex lg:justify-between items-center bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900/0'
         }
      >
         <div className=" flex items-center gap-10 ">
            <Link href="/home" className="hover:cursor-pointer">
               <h1 className="text-4xl font-bold text-green-600">MoMent</h1>
               <p className="text-xs">Movie-Entertainment</p>
            </Link>
            <ul className="hidden sm:flex gap-4 lg:gap-10">
               <li>
                  <Link
                     href="/home"
                     className="text-slate-100 hover:text-slate-300"
                  >
                     Homepage
                  </Link>
               </li>
               <li>
                  <Link
                     href="/movies"
                     className="text-slate-100 hover:text-slate-300"
                  >
                     Movies
                  </Link>
               </li>
               <li>
                  <Link
                     href="/favorites"
                     className="text-slate-100 hover:text-slate-300"
                  >
                     My Movies
                  </Link>
               </li>
               <li>
                  <Link
                     href="/discover"
                     className="text-slate-100 hover:text-slate-300"
                  >
                     Discover
                  </Link>
               </li>
            </ul>
         </div>
         <div className="flex items-center gap-5 absolute lg:static right-8">
            <div className="hidden sm:flex">
               <NavSearch onSearch={onSearch} id="webSearch" />
            </div>

            <div className="hidden sm:flex lg:mr-5">
               <Profile />
            </div>
         </div>

         <div className="m-2 flex sm:invisible absolute right-10 top-5 hover:cursor-pointer">
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

            <div
               className={`transition-all duration-500 ${
                  toggleMenu ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
               } `}
            >
               <ul className="absolute text-xl right-0 top-8 p-4 flex flex-col items-center gap-3  text-center bg-gray-900 border border-slate-400 ">
                  <li className="mb-2 border-b border-slate-400">
                     <Profile mobile={true} />
                  </li>
                  <li>
                     <NavSearch
                        onSearch={onSearch}
                        show={true}
                        mobile={true}
                        id="mobileSearch"
                     />
                  </li>
                  <li className="mb-2">
                     <Link
                        href="/home"
                        className="text-slate-100 hover:text-slate-400 border-b border-slate-400"
                     >
                        Homepage
                     </Link>
                  </li>
                  <li className="mb-2">
                     <Link
                        href="/movies"
                        className="text-slate-100 hover:text-slate-400 border-b border-slate-400"
                     >
                        Movies
                     </Link>
                  </li>
                  <li className="mb-2">
                     <Link
                        href="/favorites"
                        className="text-slate-100 hover:text-slate-400 border-b border-slate-400"
                     >
                        My Movies
                     </Link>
                  </li>
                  <li>
                     <Link
                        href="/discover"
                        className="text-slate-100 hover:text-slate-300"
                     >
                        Discover
                     </Link>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
}
