'use client';

import { useEffect, useState, useRef } from 'react';
import { Person } from '@mui/icons-material';
import ProfileNav from './ProfileNav';

export default function Profile({ mobile = false, user }) {
   const [showProfileNav, setShowProfileNav] = useState(false);
   let profileNavRef = useRef();

   useEffect(() => {
      let handler = (e) => {
         if (showProfileNav && !profileNavRef.current.contains(e.target)) {
            setShowProfileNav(false);
         }
      };
      document.addEventListener('mousedown', handler);

      return () => {
         document.removeEventListener('mousedown', handler);
      };
   });

   const username = user.email.split('@')[0];

   function toggleProfileNav() {
      setShowProfileNav(!showProfileNav);
   }

   return (
      <div ref={profileNavRef}>
         <div
            onClick={toggleProfileNav}
            className="text-slate-100 flex hover:cursor-pointer p-2 z-10 hover:text-slate-400 hover:bg-opacity-50 rounded-full"
         >
            <p className="hidden lg:flex">
               {username === null ? 'loading...' : username}
            </p>
            <Person />
         </div>
         <ProfileNav mobile={mobile} show={showProfileNav} user={user} />
      </div>
   );
}
