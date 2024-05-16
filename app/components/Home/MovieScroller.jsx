'use client';

import MovieImage from '../MovieContainer/MovieImage';
import '../../../assets/css/scrollbar.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { GridLoader } from 'react-spinners';
import getScrollerData from '@/app/actions/getScrollerData';

export default function MovieScroller({
   user,
   link,
   genres,
   scrollertitle,
   favoritemovies,
   dislikemovies,
   watchlistmovies,
   favoritetype,
   genre,
}) {
   const [offset, setOffset] = useState(0);
   const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
   const [loading, setLoading] = useState(true);
   const [movies, setMovies] = useState([]);
   const { ref, inView } = useInView();

   const loadMovies = async () => {
      try {
         let pageSize = 0;
         if (window.innerWidth > 1500) {
            pageSize = 10;
         } else {
            pageSize = 5;
         }

         const data = await getScrollerData(
            offset,
            pageSize,
            favoritetype,
            genre
         );
         setLoading(false);

         if (data.length < pageSize) {
            setLoadingMoreMovies(false);
         } else {
            setLoadingMoreMovies(true);
         }
         setMovies(data);
         setOffset(1);
      } catch (error) {
         console.error('Error loading movies:', error);
      }
   };

   useEffect(() => {
      loadMovies();
   }, []);

   useEffect(() => {
      if (inView && loadingMoreMovies) {
         loadMoreMovies();
      }
   }, [inView]);

   const loadMoreMovies = async () => {
      try {
         let pageSize = 0;
         if (window.innerWidth > 1500) {
            pageSize = 10;
         } else {
            pageSize = 5;
         }

         const data = await getScrollerData(
            offset,
            pageSize,
            favoritetype,
            genre
         );
         if (data.length < pageSize) {
            setLoadingMoreMovies(false);
         }
         setMovies((prevMovies) => [...prevMovies, ...data]);
         setOffset((prev) => prev + 1);
         if (offset >= 5) {
            setLoadingMoreMovies(false);
         }
      } catch (error) {
         console.error('Error loading more movies:', error);
      }
   };

   return (
      <div className="flex flex-col">
         <Link
            href={link}
            className="mt-[9.5rem] text-start ml-4 sm:ml-8 rounded-lg hover:bg-opacity-30 sm:text-center hover:cursor-pointer hover:text-green-600 hover:underline hover:bg-gray-900 "
         >
            {scrollertitle}
         </Link>
         {movies !== null && (
            <div className="w-[99vw] sm:w-[96vw] pl-1 sm:pl-6 xl:pl-8 pb-2 my-44 absolute overflow-x-scroll overflow-y-hidden scroll-smooth hide-scrollbar hover:first:ml-10 flex">
               <div className="flex gap-2 sm:gap-5 ">
                  {movies.map((movie, index) => (
                     <MovieImage
                        key={index}
                        id={movie.id}
                        u={user}
                        genres={genres}
                        src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
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
               {loading && (
                  <div
                     className="relative top-10 sm:top-32 left-16 sm:left-20"
                     ref={ref}
                  >
                     <GridLoader color="#16A34A" />{' '}
                  </div>
               )}
               {loadingMoreMovies && (
                  <div
                     className="relative top-12 sm:top-32 left-10 sm:left-20"
                     ref={ref}
                  >
                     <GridLoader color="#16A34A" />{' '}
                  </div>
               )}
            </div>
         )}
      </div>
   );
}
