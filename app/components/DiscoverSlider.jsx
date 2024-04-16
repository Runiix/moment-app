'use client';

import MovieDiscoverImage from './MovieDiscoverImage';
import {
   KeyboardArrowUp,
   KeyboardArrowLeft,
   KeyboardArrowRight,
   KeyboardArrowDown,
   Favorite,
   NotInterested,
   AddCircleOutline,
   HeartBroken,
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { addOrRemoveFromFavorites } from '../actions/addOrRemoveFromFavorites';
import { addOrRemoveFromWatchlist } from '../actions/addOrRemoveFromWatchlist';
import { addOrRemoveFromDislikes } from '../actions/addorRemoveFromDislikes';
import Draggable from 'react-draggable';

export default function DiscoverSlider({ user }) {
   const [randomMovie, setRandomMovie] = useState(null);
   const movieRef = useRef(null);
   const parentRef = useRef(null);

   const getRandomId = async () => {
      try {
         const { data, error } = await supabase.from('Movies').select('id');
         if (error) console.error('Error fetching Movie Ids', error);
         console.log(data);
         const IdData = data.map((movie) => movie.id);
         const randomIndex = Math.floor(Math.random() * IdData.length);
         const randomId = IdData[randomIndex];
         console.log('RAndomID', randomId);
         getMovieFromDB(randomId);
      } catch (error) {
         console.error('Error fetching Movie Ids', error);
      }
   };

   const getMovieFromDB = async (rand) => {
      try {
         if (rand !== null && rand !== undefined) {
            console.log('Rand', rand);
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .eq('id', rand);
            if (error) console.error('Error getting Movie', error);
            setRandomMovie(data);
            console.log(data);
         } else {
            console.error('Rand is undefined or null');
         }
      } catch (error) {
         console.error('Error getting data from DB:', error);
      }
   };

   useEffect(() => {
      getRandomId();
   }, []);

   const calculateBounds = () => {
      const parentBounds = parentRef.current.getBoundingClientRect();
      const movieBounds = movieRef.current.getBoundingClientRect();

      return {
         left: parentBounds.left - movieBounds.left,
         top: parentBounds.top - movieBounds.top,
         right: parentBounds.right - movieBounds.right,
         bottom: parentBounds.bottom - movieBounds.bottom,
      };
   };

   return (
      <div className="absolute top-44 ml-44 h-96">
         {randomMovie && (
            <div ref={parentRef} className="flex flex-col gap-10 items-center">
               <div className="group  ">
                  <form action={addOrRemoveFromFavorites}>
                     <input
                        type="hidden"
                        name="title"
                        value={randomMovie[0].title}
                     />
                     <input type="hidden" name="isFavorited" value={false} />
                     <button
                        type="submit"
                        className="z-20 scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-[2.2] transition duration-300 flex flex-col items-center"
                        onClick={() => getRandomId()}
                     >
                        <KeyboardArrowUp />
                        <p className=" text-[5px] invisible group-hover:visible bg-opacity-0">
                           {' '}
                           Add To favorites
                        </p>
                        <Favorite />
                     </button>
                  </form>
               </div>
               <div className="flex items-center gap-16">
                  <div
                     onClick={() => getRandomId()}
                     className="z-10 flex group scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-[2.2] transition duration-300 items-center"
                  >
                     <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[-90deg] relative left-9">
                        Next Movie
                     </p>
                     <KeyboardArrowLeft />
                     <NotInterested />
                  </div>
                  <Draggable
                     nodeRef={movieRef}
                     bounds={calculateBounds}
                     handle=".handle"
                  >
                     {' '}
                     <div ref={movieRef} className="handle">
                        <MovieDiscoverImage
                           id={randomMovie[0].id}
                           u={user}
                           src={`https://image.tmdb.org/t/p/w500${randomMovie[0].poster_path}`}
                           src2={`https://image.tmdb.org/t/p/original${randomMovie[0].backdrop_path}`}
                           title={randomMovie[0].title}
                           overview={randomMovie[0].overview}
                           rating={randomMovie[0].vote_average.toFixed(1)}
                           votecount={randomMovie[0].vote_count}
                           releasedate={randomMovie[0].release_date}
                           genre={randomMovie[0].genre_ids}
                        />
                     </div>
                  </Draggable>{' '}
                  <form action={addOrRemoveFromWatchlist}>
                     <input
                        type="hidden"
                        name="title"
                        value={randomMovie[0].title}
                     />
                     <input type="hidden" name="isOnWatchlist" value={false} />
                     <button
                        type="submit"
                        className="group flex items-center scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-[2.2] transition duration-300"
                        onClick={() => getRandomId()}
                     >
                        <AddCircleOutline />
                        <KeyboardArrowRight />
                        <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[90deg] relative right-10">
                           {' '}
                           Add To Watchlist
                        </p>
                     </button>
                  </form>
               </div>
               <form
                  action={addOrRemoveFromDislikes}
                  onSubmit={() => getRandomId()}
               >
                  <input
                     type="hidden"
                     name="title"
                     value={randomMovie[0].title}
                  />
                  <input type="hidden" name="isDisliked" value={false} />
                  <button
                     type="submit"
                     className="group items-center scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-[2.2] transition duration-300 flex flex-col"
                  >
                     <HeartBroken />
                     <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 ">
                        Add to Dislikes
                     </p>
                     <KeyboardArrowDown />
                  </button>
               </form>
            </div>
         )}
      </div>
   );
}
