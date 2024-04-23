'use client';
import { Close } from '@mui/icons-material';
import { useState } from 'react';
import addNewMovieList from '../../actions/addNewMovieList';
import swal from 'sweetalert';

export default function MovieListForm({ onClose }) {
   const handleChildElementClick = (e) => {
      e.stopPropagation();
   };

   const [title, setTitle] = useState('');
   const [description, setDescription] = useState('');
   const resetForm = () => {
      swal({
         title: 'Movie List added Successfully',
         icon: 'success',
      });
      setTitle('');
      setDescription('');
   };
   return (
      <div
         className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40"
         onClick={onClose}
      >
         {' '}
         <div
            className="bg-gray-900 p-20 rounded-lg border border-slate-400"
            onClick={(e) => handleChildElementClick(e)}
         >
            <Close
               onClick={onClose}
               className=" text-4xl absolute text-slate-100 left-5 top-5  hover:text-slate-400 z-50 bg-gray-900 bg-opacity-80 rounded-full hover:cursor-pointer hover:bg-opacity-70"
            />
            <form
               action={addNewMovieList}
               className="flex flex-col gap-8 items-center"
               onSubmit={() => resetForm()}
            >
               <h2 className="text-4xl">Create a new Movie List: </h2>
               <div className="flex flex-col gap-4">
                  <label className="text-xl">Movie List Title:</label>
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
                  <label className="text-xl">Movie List Description:</label>
                  <textarea
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     name="movie_list_description"
                     className="text-slate-100 w-80 py-5 pl-3 rounded-2xl bg-gray-900 border bg-opacity-80 border-slate-300 text-lg hover:border-slate-100 "
                  />
               </div>

               <button
                  type="submit"
                  className="bg-green-600 text-zinc-900 py-3 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
               >
                  Add Movie List
               </button>
            </form>
         </div>
      </div>
   );
}
