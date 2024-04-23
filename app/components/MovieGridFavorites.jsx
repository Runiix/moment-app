'use client';

import MovieScrollerImage from './MovieScrollerImage';
import { useState, useEffect, useRef } from 'react';
import { ArrowDownward, ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';
export default function MovieGrid({
   user,
   data,
   favoritetype,
   genre,
   genres,
   sortby,
   sortorder = false,
   favorite_titles,
   dislike_titles,
   watchlist_titles,
}) {
   const [isLoading, setIsLoading] = useState(true);
   const [favoriteType, setFavoriteType] = useState(favoritetype);
   const [showFavoriteFilter, setShowFavoriteFilter] = useState(false);
   const [showSortBy, setShowSortBy] = useState(false);
   const [showGenreFilter, setShowGenreFilter] = useState(false);
   const containerRef = useRef(null);

   useEffect(() => {
      if (data === null || data === undefined) {
         setIsLoading(true);
      } else {
         setIsLoading(false);
      }
   }, [data]);

   const movieScrollerImages =
      data !== null &&
      data.map((movie, index) => (
         <MovieScrollerImage
            key={index}
            u={user}
            genres={genres}
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

   function changeFavoriteType(newFavoriteType) {
      return `/mymovies/${newFavoriteType}/${genre}/${sortby}/${sortorder}`;
   }

   function changeGenre(newGenre) {
      return `/mymovies/${favoritetype}/${newGenre}/${sortby}/${sortorder}`;
   }

   function changeSortBy(newSortBy) {
      return `/mymovies/${favoritetype}/${genre}/${newSortBy}/${sortorder}`;
   }

   function changeSortOrder(newSortOrder) {
      return `/mymovies/${favoritetype}/${genre}/${sortby}/${newSortOrder}`;
   }

   return (
      <div className=" flex flex-col gap-10 w-full items-center  absolute top-32">
         <div className="flex w-full justify-around">
            <div>
               <div>
                  <button
                     onClick={() => setShowGenreFilter(!showGenreFilter)}
                     className={`bg-zinc-900 flex justify-around border w-24 sm:w-32 border-slate-100 hover:bg-zinc-800 hover:cursor-pointer py-2  transition-all duration-200 ${
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
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              All Movies
                           </li>
                        </Link>
                        <Link href={changeGenre('28')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Action
                           </li>
                        </Link>
                        <Link href={changeGenre('12')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Adventure
                           </li>
                        </Link>
                        <Link href={changeGenre('16')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Animation
                           </li>
                        </Link>
                        <Link href={changeGenre('35')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Comedy
                           </li>
                        </Link>
                        <Link href={changeGenre('80')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Crime
                           </li>
                        </Link>
                        <Link href={changeGenre('99')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Documentary
                           </li>
                        </Link>
                        <Link href={changeGenre('18')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Drama
                           </li>
                        </Link>
                        <Link href={changeGenre('10751')}>
                           {' '}
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Family
                           </li>
                        </Link>
                        <Link href={changeGenre('14')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Fantasy
                           </li>
                        </Link>
                        <Link href={changeGenre('36')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              History
                           </li>
                        </Link>
                        <Link href={changeGenre('27')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Horror
                           </li>
                        </Link>
                        <Link href={changeGenre('10402')}>
                           {' '}
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Music
                           </li>
                        </Link>
                        <Link href={changeGenre('9648')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Mystery
                           </li>
                        </Link>
                        <Link href={changeGenre('10749')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Romance
                           </li>
                        </Link>
                        <Link href={changeGenre('878')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Science Fiction
                           </li>
                        </Link>
                        <Link href={changeGenre('10770')}>
                           {' '}
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              TV Movie
                           </li>
                        </Link>
                        <Link href={changeGenre('53')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Thriller
                           </li>
                        </Link>
                        <Link href={changeGenre('10752')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              War
                           </li>
                        </Link>
                        <Link href={changeGenre('37')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:pointer hover:text-zinc-900">
                              Western
                           </li>
                        </Link>
                     </ul>
                  </div>
               )}
            </div>
            <div>
               <div>
                  <button
                     onClick={() => setShowFavoriteFilter(!showFavoriteFilter)}
                     className={`bg-zinc-900 flex justify-around border w-28 sm:w-32 border-slate-100 hover:bg-zinc-800 hover:cursor-pointer py-2  transition-all duration-200 ${
                        !showFavoriteFilter ? 'rounded-md' : 'rounded-t-md'
                     } `}
                  >
                     {'My ' + favoriteType}
                     {showFavoriteFilter ? <ExpandLess /> : <ExpandMore />}
                  </button>
               </div>
               {showFavoriteFilter && (
                  <ul className="absolute z-10 bg-zinc-900 border border-slate-100 rounded-b-md text-center">
                     <Link href={changeFavoriteType('Movies')}>
                        <li
                           className="hover:bg-green-600 py-2  
                        w-28 sm:w-32 hover:cursor-pointer hover:text-zinc-900"
                        >
                           Movies
                        </li>
                     </Link>
                     <Link href={changeFavoriteType('Favorites')}>
                        <li className="hover:bg-green-600 py-2 w-27 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                           Favorites
                        </li>{' '}
                     </Link>

                     <Link href={changeFavoriteType('Dislikes')}>
                        <li className="hover:bg-green-600 py-2 w-27 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                           Dislikes
                        </li>{' '}
                     </Link>

                     <Link href={changeFavoriteType('Watchlist')}>
                        <li className="hover:bg-green-600 py-2 w-27 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                           Watchlist
                        </li>{' '}
                     </Link>
                  </ul>
               )}
            </div>

            <div className="flex gap-2 items-center">
               <div>
                  <div>
                     <button
                        onClick={() => setShowSortBy(!showSortBy)}
                        className={`bg-zinc-900 flex justify-around border w-24 sm:w-32 border-slate-100 hover:bg-zinc-800 hover:cursor-pointer py-2  transition-all duration-200 ${
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
                           <li className="hover:bg-green-600 py-2 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                              Rating
                           </li>{' '}
                        </Link>

                        <Link href={changeSortBy('title')}>
                           <li className="hover:bg-green-600 py-2 w-24 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                              Alphabetical
                           </li>{' '}
                        </Link>

                        <Link href={changeSortBy('popularity')}>
                           <li className="hover:bg-green-600 py-2 sm:w-32 hover:cursor-pointer hover:text-zinc-900">
                              Popularity
                           </li>{' '}
                        </Link>
                     </ul>
                  )}
               </div>
               {sortorder === 'false' ? (
                  <div>
                     <Link href={changeSortOrder('true')}>
                        <ArrowDownward className="hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 transition-all rotate-0 duration-300 border border-slate-100 rounded-md" />
                     </Link>
                  </div>
               ) : (
                  <div>
                     <Link href={changeSortOrder('false')}>
                        <ArrowDownward className="hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 transition-all duration-300 rotate-180 border border-slate-100 rounded-md" />
                     </Link>
                  </div>
               )}
            </div>
         </div>
         {isLoading ? (
            <div className="mt-32">
               <GridLoader color="#16A34A" />{' '}
            </div>
         ) : (
            <div
               className=" grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols:5 xl:grid-cols-6 2xl:grid-cols-7"
               ref={containerRef}
            >
               {movieScrollerImages}
            </div>
         )}
      </div>
   );
}
