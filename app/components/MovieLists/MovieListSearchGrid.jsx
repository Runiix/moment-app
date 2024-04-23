import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import BasicMovieGrid from './BasicMovieGrid';

export default function MovieListSearchGrid({
   addMovie,
   data,
   user,
   genres,
   onClose,
   movielistid,
}) {
   const searchParams = useSearchParams();
   const pathName = usePathname();
   const { replace } = useRouter();
   const [currQuery, setCurrQuery] = useState('');

   const handleSearch = (term) => {
      console.log(term);
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set('query', term);
      } else {
         params.delete('query');
      }
      replace(`${pathName}?${params.toString()}`);
      setCurrQuery(term);
   };

   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   /* Debouncing TODO doesnt work as intended */

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
         onClick={onClose}
      >
         <div
            className="p-10 bg-gray-900 h-screen w-2/3  rounded-lg relative mt-20 overflow-y-scroll overflow-x-hidden hide-scrollbar flex flex-col items-center text-center"
            onClick={(e) => handleChildElementClick(e)}
         >
            <div>
               <h2 className="text-4xl mb-4">Add Movies to your List</h2>
               <p className="text-xs">
                  Search for a movie Title and select a movie to add it to your
                  list
               </p>
            </div>
            <div>
               <div className="flex items-center gap-2 m-4">
                  <input
                     value={currQuery}
                     className="
                     px-2 z-0 transition-all duration-300 bg-zinc-900 lg:bg-opacity-70 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 rounded-lg"
                     type="text"
                     placeholder="Search a Movie"
                     onChange={(e) => {
                        handleSearch(e.target.value);
                     }}
                  />
               </div>
            </div>
            <div>
               {addMovie && (
                  <BasicMovieGrid
                     movielistid={movielistid}
                     user={user}
                     genres={genres}
                     data={data}
                     query={currQuery}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
