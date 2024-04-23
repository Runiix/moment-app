'use client';

import { addOrRemoveFromFavorites } from '../../actions/addOrRemoveFromFavorites';
import { addOrRemoveFromDislikes } from '../../actions/addorRemoveFromDislikes';
import { addOrRemoveFromWatchlist } from '../../actions/addOrRemoveFromWatchlist';
import {
   Close,
   StarHalf,
   Favorite,
   FavoriteBorder,
   AddCircleOutline,
   CheckCircle,
   HeartBroken,
   HeartBrokenOutlined,
} from '@mui/icons-material';
import '../../../assets/css/scrollbar.css';
import { useState } from 'react';
import SimilarMovieGrid from './SimilarMovieGrid';
import ReviewList from './ReviewList';

export default function MovieScrollerModal({
   id,
   src,
   genres,
   genreList,
   alt,
   title,
   overview,
   rating,
   votecount,
   releasedate,
   onClose,
   genre,
   isfavorite,
   isdisliked,
   isonwatchlist,
}) {
   const [similarOrReviews, setSimilarOrReviews] = useState(false);

   const titleLength = title.length;
   const getTitleStyle = () => {
      if (titleLength > 30) {
         return 'bottom-32';
      } else if (titleLength > 20) {
         return 'bottom-32 sm:bottom-20';
      } else {
         return 'bottom-28 sm:bottom-16';
      }
   };

   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
         onClick={onClose}
      >
         <div
            className="bg-gray-900 h-screen w-[500px] sm:w-[800px] rounded-lg relative mt-20 overflow-y-scroll overflow-x-hidden hide-scrollbar"
            onClick={(e) => handleChildElementClick(e)}
         >
            <div className="relative w-full h-1/3 sm:h-1/2 hover:opacity-90 hover:cursor-pointer">
               <img
                  src={src}
                  alt={alt}
                  className="rounded-t-lg h-full object-cover w-full"
               />
               <Close
                  onClick={onClose}
                  className=" text-4xl absolute text-slate-100 left-5 top-5  hover:text-slate-400 z-50 bg-gray-900 bg-opacity-80 rounded-full hover:cursor-pointer hover:bg-opacity-70"
               />
               <div
                  className={`flex justify-between items-center relative ${getTitleStyle()} bg-gray-900 bg-opacity-40 px-5 pb-5`}
               >
                  <div className="flex items-center gap-2">
                     <h3 className="text-4xl sm:text-5xl">{title}</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center bg-gray-900 rounded-full bg-opacity-50 p-2">
                     {!isdisliked && (
                        <form
                           id="favoriteForm"
                           action={addOrRemoveFromFavorites}
                        >
                           <input type="hidden" name="title" value={title} />
                           <input
                              type="hidden"
                              name="isFavorited"
                              value={isfavorite}
                           />

                           <button
                              type="submit"
                              className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                              onClick={(e) => handleChildElementClick(e)}
                           >
                              {isfavorite ? (
                                 <Favorite className="text-green-600" />
                              ) : (
                                 <FavoriteBorder />
                              )}
                           </button>
                        </form>
                     )}

                     {!isfavorite && (
                        <form id="dislikeForm" action={addOrRemoveFromDislikes}>
                           <input type="hidden" name="title" value={title} />
                           <input
                              type="hidden"
                              name="isDisliked"
                              value={isdisliked}
                           />

                           <button
                              type="submit"
                              className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300"
                              onClick={(e) => handleChildElementClick(e)}
                           >
                              {isdisliked ? (
                                 <HeartBroken className="text-red-600" />
                              ) : (
                                 <HeartBrokenOutlined />
                              )}
                           </button>
                        </form>
                     )}

                     <form id="watchlistForm" action={addOrRemoveFromWatchlist}>
                        <input type="hidden" name="title" value={title} />
                        <input
                           type="hidden"
                           name="isOnWatchlist"
                           value={isonwatchlist}
                        />

                        <button
                           type="submit"
                           className="bg-transparent border-none text-slate-400 cursor-pointer hover:text-slate-100 hover:scale-110 transition duration-300"
                           onClick={(e) => handleChildElementClick(e)}
                        >
                           {isonwatchlist ? (
                              <CheckCircle className="text-slate-100" />
                           ) : (
                              <AddCircleOutline />
                           )}
                        </button>
                     </form>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-20 items-center">
               <div className="mx-4 mt-4 flex gap-5">
                  <div className="w-1/2">
                     <h3 className="text-2xl">Overview:</h3>
                     <p className="text-xs sm:text-base">{overview}</p>
                  </div>
                  <div>
                     <div className="flex text-2xl items-center">
                        <div className="text-green-600 flex items-center mr-2">
                           <StarHalf />
                           <p>{rating}</p>
                        </div>
                        <p>in {votecount} Votes</p>
                     </div>

                     <p>Release-Date: {releasedate}</p>
                     <p>{genreList}</p>
                  </div>
               </div>
               <div className="flex flex-col items-center text-center">
                  <div className="flex gap-10 mr-12">
                     <h3
                        className={
                           similarOrReviews
                              ? 'hover:text-green-600  hover:cursor-pointer'
                              : 'text-green-600 underline'
                        }
                        onClick={() => setSimilarOrReviews(false)}
                     >
                        Similar Movies
                     </h3>
                     <h3
                        className={
                           !similarOrReviews
                              ? 'hover:text-green-600  hover:cursor-pointer'
                              : 'text-green-600 underline'
                        }
                        onClick={() => setSimilarOrReviews(true)}
                     >
                        Reviews
                     </h3>
                  </div>
                  {!similarOrReviews ? (
                     <SimilarMovieGrid genre={genre} genres={genres} />
                  ) : (
                     <ReviewList movie_id={id} />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
