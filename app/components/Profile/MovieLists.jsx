'use client';

import MovieListContainer from './MovieListContainer';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MovieListForm from './MovieListForm';
import { GridLoader } from 'react-spinners';

export default function MovieLists({
   username,
   paramusername,
   movielists,
   movieimages,
}) {
   const [movieListForm, setMovieListForm] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [movieLists, setMovieLists] = useState([]);

   function toggleForm() {
      setMovieListForm(!movieListForm);
   }

   useEffect(() => {
      setIsLoading(true);
      setMovieLists(movielists);
      if (movielists !== null) {
         setIsLoading(false);
      }
   }, [movielists]);

   return (
      <div className="w-full mt-20 mb-10 ">
         <div className=" flex flex-col m-auto w-3/4 border border-slate-400 shadow-xl shadow-black rounded-lg">
            <h2 className=" text-3xl lg:text-5xl m-10 ">Movie Lists: </h2>
            {!isLoading ? (
               <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 m-auto w-11/12 items-center mb-20">
                  {movieLists !== null &&
                     movieLists.map((movielist, index) => (
                        <MovieListContainer
                           key={index}
                           username={username}
                           paramusername={paramusername}
                           movielist_link={`/movielists/${username}/${movielist.id}`}
                           movielist_title={movielist.name}
                           movielist_description={movielist.description}
                           movielist_images={movieimages[index]}
                           movielist_id={movielist.id}
                        />
                     ))}
                  {username === paramusername && (
                     <button
                        className="border  border-slate-400 rounded-lg py-14 w-1/3 text-center hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 hover:border-none "
                        onClick={() => setMovieListForm(true)}
                     >
                        <Add className="text-6xl" />
                     </button>
                  )}
               </div>
            ) : (
               <div className="w-full h-[28rem] flex items-center justify-center">
                  <GridLoader color="#16A34A" />{' '}
               </div>
            )}

            {movieListForm && <MovieListForm onClose={toggleForm} />}
         </div>
      </div>
   );
}
