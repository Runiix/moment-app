'use client';

import MovieScrollerImage from './MovieScrollerImage';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { debounce } from 'lodash';

import { GridLoader } from 'react-spinners';

export default function MovieGrid({
   favorites = false,
   genre = null,
   searchQuery,
}) {
   const [movieList, setMovieList] = useState(null);
   const [sortedBy, setSortedBy] = useState('vote_average');
   const [sortOrder, setSortOrder] = useState(false);
   const [genreList, setGenreList] = useState(genre);
   const [currentUser, setCurrentUser] = useState();
   const [offset, setOffset] = useState(1);
   const [loading, setLoading] = useState(true);
   const [loadingMoreMovies, setLoadingMoreMovies] = useState(false);
   const [isInView, setIsInView] = useState(false);
   const [isLast, setIsLast] = useState(false);
   const [favoriteType, setFavoriteType] = useState('all');
   const [favoriteList, setFavoriteList] = useState();
   const [dislikeList, setDislikeList] = useState();
   const [watchlistList, setWatchlistList] = useState();
   const containerRef = useRef(null);
   const PAGE_COUNT = 20;

   const handleScroll = () => {
      if (containerRef.current && typeof window !== 'undefined') {
         const container = containerRef.current;
         const { bottom } = container.getBoundingClientRect();
         const { innerHeight } = window;
         setIsInView((prev) => bottom - 1 <= innerHeight);
         //console.log(bottom-1, innerHeight)
      }
   };

   const loadMoreMovies = async () => {
      setLoadingMoreMovies(true);
      if (movieList === null) {
         return;
      }
      const { data } = await getMoreMovies(offset, PAGE_COUNT);
      setMovieList((prevMovieList) => [...prevMovieList, ...data]);
      setLoadingMoreMovies(false);
      if (data.length < PAGE_COUNT) {
         setIsLast(true);
      }
   };

   const getMoreMovies = async () => {
      setOffset((prev) => prev + 1);
      const from = offset * PAGE_COUNT;
      const to = from + PAGE_COUNT - 1;
      // console.log("Offset:",offset,"from:", from,"to:", to)
      try {
         if (favorites === false) {
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .order(sortedBy, { ascending: sortOrder })
               .range(from, to);
            if (error) return error;
            else {
               return { data, error: null };
            }
         } else {
            const filteredTitles = await filterFavorites(currentUser);
            const filteredList = filteredTitles.map((favorite) =>
               favorite.movie_title.trim()
            );
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .order(sortedBy, { ascending: sortOrder })
               .in('title', filteredList)
               .range(from, to);
            if (error) return error;
            else {
               return { data, error: null };
            }
         }
      } catch (error) {
         console.error('Error getting data from DB:', error);
      }
   };

   const getFirstMovies = async (u) => {
      const from = 0;
      const to = PAGE_COUNT - 1;
      try {
         if (favorites === false) {
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .ilike('title', `%${searchQuery}%`)
               .order(sortedBy, { ascending: sortOrder })
               .range(from, to);
            if (error) return error;
            else {
               setMovieList(data);
               if (data.length < PAGE_COUNT) {
                  setIsLast(true);
               }
            }
         } else {
            const filteredTitles = await filterFavorites(u);
            const filteredList = filteredTitles.map((favorite) =>
               favorite.movie_title.trim()
            );
            //console.log('fileteredTitles', filteredList);
            const { data, error } = await supabase
               .from('Movies')
               .select('*')
               .contains('genre_ids', [genreList])
               .ilike('title', `%${searchQuery}%`)
               .order(sortedBy, { ascending: sortOrder })
               .in('title', filteredList)
               .range(from, to);
            if (error) return error;

            setMovieList(data);
         }
      } catch (error) {
         console.error('Error getting data from DB:', error);
      }
   };

   const filterFavorites = async (u) => {
      //console.log(favoriteType);
      const filteredTitles = [];
      if (favoriteType === 'all' || favoriteType === 'fav') {
         const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (favoritesError) return favoritesError;
         // console.log(favoritesData);
         setFavoriteList(favoritesData);
         filteredTitles.push(...favoritesData);
      }
      if (favoriteType === 'all' || favoriteType === 'dis') {
         const { data: dislikeData, error: dislikeError } = await supabase
            .from('dislikes')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (dislikeError) return dislikeError;
         //console.log(dislikeData);
         setDislikeList(dislikeData);
         filteredTitles.push(...dislikeData);
      }
      if (favoriteType === 'all' || favoriteType === 'watch') {
         const { data: watchlistData, error: watchlistError } = await supabase
            .from('watchlist')
            .select('movie_title')
            .match({ user_id: u.user.id });
         if (watchlistError) return watchlistError;
         // console.log(watchlistData);
         setWatchlistList(watchlistData);
         filteredTitles.push(...watchlistData);
      }
      console.log(filteredTitles);
      return filteredTitles;
   };
   const changeSort = (sort) => {
      setSortedBy(sort);
   };
   const changeGenre = (genre) => {
      if (genre === '1') {
         setGenreList(null);
      } else {
         setGenreList(genre);
      }
   };

   const changeType = (type) => {
      if (type === 'null') [setFavoriteType(null)];
      else setFavoriteType(type);
   };

   useEffect(() => {
      const fetchUser = async () => {
         const { data: user, error } = await supabase.auth.getUser();
         if (error) {
            console.error('Error fetching user:', error.message);
         } else {
            console.log(user);

            return user;
         }
      };
      fetchUser().then((u) => {
         setCurrentUser(u);
         getFirstMovies(u);
         setLoading(false);
      });
   }, []);

   useEffect(() => {
      if (isLast) {
         setLoadingMoreMovies(false);
      }
   }, [isLast]);

   useEffect(() => {
      const handleDebouncedScroll = debounce(
         () => !isLast && handleScroll(),
         1000
      );
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   useEffect(() => {
      if (isInView) {
         loadMoreMovies();
      }
   }, [isInView]);

   useEffect(() => {
      console.log(favoriteType);
      if (!loading) {
         setOffset(1);
         getFirstMovies(currentUser);
      }
   }, [sortedBy, genreList, sortOrder, favoriteType, searchQuery]);

   useEffect(() => {
      const hasScrollbar = window.innerWidth > document.body.clientWidth;
      if (!hasScrollbar && !isLast) {
         loadMoreMovies();
      }
      //console.log(movieList)
   }, [movieList]);

   const movieScrollerImages =
      movieList !== null &&
      movieList
         .filter((movie) => movie.title.toLowerCase().includes(searchQuery))
         .map((movie, index) => (
            <MovieScrollerImage
               key={index}
               u={currentUser}
               id={movie.id}
               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
               src2={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
               title={movie.title}
               overview={movie.overview}
               rating={movie.vote_average.toFixed(1)}
               votecount={movie.vote_count}
               releasedate={movie.release_date}
               genre={movie.genre_ids}
               watchlistList={watchlistList}
               favoriteList={favoriteList}
               dislikeList={dislikeList}
            />
         ));

   return (
      <div className="mx-[18%] sm:w-screen sm:ml-[14vw] md:ml-[14vw] lg:ml-[10vw] 2xl:ml-[5vw] sm:flex sm:flex-col">
         <div className="absolute sm:w-[80vw] top-20 justify-center md:top-32 pl-4 flex gap-4 sm:gap-5 md:gap-0 sm:justify-between mt-5 sm:m-5 items-center">
            <div>
               <select
                  name="select-genre"
                  id="select-genre"
                  placeholder="All Movies"
                  className="bg-zinc-900 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 transition-all duration-200 rounded-md"
                  onChange={(e) => changeGenre(e.target.value)}
               >
                  <option value="1">All Movies</option>
                  <option value="28">Action</option>
                  <option value="12">Adventure</option>
                  <option value="16">Animation</option>
                  <option value="35">Comedy</option>
                  <option value="80">Crime</option>
                  <option value="99">Documentary</option>
                  <option value="18">Drama</option>
                  <option value="10751">Family</option>
                  <option value="14">Fantasy</option>
                  <option value="36">History</option>
                  <option value="27">Horror</option>
                  <option value="10402">Music</option>
                  <option value="9648">Mystery</option>
                  <option value="10749">Romance</option>
                  <option value="878">Science Fiction</option>
                  <option value="10770">TV Movie</option>
                  <option value="53">Thriller</option>
                  <option value="10752">War</option>
                  <option value="37">Western</option>
               </select>
            </div>
            <div>
               {favorites && (
                  <select
                     name="favorite-type"
                     id="favorite-type"
                     placeholder="Filter"
                     className="bg-zinc-900 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 transition-all duration-200 rounded-md"
                     onChange={(e) => changeType(e.target.value)}
                  >
                     <option value="all">My Movies</option>
                     <option value="fav">Favorites</option>
                     <option value="dis">Dislikes</option>
                     <option value="watch">Watchlist</option>
                  </select>
               )}
            </div>
            <div className="flex gap-2 items-center">
               <select
                  name="sorted-by"
                  id="sorted-by"
                  placeholder="Sort By"
                  className="bg-zinc-900 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 transition-all duration-200 rounded-md"
                  onChange={(e) => changeSort(e.target.value)}
               >
                  <option value="vote_average">Rating</option>
                  <option value="title">Alphabetical</option>
                  <option value="popularity">Popularity</option>
               </select>
               {!sortOrder ? (
                  <ArrowDownward
                     onClick={() => setSortOrder(true)}
                     className="hover:cursor transition-all rotate-0 duration-300 border border-slate-100 rounded-md"
                  />
               ) : (
                  <ArrowDownward
                     onClick={() => setSortOrder(false)}
                     className="hover:cursor-pointer transition-all duration-300 rotate-180 border border-slate-100 rounded-md"
                  />
               )}
            </div>
         </div>
         <div className="absolute top-20 w-full left-0">
            {loading ? (
               <div>
                  <GridLoader
                     className="absolute left-1/2 top-1/2"
                     color="#16A34A"
                  />{' '}
               </div>
            ) : (
               <div
                  className=" grid grid-cols-1 pl-[6.1rem] pr-28 top-52 sm:flex sm:flex-wrap sm:pl-32 sm:py-5 sm:pr-16 absolute sm:left-0 sm:top-[16vh] overflow-x-hidden sm:gap-x-5"
                  ref={containerRef}
               >
                  {movieScrollerImages}
                  {loadingMoreMovies && (
                     <div>
                        <GridLoader
                           className="relative left-16 top-28"
                           color="#16A34A"
                        />{' '}
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
