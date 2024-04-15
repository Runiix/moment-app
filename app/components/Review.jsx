import { Person, Star, StarHalf } from '@mui/icons-material';
export default function Review({
   username,
   rating,
   content,
   avatar_path,
   movie_title = null,
   profile,
}) {
   return (
      <div className="flex flex-col w-11/12 border border-slate-400 rounded-lg p-4">
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
                  <h2 className="text-xl">{username}</h2>
               ) : (
                  <h2 className="text-xl">{movie_title}</h2>
               )}

               {rating === 10 ? (
                  <h2 className="text-xl text-green-600 flex items-center">
                     <Star />
                     {rating} /10
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
            <p className="text-xs text-left tex">{content}</p>
         </div>
      </div>
   );
}