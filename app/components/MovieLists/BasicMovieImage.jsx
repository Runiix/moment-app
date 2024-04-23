'use client';

import { AddCircleOutline, CheckCircle, StarHalf } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import addMovieToMovieList from '@/app/actions/addMovieToMovieList';

export default function BasicMovieImage({
   id,
   src,
   title,
   overview,
   rating,
   genres,
   genre,
   movielistid,
}) {
   const [genreList, setGenreList] = useState(' - ');

   useEffect(() => {
      populateGenreList();
   }, []);

   const populateGenreList = () => {
      for (let i = 0; i < genres.genres.length; i++) {
         if (genre.includes(genres.genres[i].id)) {
            let temp = genres.genres[i].name + ' - ';
            setGenreList((prev) => [...prev, temp]);
         }
      }
   };

   return (
      <div>
         <div className="group flex py-5">
            <img
               src={src}
               alt="Movie Scroller Image"
               className="
                    rounded-xl 
                    object-cover 
                    h-64
                    w-44
                    min-w-44
                    transition-all 
                    duartion-500 
                    shadow-xl 
                    delay-200
                    "
            />
            <div
               className={`
                    absolute
                    w-1
                    sm:w-64 
                    flex
                    invisible
                    transition-all
                    scale-100
                    sm:scale-0
                    opacity-100
                    sm:opacity-0
                    delay-300
                    duration-500
                    sm:group:scale-100
                    sm:group-hover:scale-[1.15]
                    sm:group-hover:opacity-100
                    sm:group-hover:visible
                    sm:group-hover:translate-y-1
                    `}
            >
               <div className="group">
                  <img
                     src={src}
                     alt={`${title} Poster`}
                     className="
                        object-cover
                        transition-all
                        relative
                        right-[5.5rem]
                        shadow-xl
                        h-64
                        w-0
                        sm:w-44
                        min-w-44
                        rounded-l-md 
                                               
                        "
                  />
                  <form action={addMovieToMovieList}>
                     <input type="hidden" name="movie_id" value={id} />
                     <input type="hidden" name="list_id" value={movielistid} />

                     <button type="submit">
                        <AddCircleOutline className=" rounded-full absolute bottom-28 right-[14.3rem] z-50 text-6xl hover:cursor-pointer hover:text-green-600 bg-gray-900/80" />
                     </button>
                  </form>
               </div>

               <div
                  className="
                        bg-gray-950
                        z-10
                        h-64
                        w-0
                        sm:w-52
                        min-w-52
                        relative
                        right-24
                        shadow-md
                        rounded-r-md"
               >
                  <div className="p-4">
                     <div className="flex flex-col justify-between">
                        <div className="flex flex-col gap-2">
                           <h3 className="text-xl">{title}</h3>
                           <p className="text-[8px]">{overview}</p>
                           <p className="text-xs">{genreList}</p>
                        </div>
                        <div className="flex gap-12 absolute bottom-2">
                           <div className="flex text-xl items-center">
                              <StarHalf />
                              <p>{rating}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
