'use client';

import { StarHalf } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

export default function MoviDiscoverImage({
   u,
   src,
   title,
   overview,
   rating,
   votecount,
   releasedate,
   modal = false,
   isfavorite = false,
}) {
   const [isFavorited, setIsFavorited] = useState(isfavorite);
   const [currentUser, setCurrentUser] = useState(u);

   const checkForFavorite = async (u) => {
      try {
         const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('movie_title')
            .eq('user_id', u.id);
         if (favoritesError) return favoritesError;

         for (let i = 0; i < favoritesData.length; i++) {
            if (title === favoritesData[i].movie_title) {
               setIsFavorited(true);
            }
         }
      } catch (error) {
         console.error('error getting data', error);
      }
   };
   useEffect(() => {
      if (u) {
         setCurrentUser(u);
         checkForFavorite(u);
      }
   }, []);

   return (
      <div className="group flex w-screen py-5 items-center justify-center z-">
         <img
            src={src}
            alt="Movie Scroller Image"
            className="
                  z-20
                    rounded-xl 
                    absolute 
                    w-screen
                    max-w-[400px]
                    object-cover
                    top-20
                    sm:top-1/4
                  mx-auto                    
                  sm:h-[25rem]
                    sm:w-72
                    sm:min-w-52
                    cursor-pointer 
                    transition-all 
                    duartion-200 
                    shadow-xl 
                    sm:group-hover:opacity-90 

                    "
         />
         <div
            className="
                  mx-auto
                  max-w-[400px]
                  object-cover
                  top-20
                  sm:top-1/4
                  z-30
                    border
                    border-slate-400
                    absolute
                    sm:right-5/12
                    bg-gray-950
                    opacity-0
                    scale-0
                    transition-all
                    duration-200
                    delay-200
                    h-[70vh]
                    max-h-[600px]
                  w-screen
                    sm:h-[25rem]
                    sm:w-72
                    group-hover:scale-100
                    group-hover:opacity-100
                    hover:cursor-pointer
                    shadow-md
                    rounded-xl"
         >
            <div className="p-4">
               <div className="flex flex-col justify-between">
                  <div className="flex flex-col gap-2">
                     <h3 className="text-2xl">{title}</h3>
                     <p className="text-xs">{overview}</p>
                  </div>
                  <div className="flex gap-24 absolute bottom-2">
                     <div className="mb-4">
                        <div className="flex text-2xl items-center">
                           <div className="text-green-600 flex items-center mr-2">
                              <StarHalf />
                              <p>{rating}</p>
                           </div>
                           <p>in {votecount} Votes</p>
                        </div>

                        <p>Release-Date: {releasedate}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
