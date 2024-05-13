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
   }, []);

   function toggleProfileNav() {
      setShowProfileNav(!showProfileNav);
   }

   return (
      <div ref={profileNavRef}>
         <div
            onClick={toggleProfileNav}
            className={`${
               showProfileNav && 'bg-green-700 text-zinc-900'
            }text-slate-100 flex items-center justify-center hover:cursor-pointer gap-2 p-2 z-10 rounded-full`}
         >
            <p className="hidden lg:flex">
               {user.user_metadata.displayName === null
                  ? 'loading...'
                  : user.user_metadata.displayName}
            </p>
            <Person />
         </div>
         <ProfileNav mobile={mobile} show={showProfileNav} user={user} />
      </div>
   );
}
