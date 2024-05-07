'use client';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Review from '../MovieContainer/Review';
import { useState } from 'react';

export default function ProfileReviews({ reviewListWithTitles }) {
   const [expandReviews, setExpandReviews] = useState(false);

   return (
      <div className="">
         <h2 className="text-5xl mb-10">Reviews: </h2>
         {(reviewListWithTitles !== null &&
            reviewListWithTitles !== undefined &&
            reviewListWithTitles.length <= 4) ||
         expandReviews ? (
            <div className="flex flex-col items-center justify-center text-center gap-4">
               <div className="flex flex-col items-center gap-10 relative right-4">
                  {reviewListWithTitles.map((review, index) => (
                     <Review
                        key={index}
                        username={review.username}
                        rating={review.rating}
                        content={review.content}
                        avatar_path={review.avatar_path}
                        movie_title={review.movie_title}
                        profile={false}
                     />
                  ))}
               </div>
               {expandReviews && (
                  <div
                     className=" border border-slate-400 rounded-lg py-4 w-1/2 m-auto hover:bg-green-600 hover:cursor-pointer"
                     onClick={() => setExpandReviews(false)}
                  >
                     <ExpandLess />
                  </div>
               )}
            </div>
         ) : (
            <div className="flex flex-col items-center justify-center text-center gap-4">
               <div className="flex flex-col items-center gap-10 relative right-4">
                  {reviewListWithTitles.slice(0, 3).map((review, index) => (
                     <Review
                        key={index}
                        username={review.username}
                        rating={review.rating}
                        content={review.content}
                        avatar_path={review.avatar_path}
                        movie_title={review.movie_title}
                        profile={false}
                     />
                  ))}
               </div>
               <div
                  className=" border border-slate-400 rounded-lg py-4 w-1/2 m-auto hover:bg-green-600 hover:cursor-pointer"
                  onClick={() => setExpandReviews(true)}
               >
                  <ExpandMore />
               </div>
            </div>
         )}
      </div>
   );
}
