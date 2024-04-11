import { Person } from '@mui/icons-material';
import { supabaseServer } from '../utils/supabaseServerClient';

export default async function ProfileInfo({ user }) {
   const username = user.email.split('@')[0];
   const joinDate = user.created_at.split('T')[0];

   const { count: ReviewCount } = await supabaseServer
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('username', username);

   const { count: FavoriteCount } = await supabaseServer
      .from('favorites')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

   const { count: DislikeCount } = await supabaseServer
      .from('dislikes')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

   const { count: WatchlistCount } = await supabaseServer
      .from('watchlist')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

   const { data: ratingData } = await supabaseServer
      .from('reviews')
      .select('rating')
      .eq('username', username);

   const calcAverageRating = () => {
      const ratings = ratingData.map((rating) => rating.rating);
      let sum = 0;
      for (let i = 0; i <= ratings.length; i++) {
         sum += ratings;
         console.log(sum / ratings.length);
         return sum / ratings.length;
      }
   };

   const averageRating = calcAverageRating();

   return (
      <div className="w-full">
         <div className=" flex m-auto w-1/2 justify-center mt-20 border border-slate-400">
            <div className="z-10 flex gap-20">
               <div className="flex flex-col">
                  <div className="text-5xl flex items-center gap-4">
                     <Person className="text-5xl" />
                     <h2> {username}</h2>
                  </div>
                  <p>Member since: {joinDate}</p>
               </div>
               <div>
                  <h2 className="text-5xl">Stats:</h2>
                  <ul className="text-2xl">
                     <li>Reviews: {ReviewCount} </li>
                     <li>Favorites: {FavoriteCount}</li>
                     <li>Dislikes: {DislikeCount}</li>
                     <li>Watchlist: {WatchlistCount}</li>
                     <li>Average Rating: {averageRating}</li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
}
