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
import { supabase } from '../../utils/supabaseClient';
import { addOrRemoveFromFavorites } from '../../actions/addOrRemoveFromFavorites';
import { addOrRemoveFromWatchlist } from '../../actions/addOrRemoveFromWatchlist';
import { addOrRemoveFromDislikes } from '../../actions/addOrRemoveFromDislikes';
import Draggable from 'react-draggable';
import { usePathname } from 'next/navigation';

export default function DiscoverSlider({ user }) {
   const [randomMovie, setRandomMovie] = useState(null);
   const [translate, setTranslate] = useState({ x: 0, y: 0 });

   const movieRef = useRef(null);
   const parentRef = useRef(null);
   const pathname = usePathname();

   const getRandomId = async () => {
      try {
         const { data, error } = await supabase.from('Movies').select('id');
         if (error) console.error('Error fetching Movie Ids', error);
         const IdData = data.map((movie) => movie.id);
         const randomIndex = Math.floor(Math.random() * IdData.length);
         const randomId = IdData[randomIndex];
         getMovieFromDB(randomId);
      } catch (error) {
         console.error('Error fetching Movie Ids', error);
      }
   };

   const getMovieFromDB = async (rand) => {
      try {
         if (rand !== null && rand !== undefined) {
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .eq('id', rand);
            if (error) console.error('Error getting Movie', error);
            setRandomMovie(data);
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
   useEffect(() => {
      setTranslate({ x: 0, y: 0 });
   }, [randomMovie]);

   const handleArrowClick = (direction) => {
      switch (direction) {
         case 'up':
            setTranslate({ x: 0, y: translate.y - 200 });
            break;
         case 'left':
            setTranslate({ x: translate.x - 200, y: 0 });
            break;
         case 'right':
            setTranslate({ x: translate.x + 200, y: 0 });
            break;
         case 'down':
            setTranslate({ x: 0, y: translate.y + 200 });
            break;
         default:
            break;
      }
      getRandomId();
   };

   return (
      <div className="max-w-screen">
         {randomMovie && (
            <div>
               <div
                  style={{
                     transform: `translate(${translate.x}px, ${translate.y}px)`,
                     transition: 'transform 0.5s ease',
                  }}
               >
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
               <div
                  ref={parentRef}
                  className="flex flex-col w-screen h-[54vh] sm:h-[74vh] max-h-[500px] sm:max-h-screen justify-between items-center mt-16"
               >
                  <div className="group z-40">
                     <form action={addOrRemoveFromFavorites}>
                        <input
                           type="hidden"
                           name="title"
                           value={randomMovie[0].title}
                        />
                        <input type="hidden" name="isFavorited" value={false} />
                        <input type="hidden" name="pathname" value={pathname} />
                        <button
                           type="submit"
                           className="scale-[2] flex flex-col items-center hover:text-green-600"
                           onClick={() => handleArrowClick('up')}
                           aria-label="Add Movie To Favorites"
                        >
                           <KeyboardArrowUp />
                           <Favorite />
                           <p className=" text-[5px] invisible group-hover:visible bg-opacity-0">
                              {' '}
                              Add To favorites
                           </p>
                        </button>
                     </form>
                  </div>
                  <div className="flex justify-between sm:justify-around w-[75vw] z-40">
                     <div
                        onClick={() => handleArrowClick('left')}
                        className="scale-[2] flex items-center hover:cursor-pointer hover:text-red-600 group"
                     >
                        <KeyboardArrowLeft />
                        <NotInterested />
                        <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[-90deg] relative right-10">
                           Next Movie
                        </p>
                     </div>
                     <form action={addOrRemoveFromWatchlist}>
                        <input
                           type="hidden"
                           name="title"
                           value={randomMovie[0].title}
                        />
                        <input
                           type="hidden"
                           name="isOnWatchlist"
                           value={false}
                        />
                        <input type="hidden" name="pathname" value={pathname} />
                        <button
                           type="submit"
                           className="scale-[2] flex items-center hover:text-green-600 group"
                           onClick={() => handleArrowClick('right')}
                           aria-label="Add Movie To Watchlist"
                        >
                           <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[90deg] relative left-12">
                              {' '}
                              Add To Watchlist
                           </p>
                           <AddCircleOutline />
                           <KeyboardArrowRight />
                        </button>
                     </form>
                  </div>
                  <div className="group z-40 ">
                     <form
                        action={addOrRemoveFromDislikes}
                        onSubmit={() => handleArrowClick('down')}
                     >
                        <input
                           type="hidden"
                           name="title"
                           value={randomMovie[0].title}
                        />
                        <input type="hidden" name="isDisliked" value={false} />
                        <input type="hidden" name="pathname" value={pathname} />
                        <button
                           type="submit"
                           className="scale-[2] flex flex-col items-center hover:text-red-600"
                           aria-label="Add Movie To Dislikes"
                        >
                           <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 ">
                              Add to Dislikes
                           </p>
                           <HeartBroken />

                           <KeyboardArrowDown />
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}
