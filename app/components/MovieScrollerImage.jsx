'use client';

import {
   AddCircleOutline,
   CheckCircle,
   Favorite,
   HeartBroken,
   HeartBrokenOutlined,
   StarHalf,
} from '@mui/icons-material';
import { FavoriteBorder } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MovieScrollerModal from './MovieScrollerModal';
import { addOrRemoveFromFavorites } from '../actions/addOrRemoveFromFavorites';
import { addOrRemoveFromWatchlist } from '../actions/addOrRemoveFromWatchlist';
import { addOrRemoveFromDislikes } from '../actions/addorRemoveFromDislikes';

export default function MovieScrollerImage({
   id,
   src,
   src2,
   title,
   overview,
   rating,
   votecount,
   releasedate,
   genre,
   isFirst,
   modal = false,
   favoriteList,
   watchlistList,
   dislikeList,
}) {
   const [isFavorited, setIsFavorited] = useState(false);
   const [isOnWatchlist, setIsOnWatchlist] = useState(false);
   const [isDisliked, setIsDisliked] = useState(false);
   const [showModal, setShowModal] = useState(modal);

   useEffect(() => {
      const checkForFavorites = () => {
         if (favoriteList !== undefined) {
            const isFavorited = favoriteList.some(
               (item) => item.movie_title === title
            );
            setIsFavorited(isFavorited);
         }

         if (favoriteList !== undefined) {
            const isOnWatchlist = watchlistList.some(
               (item) => item.movie_title === title
            );
            setIsOnWatchlist(isOnWatchlist);
         }
         if (favoriteList !== undefined) {
            const isDisliked = dislikeList.some(
               (item) => item.movie_title === title
            );
            setIsDisliked(isDisliked);
         }
      };
      checkForFavorites();
   }, [favoriteList, watchlistList, dislikeList]);

   function toggleModal() {
      setShowModal(!showModal);
   }

   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   return (
      <div>
         <div className="group flex py-5">
            <img
               src={src}
               alt="Movie Scroller Image"
               className="
                    rounded-xl 
                    object-cover 
                    h-64
                    w-44
                    min-w-44
                    cursor-pointer 
                    transition-all 
                    duartion-500 
                    shadow-xl 
                    group-hover:opacity-90 
                    sm:group-hover:opacity-0
                    delay-200
                    "
            />
            <div
               className={`
                    absolute
                    w-64 
                    flex
                    visible
                    sm:invisible
                    transition-all
                    scale-100
                    sm:scale-0
                    opacity-100
                    sm:opacity-0
                    delay-300
                    duration-500
                    group:scale-100
                    group-hover:scale-[1.15]
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-1
                    ${isFirst ? 'group-hover:translate-x-28' : ''}
                    z-2
                    hover:cursor-pointer
                    `}
               onClick={() => setShowModal(true)}
            >
               <img
                  src={src}
                  alt={`${title} Poster`}
                  className="
                        cursor-pointer
                        object-cover
                        transition-all
                        relative
                        right-24
                        shadow-xl
                        h-64
                        w-44
                        min-w-44
                        rounded-l-md                        
                        "
               />
               <div
                  className="
                        bg-gray-950
                        z-10
                        h-64
                        w-52
                        min-w-52
                        relative
                        right-24
                        shadow-md
                        rounded-r-md"
               >
                  <div className="p-4">
                     <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                           <h3 className="text-xl">{title}</h3>
                           <p className="text-[8px]">{overview}</p>
                        </div>
                        <div className="flex gap-12 absolute bottom-2">
                           <div className="flex text-xl items-center">
                              <StarHalf />
                              <p>{rating}</p>
                           </div>
                           <div className="flex items-center">
                              {!isDisliked && (
                                 <form
                                    id="favoriteForm"
                                    action={addOrRemoveFromFavorites}
                                 >
                                    <input
                                       type="hidden"
                                       name="title"
                                       value={title}
                                    />
                                    <input
                                       type="hidden"
                                       name="isFavorited"
                                       value={isFavorited}
                                    />

                                    <button
                                       type="submit"
                                       className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                                       onClick={(e) =>
                                          handleChildElementClick(e)
                                       }
                                    >
                                       {isFavorited ? (
                                          <Favorite className="text-green-600" />
                                       ) : (
                                          <FavoriteBorder />
                                       )}
                                    </button>
                                 </form>
                              )}

                              {!isFavorited && (
                                 <form
                                    id="dislikeForm"
                                    action={addOrRemoveFromDislikes}
                                 >
                                    <input
                                       type="hidden"
                                       name="title"
                                       value={title}
                                    />
                                    <input
                                       type="hidden"
                                       name="isDisliked"
                                       value={isDisliked}
                                    />

                                    <button
                                       type="submit"
                                       className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300"
                                       onClick={(e) =>
                                          handleChildElementClick(e)
                                       }
                                    >
                                       {isDisliked ? (
                                          <HeartBroken className="text-red-600" />
                                       ) : (
                                          <HeartBrokenOutlined />
                                       )}
                                    </button>
                                 </form>
                              )}

                              <form
                                 id="watchlistForm"
                                 action={addOrRemoveFromWatchlist}
                              >
                                 <input
                                    type="hidden"
                                    name="title"
                                    value={title}
                                 />
                                 <input
                                    type="hidden"
                                    name="isOnWatchlist"
                                    value={isOnWatchlist}
                                 />

                                 <button
                                    type="submit"
                                    className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                                    onClick={(e) => handleChildElementClick(e)}
                                 >
                                    {isOnWatchlist ? (
                                       <CheckCircle className="text-green-600" />
                                    ) : (
                                       <AddCircleOutline />
                                    )}
                                 </button>
                              </form>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {showModal && (
            <MovieScrollerModal
               id={id}
               src={src2}
               alt={title}
               title={title}
               overview={overview}
               rating={rating}
               votecount={votecount}
               releasedate={releasedate}
               genre={genre}
               onClose={toggleModal}
               isfavorited={isFavorited}
               isdisliked={isDisliked}
               isonwatchlist={isOnWatchlist}
               visible={toggleModal}
            />
         )}
      </div>
   );
}
