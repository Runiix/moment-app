'use client';

import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function NavSearch({ show = false, mobile = false, id }) {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();
   const router = useRouter();

   const [showSearch, setShowSearch] = useState(show);
   const [query, setQuery] = useState('');

   const handleSearch = (term) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('query', term);
      } else {
         params.delete('query');
      }
      replace(`${pathName}?${params.toString()}`);
      setQuery(term);
   };
   useEffect(() => {
      router.refresh();
   }, [query]);

   /* Debouncing TODO doesnt work as intended */

   return (
      <div className="flex">
         <div>
            <div className="flex items-center gap-2">
               <input
                  id={id}
                  value={query}
                  className={`${
                     showSearch ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  } sm:pr-48 md:px-2 z-0 transition-all duration-300 bg-zinc-900 lg:bg-opacity-70 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 rounded-lg`}
                  type="text"
                  placeholder="Search a Movie"
                  onChange={(e) => {
                     handleSearch(e.target.value);
                  }}
               />
               {mobile === false ? (
                  <Search
                     onClick={() => setShowSearch(!showSearch)}
                     className="hover:cursor-pointer hover:text-slate-400"
                  />
               ) : (
                  <Search className="hover:cursor-pointer hover:text-slate-400" />
               )}
            </div>
         </div>
      </div>
   );
}
