import ProfileStat from './ProfileStat';
import ProfileReviews from './ProfileReviews';
import Link from 'next/link';

export default async function ProfileInfo({
   username,
   ReviewCount,
   WatchlistCount,
   FavoriteCount,
   DislikeCount,
   averageRating,
   reviewListWithTitles,
}) {
   return (
      <div className="z-10 flex flex-col 2xl:flex-row gap-20 2xl:gap-0 p-10  sm:w-2/3 mx-2 sm:mx-0 border border-slate-400 shadow-xl shadow-black rounded-lg">
         <div className="">
            <h2 className=" text-3xl lg:text-5xl mb-10">Stats:</h2>
            <ul className=" lg:text-3xl 2xl:w-full sm:flex sm:flex-wrap items-center gap-10 grid grid-cols-2">
               <li>
                  <ProfileStat
                     name={'Reviews'}
                     stat={ReviewCount}
                     yellow={10}
                     green={20}
                  />
               </li>
               <li>
                  <Link href="../../mymovies/Favorites/1/vote_average/false">
                     <ProfileStat
                        name={'Favorites'}
                        stat={FavoriteCount}
                        yellow={10}
                        green={20}
                     />
                  </Link>
               </li>
               <li>
                  <Link href="../../mymovies/Dislikes/1/vote_average/false">
                     <ProfileStat
                        name={'Dislikes'}
                        stat={DislikeCount}
                        yellow={10}
                        green={20}
                     />
                  </Link>
               </li>
               <li>
                  <Link href="../../mymovies/Watchlist/1/vote_average/false">
                     <ProfileStat
                        name={'WatchList Entries'}
                        stat={WatchlistCount}
                        yellow={10}
                        green={20}
                     />
                  </Link>
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
            <ProfileReviews
               username={username}
               reviewListWithTitles={reviewListWithTitles}
            />
         </div>
      </div>
   );
}
