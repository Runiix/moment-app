'use client';
import MovieImage from '../MovieContainer/MovieImage';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MovieListSearchGrid from './MovieListSearchGrid';

export default function MovieList({
   movieList,
   data,
   movielistid,
   movielisttitle,
   movielistdescription,
   query,
   params,
   user,
   genres,
   favorite_titles,
   dislike_titles,
   watchlist_titles,
   username,
   paramusername,
}) {
   const [addMovie, setAddMovie] = useState(false);

   const toggleAdd = () => {
      setAddMovie(!addMovie);
   };

   return (
      <div className="flex flex-col items-center">
         <div className="absolute top-20 flex flex-col gap-4 items-center justify-center">
            <h2 className=" text-center sm:text-left text-3xl sm:text-6xl ">
               {movielisttitle}
            </h2>
            <p className="text-xs text-center">{movielistdescription}</p>
         </div>
         <div className="absolute top-28 flex flex-col w-full gap-5 items-center ">
            <div>
               {params.list_params[0] === user.user_metadata.displayName && (
                  <button
                     className="border border-slate-400 rounded-lg py-2 w-[90vw] mt-24 text-center hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 hover:border-zinc-900 "
                     onClick={() => setAddMovie(!addMovie)}
                  >
                     {' '}
                     <Add className="text-6xl" />
                  </button>
               )}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-x-6  lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 ">
               {movieList !== null &&
                  movieList !== undefined &&
                  movieList.map((movie, index) => (
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
                        list={true}
                        movielistid={movielistid}
                        username={username}
                        paramusername={paramusername}
                     />
                  ))}
            </div>
         </div>

         {addMovie && (
            <MovieListSearchGrid
               movieList={movieList}
               movielistid={movielistid}
               addMovie={addMovie}
               data={data}
               user={user}
               genres={genres}
               onClose={toggleAdd}
               query={query}
            />
         )}
      </div>
   );
}
