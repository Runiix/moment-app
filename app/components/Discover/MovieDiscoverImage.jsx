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
   const [showModal, setShowModal] = useState(modal);
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

   function toggleModal() {
      setShowModal(!showModal);
   }
   return (
      <div>
         <div className="group flex py-5" onClick={() => setShowModal(true)}>
            <img
               src={src}
               alt="Movie Scroller Image"
               className="
                    rounded-xl 
                    object-cover 
                    h-[25rem]
                    w-72
                    min-w-52
                    cursor-pointer 
                    transition-all 
                    duartion-200 
                    shadow-xl 
                    group-hover:opacity-90 
                    "
            />
            <div
               className="
                    border
                    border-slate-400
                    absolute
                    right-5/12
                    bg-gray-950
                    opacity-0
                    scale-0
                    transition-all
                    duration-200
                    delay-200
                    z-10
                    h-[25rem]
                    w-72
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

         {/*             {
             showModal && <MovieScrollerModal 
                            id={id}
                            src={src2}
                            alt={title} 
                            title={title} 
                            overview={overview} 
                            rating={rating} 
                            votecount={votecount} 
                            releasedate={releasedate} 
                            genre= {genre}
                            onClose={toggleModal} 
                            favorite={isFavorited}
                            visible= {toggleModal}/>
            } */}
      </div>
   );
}
