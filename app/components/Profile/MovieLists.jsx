'use client';

import MovieListContainer from './MovieListContainer';
import { supabase } from '../../utils/supabaseClient';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MovieListForm from './MovieListForm';

export default function MovieLists({ userid, username }) {
   const [movieListForm, setMovieListForm] = useState(false);
   const [movieLists, setMovieLists] = useState([]);
   const [movieImages, setMovieImages] = useState([]);

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
   async function getMovieImages(movieListId) {
      const { data: movieIds, error: idError } = await supabase
         .from('MovieListItems')
         .select('movie_id')
         .eq('list_id', movieListId);
      if (idError) console.log('Error getting Movie IDs', idError);
      console.log('MovieIds', movieIds);
      const { data: movieImageUrls, error: urlError } = await supabase
         .from('Movies')
         .select('poster_path')
         .in('id', movieIds);
      if (urlError) console.log('Error getting Image Urls', urlError);
      console.log('IMage URLS', movieImageUrls);
      return movieImageUrls;
   }
   useEffect(() => {
      const fetchMovieList = async () => {
         const lists = await getMovieLists(userid);
         console.log(lists);
         for (let i = 0; i < lists.length; i++) {
            console.log('List ID', lists[i].id);

            let images = await getMovieImages(lists[i].id);
            console.log('images', images);
            setMovieLists((prev) => [...prev, ...images]);
         }
         /*          const urls = await getMovieImages(lists);
          */ setMovieLists(lists);
         /*          setMovieImages(urls);
          */
      };
      fetchMovieList();
   }, []);

   function toggleForm() {
      setMovieListForm(!movieListForm);
   }
   return (
      <div className="w-full mt-20">
         <div className=" flex flex-col m-auto w-2/3 border border-slate-400 shadow-xl shadow-black rounded-lg">
            <h2 className=" text-3xl lg:text-5xl m-10 ">Movie Lists: </h2>
            <div className="grid grid-cols-2 gap-6 m-auto w-3/4 items-center">
               {movieLists !== null &&
                  movieLists.map((movielist, index) => (
                     <MovieListContainer
                        key={index}
                        movielist_link={`/movielists/${username}/${movielist.id}`}
                        movielist_title={movielist.name}
                        movielist_description={movielist.description}
                        /*                   movielist_images={movielist.movielist_images}
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
