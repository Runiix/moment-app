'use client';

import MovieListContainer from './MovieListContainer';
import { supabase } from '../utils/supabaseClient';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MovieListForm from './MovieListForm';

export default function MovieLists({ user }) {
   const [movieListForm, setMovieListForm] = useState(false);
   const [movieLists, setMovieLists] = useState([]);

   async function getMovieLists(userId) {
      const { data: movieLists, error } = await supabase
         .from('MovieLists')
         .select('*')
         .eq('user_id', userId);
      if (error) {
         console.error('Error getting MovieLists');
         return null;
      } else {
         console.log('Dtata', movieLists);
         return movieLists;
      }
   }
   useEffect(() => {
      const fetchMovieList = async () => {
         const lists = await getMovieLists(user.id);
         setMovieLists(lists);
         console.log(lists);
      };
      fetchMovieList();
   }, []);

   function toggleForm() {
      setMovieListForm(!movieListForm);
   }
   /*    const movieList = await fetchMovieLists(user);
    */ return (
      <div className="w-full mt-20">
         <div className=" flex flex-col m-auto w-2/3 border border-slate-400 shadow-xl shadow-black rounded-lg">
            <h2 className=" text-3xl lg:text-5xl m-10 ">Movie Lists: </h2>
            <div className="grid grid-cols-2 gap-6 m-auto w-3/4 items-center">
               {movieLists !== null &&
                  movieLists.map((movielist, index) => (
                     <MovieListContainer
                        movielist_link={`/movielists/${user.displayname}/${movielist.id}`}
                        movielist_title={movielist.name}
                        movielist_description={movielist.description}
                        /*                   movielist_image={movielist.movielist_image}
                         */
                     />
                  ))}
               <button
                  className="border  border-slate-400 rounded-lg py-14 w-1/3 text-center hover:cursor-pointer hover:bg-green-600 hover:text-zinc-900 hover:border-none "
                  onClick={() => setMovieListForm(true)}
               >
                  {' '}
                  <Add className="text-6xl" />
               </button>
            </div>
            {movieListForm && <MovieListForm onClose={toggleForm} />}
         </div>
      </div>
   );
}
