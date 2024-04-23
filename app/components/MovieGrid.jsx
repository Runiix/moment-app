'use client';

import MovieScrollerImage from './MovieScrollerImage';
import { useState, useEffect, useRef } from 'react';
import { ArrowDownward, ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';
import { supabase } from '../utils/supabaseClient';
/* import getData from '../actions/getData';
 */ import { useInView } from 'react-intersection-observer';

export default function MovieGrid({
   user,
   query,
   params,
   genres,
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
   const [offset, setOffset] = useState(0);
   const [isLoading, setIsLoading] = useState(false);
   const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
   const [showSortBy, setShowSortBy] = useState(false);
   const [showGenreFilter, setShowGenreFilter] = useState(false);
   const [movies, setMovies] = useState([]);
   const containerRef = useRef(null);
   const { ref, inView } = useInView();
   const pageSize = 20;

   /*    useEffect(() => {
         setIsLoading(true);
      } else {
         setIsLoading(false);
      }
   }, [movies]); */

   /*    useEffect(() => {
      const handleScroll = () => {
         if (containerRef.current && typeof window !== 'undefined') {
            const container = containerRef.current;
            const { bottom } = container.getBoundingClientRect();
            const { innerHeight } = window;
            setIsInView((prev) => bottom - 1 <= innerHeight);
            console.log(bottom - 1, innerHeight);
         }
      };
      handleScroll();
   }, []); */

   /*    const loadMoreMovies = async () => {
      try {
         const { data, error } = await getData(params, offset, pageSize, query);
         if (error) {
            throw new Error('Failed to load more movies');
         } else {
            setMovies((prevMovies) => [...prevMovies, ...data]);
            setOffset((prev) => prev + 1);
            console.log(data);
            return data;
         }
      } catch (error) {
         console.error('Error loading more movies:', error);
      }
   };

   useEffect(() => {
      if (inView) {
         setIsLoading(false);
         loadMoreMovies();
         setLoadingMoreMovies(true);
      }
   }, [inView]); */

   /*    useEffect(() => {
      if (isInView) {
         setLoadingMoremovies(true);
         setOffset((prev) => prev + 1);
         getMovies();
         setLoadingMoremovies(false);
      }
   }, [isInView]); */

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
      <div className=" flex flex-col gap-10 w-[100vw] sm:w-[94vw] lg:w-[96vw] items-center absolute top-32">
         {homepage === false && (
            <div className="flex w-screen flex-wrap justify-around">
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
                           <Link href={changeGenre('1')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 All Movies
                              </li>
                           </Link>
                           <Link href={changeGenre('28')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Action
                              </li>
                           </Link>
                           <Link href={changeGenre('12')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Adventure
                              </li>
                           </Link>
                           <Link href={changeGenre('16')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Animation
                              </li>
                           </Link>
                           <Link href={changeGenre('35')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Comedy
                              </li>
                           </Link>
                           <Link href={changeGenre('80')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Crime
                              </li>
                           </Link>
                           <Link href={changeGenre('99')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Documentary
                              </li>
                           </Link>
                           <Link href={changeGenre('18')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Drama
                              </li>
                           </Link>
                           <Link href={changeGenre('10751')}>
                              {' '}
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Family
                              </li>
                           </Link>
                           <Link href={changeGenre('14')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Fantasy
                              </li>
                           </Link>
                           <Link href={changeGenre('36')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 History
                              </li>
                           </Link>
                           <Link href={changeGenre('27')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Horror
                              </li>
                           </Link>
                           <Link href={changeGenre('10402')}>
                              {' '}
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Music
                              </li>
                           </Link>
                           <Link href={changeGenre('9648')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Mystery
                              </li>
                           </Link>
                           <Link href={changeGenre('10749')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Romance
                              </li>
                           </Link>
                           <Link href={changeGenre('878')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Science Fiction
                              </li>
                           </Link>
                           <Link href={changeGenre('10770')}>
                              {' '}
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 TV Movie
                              </li>
                           </Link>
                           <Link href={changeGenre('53')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Thriller
                              </li>
                           </Link>
                           <Link href={changeGenre('10752')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 War
                              </li>
                           </Link>
                           <Link href={changeGenre('37')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:pointer hover:text-zinc-900">
                                 Western
                              </li>
                           </Link>
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
                           <Link href={changeSortBy('vote_average')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                                 Rating
                              </li>{' '}
                           </Link>

                           <Link href={changeSortBy('title')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                                 Alphabetical
                              </li>{' '}
                           </Link>

                           <Link href={changeSortBy('popularity')}>
                              <li className="hover:bg-green-600 py-2 w-32 hover:cursor-pointer hover:text-zinc-900">
                                 Popularity
                              </li>{' '}
                           </Link>
                        </ul>
                     )}
                  </div>
                  {sortorder === 'false' ? (
                     <button className="hover:bg-green-600p ">
                        <Link href={changeSortOrder('true')}>
                           <ArrowDownward className="hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 transition-all rotate-0 duration-300 border border-slate-100 rounded-md" />
                        </Link>
                     </button>
                  ) : (
                     <div>
                        <Link href={changeSortOrder('false')}>
                           <ArrowDownward className="hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 transition-all duration-300 rotate-180 border border-slate-100 rounded-md" />
                        </Link>
                     </div>
                  )}
               </div>
            </div>
         )}
         <div className="flex flex-col">
            {isLoading && (
               <div className="mt-32" ref={ref}>
                  <GridLoader color="#16A34A" />{' '}
               </div>
            )}
            <div
               className="grid grid-cols-1 gap-x-3 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7"
               ref={containerRef}
            >
               {data !== null &&
                  data !== undefined &&
                  !loadingMoreMovies &&
                  data.map((movie, index) => (
                     <MovieScrollerImage
                        key={index}
                        u={user}
                        id={movie.id}
                        genres={genres}
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
                        favoriteType={favoritetype}
                     />
                  ))}
            </div>
         </div>
      </div>
   );
}
