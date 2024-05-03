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
import MovieModal from './MovieModal';
import { addOrRemoveFromFavorites } from '../../actions/addOrRemoveFromFavorites';
import { addOrRemoveFromWatchlist } from '../../actions/addOrRemoveFromWatchlist';
import { addOrRemoveFromDislikes } from '../../actions/addorRemoveFromDislikes';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function MovieScrollerImage({
   id,
   src,
   src2,
   title,
   overview,
   rating,
   votecount,
   releasedate,
   genres,
   genre,
   isFirst,
   modal = false,
   favorite_titles,
   watchlist_titles,
   dislike_titles,
}) {
   const [isFavorited, setIsFavorited] = useState(false);
   const [isOnWatchlist, setIsOnWatchlist] = useState(false);
   const [isDisliked, setIsDisliked] = useState(false);
   const [showModal, setShowModal] = useState(modal);
   const [genreList, setGenreList] = useState(' - ');
   const pathname = usePathname();
   const router = useRouter();

   useEffect(() => {
      populateGenreList();
      const checkForFavorites = () => {
         if (favorite_titles !== undefined) {
            const isFavorited = favorite_titles.some((item) => item === title);
            setIsFavorited(isFavorited);
         }

         if (watchlist_titles !== undefined) {
            const isOnWatchlist = watchlist_titles.some(
               (item) => item === title
            );
            setIsOnWatchlist(isOnWatchlist);
         }
         if (dislike_titles !== undefined) {
            const isDisliked = dislike_titles.some((item) => item === title);
            setIsDisliked(isDisliked);
         }
      };
      checkForFavorites();
   }, []);

   const populateGenreList = () => {
      const genreList = new Set();
      for (let i = 0; i < genres.genres.length; i++) {
         if (genre.includes(genres.genres[i].id)) {
            genreList.add(genres.genres[i].name + ' - ');
         }
      }
      setGenreList((prev) => [prev, genreList]);
   };

   function toggleModal() {
      setShowModal(!showModal);
   }

   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   return (
      <div>
         <div className="group flex sm:py-5">
            <img
               src={src}
               alt="Movie Scroller Image"
               className="
                    rounded-xl 
                    object-cover 
                    h-44
                    min-w-32
                    w-32
                    sm:h-64
                    sm:w-44
                    cursor-pointer 
                    transition-all 
                    duartion-500 
                    shadow-xl 
                    delay-200
                    "
               onClick={() => setShowModal(true)}
            />
            <div
               className={`
                    absolute
                    sm:w-64 
                    hidden
                    sm:flex
                    invisible
                    transition-all
                    scale-100
                    sm:scale-0
                    opacity-100
                    sm:opacity-0
                    delay-300
                    duration-500
                    sm:group:scale-100
                    sm:group-hover:scale-[1.15]
                    sm:group-hover:opacity-100
                    sm:group-hover:visible
                    sm:group-hover:translate-y-1
                    ${isFirst ? 'group-hover:translate-x-28' : ''}
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
                        right-[5.5rem]
                        shadow-xl
                        h-64
                        w-0
                        sm:w-44
                        min-w-44
                        rounded-l-md                        
                        "
               />
               <div
                  className="
                        bg-gray-950
                        z-10
                        h-64
                        w-0
                        sm:w-52
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
                           <p className="text-[8px]">
                              {overview.length < 300
                                 ? overview
                                 : overview.slice(0, 299) + '...'}
                           </p>
                           <p className="text-xs">{genreList}</p>
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
                                    <input
                                       type="hidden"
                                       name="pathname"
                                       value={pathname}
                                    />

                                    <button
                                       type="submit"
                                       className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
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
                                    <input
                                       type="hidden"
                                       name="pathname"
                                       value={pathname}
                                    />

                                    <button
                                       type="submit"
                                       className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300"
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
                                 <input
                                    type="hidden"
                                    name="pathname"
                                    value={pathname}
                                 />

                                 <button
                                    type="submit"
                                    className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-slate-100 hover:scale-110 transition duration-300"
                                    onClick={(e) => handleChildElementClick(e)}
                                 >
                                    {isOnWatchlist ? (
                                       <CheckCircle className="text-slate-100" />
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
            <MovieModal
               id={id}
               src={src2}
               genreList={genreList}
               genres={genres}
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
            />
         )}
      </div>
   );
}
