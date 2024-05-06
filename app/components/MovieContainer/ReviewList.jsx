'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Review from './Review';
import ReviewForm from './ReviewForm';

export default function ReviewList({ movie_id }) {
   const [reviewList, setReviewList] = useState(null);

   const fetchReviews = async () => {
      const { data, error } = await supabase
         .from('reviews')
         .select('*')
         .eq('movie_id', movie_id);
      if (error) console.error('Error fetching Reviews', error);
      else {
         setReviewList(data);
      }
   };

   useEffect(() => {
      fetchReviews();
   }, []);

   return (
      <div className="mt-5 mb-20 w-full mx-0">
         <div>
            <ReviewForm movie_id={movie_id} />
         </div>
         {reviewList !== null && (
            <div className="flex flex-col items-center gap-10">
               {reviewList.map((review, index) => (
                  <Review
                     key={index}
                     username={review.username}
                     rating={review.rating}
                     content={review.content}
                     avatar_path={review.avatar_path}
                  />
               ))}
            </div>
         )}
      </div>
   );
}
