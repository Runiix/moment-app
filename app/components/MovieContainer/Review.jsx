import { Person, Star, StarHalf } from '@mui/icons-material';
import Link from 'next/link';
export default function Review({
   username,
   rating,
   content,
   avatar_path,
   movie_title = null,
   profile,
}) {
   return (
      <div className="flex flex-col w-full max-w-[40rem] text-wrap break-all border-y border-slate-400 rounded-lg p-4 shadow-lg shadow-black">
         <div
            className={`flex gap-5 items-center mb-5 ${profile ? 'ml-5' : ''}`}
         >
            {profile && (
               <div>
                  {avatar_path !== null ? (
                     <img
                        src={`https://image.tmdb.org/t/p/original${avatar_path}`}
                        className="w-14 h-14 rounded-full object-cover"
                     />
                  ) : (
                     <Person className="w-14 h-14 rounded-full object-cover bg-gray-800" />
                  )}
               </div>
            )}
            <div className="flex gap-5">
               {movie_title === null ? (
                  <Link
                     href={`../../../profilepage/${username}`}
                     className="text-xl"
                  >
                     {username}
                  </Link>
               ) : (
                  <Link
                     href={`../../movies/1/vote_average/false?query=${movie_title}`}
                  >
                     <h2 className="text-xl hover:text-green-600">
                        {movie_title}
                     </h2>
                  </Link>
               )}

               {rating === 10 ? (
                  <h2 className="text-xl text-green-600 flex items-center">
                     <Star />
                     {rating}
                  </h2>
               ) : (
                  <h2 className="text-xl text-green-600 flex items-center">
                     <StarHalf />
                     {rating !== null ? rating : 'No Rating'}
                  </h2>
               )}
            </div>
         </div>
         <div>
            <p className="text-xs text-left max-w-full overflow-wrap text-wrap break-words">
               {content}
            </p>
         </div>
      </div>
   );
}
