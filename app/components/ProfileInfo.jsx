import { supabaseServer } from '../utils/supabaseServerClient';
import ProfileStat from './ProfileStat';
import ProfileReviews from './ProfileReviews';

export default async function ProfileInfo({ user }) {
   const username = user.email.split('@')[0];

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

   const calcAverageRating = async () => {
      const { data: ratingData } = await supabaseServer
         .from('reviews')
         .select('rating')
         .eq('username', username);
      const ratings = ratingData.map((rating) => rating.rating);
      let sum = 0;
      for (let i = 0; i <= ratings.length; i++) {
         sum += ratings[i];
         console.log(sum, ratings.length);
         return sum / ratings.length;
      }
   };

   const averageRating = await calcAverageRating();

   return (
      <div className="w-full">
         <div className=" flex  m-auto w-2/3 border border-slate-400 shadow-xl shadow-black rounded-lg">
            <div className="z-10 flex flex-col 2xl:flex-row gap-20 2xl:gap-0 p-10 items-start">
               <div className="">
                  <h2 className=" text-3xl lg:text-5xl mb-10">Stats:</h2>
                  <ul className=" lg:text-3xl 2xl:w-full flex flex-wrap items-center gap-10">
                     <li>
                        <ProfileStat
                           name={'Reviews'}
                           stat={ReviewCount}
                           yellow={10}
                           green={20}
                        />
                     </li>
                     <li>
                        <ProfileStat
                           name={'Favorites'}
                           stat={FavoriteCount}
                           yellow={10}
                           green={20}
                        />
                     </li>
                     <li>
                        <ProfileStat
                           name={'Dislikes'}
                           stat={DislikeCount}
                           yellow={10}
                           green={20}
                        />
                     </li>
                     <li>
                        <ProfileStat
                           name={'WatchList Entries'}
                           stat={WatchlistCount}
                           yellow={10}
                           green={20}
                        />
                     </li>
                     <li>
                        <ProfileStat
                           name={'Average Rating'}
                           stat={averageRating}
                           yellow={5}
                           green={7}
                        />
                     </li>
                  </ul>
               </div>
               <div className="2xl:w-full">
                  <ProfileReviews username={username} />
               </div>
            </div>
         </div>
      </div>
   );
}
