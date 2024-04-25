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
}) {
   const [addMovie, setAddMovie] = useState(false);

   const toggleAdd = () => {
      setAddMovie(!addMovie);
   };
   useEffect(() => {
      console.log('MOvieLIST', movieList);
   }, []);

   return (
      <div className="flex flex-col items-center">
         <div className="absolute top-20 flex flex-col items-center">
            <h2 className=" text-6xl ">{movielisttitle}</h2>
            <p className="text-xs">{movielistdescription}</p>
         </div>
         <div className="absolute top-28 flex flex-wrap gap-5 items-center ">
            {params.list_params[0] === user.user_metadata.displayName && (
               <button
                  className="border m-auto border-slate-400 rounded-lg p-14 mt-32 ml-32 text-center hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 hover:border-zinc-900 "
                  onClick={() => setAddMovie(!addMovie)}
               >
                  {' '}
                  <Add className="text-6xl" />
               </button>
            )}

            <div className="flex gap-5 relative top-16">
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
                     />
                  ))}
            </div>
         </div>

         {addMovie && (
            <MovieListSearchGrid
               movielistid={movielistid}
               addMovie={addMovie}
               data={data}
               user={user}
               genres={genres}
               onClose={toggleAdd}
            />
         )}
      </div>
   );
}
