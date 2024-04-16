'use client';

import { useState, useEffect } from 'react';
import MovieScrollerImage from './MovieScrollerImage';
import '../../assets/css/scrollbar.css';
import { supabase } from '../utils/supabaseClient';
import { userAgent } from 'next/server';
import Link from 'next/link';

export default function MovieScroller({
   user,
   link,
   scrollertitle,
   isfavorite,
   favoritemovies,
   dislikemovies,
   watchlistmovies,
   data,
}) {
   return (
      <div className="flex flex-col ">
         <Link
            href={link}
            className="mt-40 ml-8 rounded-lg hover:bg-opacity-30 text-center hover:cursor-pointer hover:text-green-600 hover:underline hover:bg-gray-900 p-0"
         >
            {scrollertitle}
         </Link>
         {data !== null && (
            <div className="w-[96vw] pl-6 xl:pl-8 pb-2 my-44 absolute overflow-x-scroll overflow-y-hidden scroll-smooth hide-scrollbar hover:first:ml-10">
               <div className="flex gap-5 ">
                  {data.map((movie, index) => (
                     <MovieScrollerImage
                        key={index}
                        id={movie.id}
                        u={user}
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        src2={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        title={movie.title}
                        overview={movie.overview}
                        rating={movie.vote_average.toFixed(1)}
                        votecount={movie.vote_count}
                        releasedate={movie.release_date}
                        genre={movie.genre_ids}
                        isFirst={index === 0}
                        watchlist_titles={watchlistmovies}
                        favorite_titles={favoritemovies}
                        dislike_titles={dislikemovies}
                     />
                  ))}
               </div>
            </div>
         )}
      </div>
   );
}
