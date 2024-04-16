'use client';

import MovieScrollerImage from './MovieScrollerImage';
import { useState, useEffect, useRef } from 'react';
import { ArrowDownward, ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';

export default function MovieGrid({
   user,
   data,
   homepage = false,
   favoritetype,
   genre,
   sortby,
   sortorder,
   favorite_titles,
   dislike_titles,
   watchlist_titles,
}) {
   const [offset, setOffset] = useState(1);
   const [isLoading, setIsLoading] = useState(true);
   const [isInView, setIsInView] = useState(false);
   const [isLast, setIsLast] = useState(false);
   const [favoriteType, setFavoriteType] = useState(favoritetype);
   const [showSortBy, setShowSortBy] = useState(false);
   const [showGenreFilter, setShowGenreFilter] = useState(false);
   const containerRef = useRef(null);
   const PAGE_COUNT = 20;

   useEffect(() => {
      if (data === null || data === undefined) {
         setIsLoading(true);
      } else {
         setIsLoading(false);
      }
   }, [data]);

   /*   const handleScroll = () => {
      if (containerRef.current && typeof window !== 'undefined') {
         const container = containerRef.current;
         const { bottom } = container.getBoundingClientRect();
         const { innerHeight } = window;
         setIsInView((prev) => bottom - 1 <= innerHeight);
         //console.log(bottom-1, innerHeight)
      }
   };
   useEffect(() => {
      if (isInView) {
         loadMoreMovies();
      }
   }, [isInView]); */

   const movieScrollerImages =
      data !== null &&
      data.map((movie, index) => (
         <MovieScrollerImage
            key={index}
            u={user}
            id={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            src2={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            title={movie.title}
            overview={movie.overview}
            rating={movie.vote_average.toFixed(1)}
            votecount={movie.vote_count}
            releasedate={movie.release_date}
            genre={movie.genre_ids}
            watchlist_titles={watchlist_titles}
            favorite_titles={favorite_titles}
            dislike_titles={dislike_titles}
            favoriteType={favoriteType}
         />
      ));
   function changeGenre(newGenre) {
      return `/movies/${newGenre}/${sortby}/${sortorder}`;
   }

   function changeSortBy(newSortBy) {
      return `/movies/${genre}/${newSortBy}/${sortorder}`;
   }

   function changeSortOrder(newSortOrder) {
      return `/movies/${genre}/${sortby}/${newSortOrder}`;
   }

   return (
      <div className=" flex flex-col gap-10 w-full items-center justify-center absolute top-32">
         {homepage === false && (
            <div className="flex w-full justify-around">
               <div>
                  <div>
                     <button
                        onClick={() => setShowGenreFilter(!showGenreFilter)}
                        className={`bg-zinc-900 flex justify-around border w-32 border-slate-100 hover:bg-zinc-800 hover:cursor-pointer py-2  transition-all duration-200 ${
                           !showGenreFilter ? 'rounded-md' : 'rounded-t-md'
                        } `}
                     >
                        {'Genre'}
                        {showGenreFilter ? <ExpandLess /> : <ExpandMore />}
                     </button>
                  </div>
                  {showGenreFilter && (
                     <div>
                        <ul className="absolute z-10 bg-zinc-900 border border-slate-100 rounded-b-md text-center">
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('1')}>All Movies</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('28')}>Action</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('12')}>Adventure</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('16')}>Animation</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('35')}>Comedy</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('80')}>Crime</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('99')}>Documentary</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('18')}>Drama</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('10751')}>Family</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('14')}>Fantasy</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('36')}>History</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('27')}>Horror</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('10402')}>Music</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('9648')}>Mystery</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('10749')}>Romance</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('878')}>
                                 Science Fiction
                              </Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('10770')}>TV Movie</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('53')}>Thriller</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('10752')}>War</Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                              <Link href={changeGenre('37')}>Western</Link>
                           </li>
                        </ul>
                     </div>
                  )}
               </div>
               <div className="flex gap-2 items-center">
                  <div>
                     <div>
                        <button
                           onClick={() => setShowSortBy(!showSortBy)}
                           className={`bg-zinc-900 flex justify-around border w-32 border-slate-100 hover:bg-zinc-800 hover:cursor-pointer py-2  transition-all duration-200 ${
                              !showSortBy ? 'rounded-md' : 'rounded-t-md'
                           } `}
                        >
                           {sortby === 'vote_average'
                              ? 'Rating'
                              : sortby === 'title'
                              ? 'Alphabetical'
                              : 'Popularity'}
                           {showSortBy ? <ExpandLess /> : <ExpandMore />}
                        </button>
                     </div>
                     {showSortBy && (
                        <ul className="absolute z-10 bg-zinc-900 border border-slate-100 rounded-b-md text-center">
                           <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                              <Link href={changeSortBy('vote_average')}>
                                 Rating
                              </Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                              <Link href={changeSortBy('title')}>
                                 Alphabetical
                              </Link>
                           </li>
                           <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                              <Link href={changeSortBy('popularity')}>
                                 Popularity
                              </Link>
                           </li>
                        </ul>
                     )}
                  </div>
                  {sortorder === 'false' ? (
                     <div>
                        <Link href={changeSortOrder('true')}>
                           <ArrowDownward className="hover:cursor transition-all rotate-0 duration-300 border border-slate-100 rounded-md" />
                        </Link>
                     </div>
                  ) : (
                     <div>
                        <Link href={changeSortOrder('false')}>
                           <ArrowDownward className="hover:cursor-pointer transition-all duration-300 rotate-180 border border-slate-100 rounded-md" />
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         )}
         {isLoading ? (
            <div className="mt-32">
               <GridLoader color="#16A34A" />{' '}
            </div>
         ) : (
            <div
               className=" grid grid-cols-1  sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols:5 xl:grid-cols-6 2xl:grid-cols-7"
               ref={containerRef}
            >
               {movieScrollerImages}
               {/*  {loadingMoreMovies && (
                  <div>
                     <GridLoader
                        className="relative left-16 top-28"
                        color="#16A34A"
                     />{' '}
                  </div>
               )} */}
            </div>
         )}
      </div>
   );
}
