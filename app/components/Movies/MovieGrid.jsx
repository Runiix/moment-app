'use client';

import MovieImage from '../MovieContainer/MovieImage';
import { useState, useEffect } from 'react';
import { ArrowDownward, ExpandLess, ExpandMore } from '@mui/icons-material';
import Link from 'next/link';
import { GridLoader } from 'react-spinners';
import getData from '@/app/actions/getData';
import getHomeData from '@/app/actions/getHomeData';
import { useInView } from 'react-intersection-observer';

export default function MovieGrid({
   user,
   query,
   params,
   genres,
   homepage = false,
   genre,
   genrename,
   sortby,
   sortorder,
   favorite_titles,
   dislike_titles,
   watchlist_titles,
}) {
   const [offset, setOffset] = useState(0);
   const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
   const [loading, setLoading] = useState(true);
   const [showSortBy, setShowSortBy] = useState(false);
   const [showGenreFilter, setShowGenreFilter] = useState(false);
   const [genreFilter, setGenreFilter] = useState('Genre');
   const [movies, setMovies] = useState([]);
   const { ref, inView } = useInView();

   const loadMovies = async (offset) => {
      try {
         let pageSize = 0;
         if (window.innerWidth > 1500) {
            pageSize = 25;
         } else {
            pageSize = 20;
         }
         if (homepage) {
            const data = await getHomeData(offset, pageSize, query);
            setLoading(false);
            if (data.length < pageSize) {
               setLoadingMoreMovies(false);
            } else {
               setLoadingMoreMovies(true);
            }
            setMovies(data);
            setOffset(1);
         } else {
            const data = await getData(params, offset, pageSize, query);
            setLoading(false);

            if (data.length < pageSize) {
               setLoadingMoreMovies(false);
            } else {
               setLoadingMoreMovies(true);
            }
            setMovies(data);
            setOffset(1);
         }
      } catch (error) {
         console.error('Error loading movies:', error);
      }
   };

   useEffect(() => {
      loadMovies(0);
   }, [query]);

   useEffect(() => {
      if (inView && loadingMoreMovies) {
         loadMoreMovies();
      }
   }, [inView]);

   const loadMoreMovies = async () => {
      try {
         let pageSize = 0;
         if (window.innerWidth > 1500) {
            pageSize = 25;
         } else {
            pageSize = 20;
         }
         if (homepage) {
            const data = await getHomeData(offset, pageSize, query);
            if (data.length < pageSize) {
               setLoadingMoreMovies(false);
            }
            setMovies((prevMovies) => [...prevMovies, ...data]);
            setOffset((prev) => prev + 1);
         } else {
            const data = await getData(params, offset, pageSize, query);
            if (data.length < pageSize) {
               setLoadingMoreMovies(false);
            }
            setMovies((prevMovies) => [...prevMovies, ...data]);
            setOffset((prev) => prev + 1);
         }
      } catch (error) {
         console.error('Error loading more movies:', error);
      }
   };
   function changeGenre(newGenre) {
      return `/movies/${newGenre}/${sortby}/${sortorder}`;
   }

   function changeSortBy(newSortBy) {
      return `/movies/${genre}/${newSortBy}/${sortorder}`;
   }

   function changeSortOrder(newSortOrder) {
      return `/movies/${genre}/${sortby}/${newSortOrder}`;
   }

   useEffect(() => {
      const handleGenreFilter = () => {
         for (let i = 0; i < genres.length; i++) {
            if (genre === genres[i].id) {
               setGenreFilter(genres[i].name);
               return;
            }
         }

         setGenreFilter('Genre');
      };
      handleGenreFilter();
   }, [genre]);

   return (
      <div className=" flex flex-col gap-10 items-center absolute top-32 w-[96vw]">
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
                        {genrename}
                        {showGenreFilter ? <ExpandLess /> : <ExpandMore />}
                     </button>
                  </div>
                  {showGenreFilter && (
                     <div>
                        <ul className="absolute z-10 bg-zinc-900 border border-slate-100 rounded-b-md text-center grid grid-cols-2 divide-y-2 divide-x-2 divide-gray-950">
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
                        <ul className="absolute z-10 bg-zinc-900 border border-slate-100 rounded-b-md text-center flex flex-col divide-y-2 divide-gray-950 ">
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
         <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {movies !== null &&
               movies !== undefined &&
               movies.map((movie, index) => (
                  <MovieImage
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
                  />
               ))}
         </div>
         {loading && (
            <div className="" ref={ref}>
               <GridLoader color="#16A34A" />{' '}
            </div>
         )}
         {loadingMoreMovies && (
            <div className="" ref={ref}>
               <GridLoader color="#16A34A" />{' '}
            </div>
         )}
      </div>
   );
}
