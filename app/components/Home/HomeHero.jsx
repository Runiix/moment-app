'use client';

import { StarHalf } from '@mui/icons-material';
import MovieModal from '../MovieContainer/MovieModal';
import { useEffect, useState } from 'react';

export default function HomeHero({ data, genres }) {
   const [showModal, setShowModal] = useState(false);
   const [genreList, setGenreList] = useState();

   function toggleModal() {
      setShowModal(!showModal);
   }

   useEffect(() => {
      populateGenreList();
   }, []);

   const populateGenreList = () => {
      const genreList = new Set();
      for (let i = 0; i < genres.genres.length; i++) {
         if (data[0].genre_ids.includes(genres.genres[i].id)) {
            genreList.add(genres.genres[i].name + ' - ');
         }
      }
      setGenreList((prev) => [prev, genreList]);
   };
   return (
      <div>
         {data && (
            <div
               className="h-[50vh] w-full flex flex-col hover:cursor-pointer"
               onClick={() => setShowModal(!showModal)}
            >
               <img
                  src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
                  alt="Hero Image"
                  className="w-full h-full object-cover opacity-90"
               />
               <div className="relative bottom-1/2 lg:bottom-[30vh] w-1/2 ml-20 flex flex-col gap-3">
                  <h2 className="md:text-6xl sm:text-5xl text-3xl font-bold text-slate-100">
                     {data[0].title}
                  </h2>
                  <div className="flex items-center text-xl sm:text-3xl">
                     <StarHalf className="text-3xl" />
                     <p>{data[0].vote_average.toFixed(1)}</p>
                  </div>
               </div>
               <div className="absolute w-full h-1/2 bg-gradient-to-t from-gray-900 via-gray-900/0 to-gray-900/0"></div>
            </div>
         )}
         {showModal && (
            <MovieModal
               src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`}
               alt={data[0].title}
               title={data[0].title}
               overview={data[0].overview}
               rating={data[0].vote_average}
               votecount={data[0].vote_count}
               releasedate={data[0].release_date}
               genre={data[0].genre_ids}
               genres={genres}
               genreList={genreList}
               onClose={toggleModal}
               visible={toggleModal}
            />
         )}
      </div>
   );
}
