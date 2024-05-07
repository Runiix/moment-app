'use client';

import Image from 'next/image';
import Link from 'next/link';
import MovieGrid from '../../../assets/images/MovieGrid.png';
import { Delete, Edit, Close } from '@mui/icons-material';
import { useState } from 'react';
import updateMovieList from '@/app/actions/updateMovieList';
import { usePathname } from 'next/navigation';
import deleteMovieList from '@/app/actions/deleteMovieList';

export default function MovieListContainer({
   movielist_link,
   movielist_title,
   movielist_description,
   movielist_images,
   movielist_id,
}) {
   const [showListEdit, setShowListEdit] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [title, setTitle] = useState(movielist_title);
   const [description, setDescription] = useState(movielist_description);
   const pathname = usePathname();

   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   return (
      <div className="border border-slate-400 min-w-96 w-full rounded-lg group flex">
         <Link href={movielist_link}>
            <div className="flex h-52 w-full min-w-[34rem] hover:bg-gray-800 hover:rounded-l-lg ">
               {!movielist_images || movielist_images.length < 4 ? (
                  <div>
                     <Image
                        priority={true}
                        src={MovieGrid}
                        alt="MovieListImage 1"
                        className="object-cover w-32 min-w-32 h-full rounded-l-lg"
                     />
                  </div>
               ) : (
                  <div className="grid grid-cols-2 w-32 min-w-32 h-full object-cover rounded-lg">
                     <img
                        src={`https://image.tmdb.org/t/p/w500${movielist_images[0]}`}
                        alt="MovieListImage 1"
                        className="object-cover w-full h-full rounded-tl-lg"
                     />
                     <img
                        src={`https://image.tmdb.org/t/p/w500${movielist_images[1]}`}
                        alt="MovieListImage 2"
                        className="object-cover w-full h-full "
                     />
                     <img
                        src={`https://image.tmdb.org/t/p/w500${movielist_images[2]}`}
                        alt="MovieListImage 3"
                        className="object-cover w-full h-full rounded-bl-lg"
                     />
                     <img
                        src={`https://image.tmdb.org/t/p/w500${movielist_images[3]}`}
                        alt="MovieListImage 4"
                        className="object-cover w-full h-full"
                     />
                  </div>
               )}

               <div className="m-3 ml-5 flex flex-col gap-4 max-w-96 min-w-">
                  <h2 className="text-xl">{movielist_title}</h2>
                  <p>{movielist_description}</p>
               </div>
            </div>
         </Link>
         <div className="flex-col p-2 pl-6 w-10 max-w-10 border-l border-slate-400">
            <div>
               <Edit
                  className="hover:text-green-600 hover:cursor-pointer"
                  onClick={() => setShowListEdit(true)}
               />
               {showListEdit && (
                  <div
                     className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
                     onClick={() => setShowListEdit(false)}
                  >
                     <div
                        className="bg-gray-900 rounded-lg p-10 z-50"
                        onClick={(e) => handleChildElementClick(e)}
                     >
                        <div className="relative w-full h-1/3 sm:h-1/2 hover:opacity-90 hover:cursor-pointer">
                           <Close
                              onClick={() => setShowListEdit(false)}
                              className=" text-4xl mb-4 text-slate-100  hover:text-slate-400 bg-gray-900 bg-opacity-80 rounded-full hover:cursor-pointer hover:bg-opacity-70"
                           />
                           <form
                              action={updateMovieList}
                              className="flex flex-col gap-8 items-center "
                              onSubmit={() => setShowListEdit(false)}
                           >
                              <h2 className="text-4xl">
                                 Update the Movie List:{' '}
                              </h2>
                              <div className="flex flex-col gap-4">
                                 <label className="text-xl">
                                    New Movie List Title:
                                 </label>
                                 <input
                                    name="movie_list_title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border bg-opacity-80 border-slate-300 text-lg hover:border-slate-100 "
                                 />
                              </div>
                              <div className="flex flex-col gap-4">
                                 <label className="text-xl">
                                    New Movie List Description:
                                 </label>
                                 <textarea
                                    value={description}
                                    onChange={(e) =>
                                       setDescription(e.target.value)
                                    }
                                    name="movie_list_description"
                                    className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border bg-opacity-80 border-slate-300 text-lg hover:border-slate-100 "
                                 />
                              </div>
                              <input
                                 type="hidden"
                                 name="pathname"
                                 value={pathname}
                              />
                              <input
                                 type="hidden"
                                 name="list_id"
                                 value={movielist_id}
                              />

                              <button
                                 type="submit"
                                 className="bg-green-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
                              >
                                 Update Movie List
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            <div>
               <Delete
                  className="hover:text-red-600 hover:cursor-pointer"
                  onClick={() => setShowDeleteModal(true)}
               />
               {showDeleteModal && (
                  <div
                     className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
                     onClick={() => setShowDeleteModal(false)}
                  >
                     <div
                        className="bg-gray-900 rounded-lg p-10 z-50"
                        onClick={(e) => handleChildElementClick(e)}
                     >
                        <div className="relative w-full h-1/3 sm:h-1/2 hover:opacity-90 hover:cursor-pointer">
                           <Close
                              onClick={() => setShowDeleteModal(false)}
                              className=" text-4xl mb-4 text-slate-100  hover:text-slate-400 bg-gray-900 bg-opacity-80 rounded-full hover:cursor-pointer hover:bg-opacity-70"
                           />
                           <form
                              action={deleteMovieList}
                              className="flex flex-col gap-8 items-center "
                              onSubmit={() => setShowDeleteModal(false)}
                           >
                              <h2 className="text-4xl">
                                 Are you sure that you want to permanently
                                 delete this Movie List?
                              </h2>
                              <input
                                 type="hidden"
                                 name="pathname"
                                 value={pathname}
                              />
                              <input
                                 type="hidden"
                                 name="list_id"
                                 value={movielist_id}
                              />

                              <button
                                 type="submit"
                                 className="bg-red-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
                              >
                                 Delete Movie List
                              </button>
                           </form>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
