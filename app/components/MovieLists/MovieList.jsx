'use client';
import MovieImage from '../MovieContainer/MovieImage';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import MovieListSearchGrid from './MovieListSearchGrid';

export default function MovieList({
   movieList,
   data,
   movielistid,
   query,
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

   return (
      <div>
         <button
            className="border m-auto border-slate-400 rounded-lg p-14 mt-32 ml-32 text-center hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 hover:border-none "
            onClick={() => setAddMovie(!addMovie)}
         >
            {' '}
            <Add className="text-6xl" />
         </button>
         <div>
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
