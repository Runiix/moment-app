'use client';

import { Star } from '@mui/icons-material';
import { addReview } from '../../actions/addReview';
import { useState } from 'react';
import swal from 'sweetalert';
import { usePathname } from 'next/navigation';

export default function ReviewForm({ movie_id }) {
   const [rating, setRating] = useState('');
   const [content, setContent] = useState('');
   const pathname = usePathname();

   const resetForm = () => {
      swal({
         title: 'Review added Successfully',
         icon: 'success',
      });
      setRating('');
      setContent('');
   };

   return (
      <div className="mb-10 border border-slate-400 rounded-lg p-4 sm:px-20 mx-auto sm:w-[700px]">
         <h2 className="text-3xl text-center mb-4">Wirte your own Review: </h2>
         <div className="flex felx-col ">
            <form
               action={addReview}
               className="flex flex-col items-center sm:items-center gap-5 w-full sm:mx-4  "
               onSubmit={() => resetForm()}
            >
               <div className="flex flex-col gap-5 justify-start">
                  <input type="hidden" name="movieId" value={movie_id} />
                  <div className="flex items-center gap-4">
                     <label className="text-xl">Rating:</label>
                     <input
                        type="range"
                        name="rating"
                        value={rating}
                        min="0"
                        max="10"
                        className=" h-2 ml-4 w-24 sm:w-40 accent-green-600 rounded-lg bg-green-600 cursor-pointer "
                        onChange={(e) => setRating(e.target.value)}
                     />
                     <label>{rating}</label>
                     <input type="hidden" name="pathname" value={pathname} />

                     <Star className="text-green-600" />
                  </div>

                  <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0 sm:w-96 justify-start text-start">
                     <label className="text-xl">Review:</label>
                     <textarea
                        type="text"
                        name="content"
                        maxLength="2000"
                        value={content}
                        className="hide-scrollbar sm:ml-4 sm:w-64 h-32 p-2 z-0 transition-all duration-300 bg-zinc-900 lg:bg-opacity-70 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer  rounded-lg"
                        onChange={(e) => setContent(e.target.value)}
                     ></textarea>
                  </div>
               </div>
               <button
                  type="submit"
                  className="text-zinc-900 bg-green-600 font-bold my-2 py-2 px-4 rounded hover:bg-green-700 hover:text-slate-100"
               >
                  Publish Review
               </button>
            </form>
         </div>
      </div>
   );
}
