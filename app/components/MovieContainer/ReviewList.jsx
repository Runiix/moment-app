'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Review from './Review';
import ReviewForm from './ReviewForm';

export default function ReviewList({ movie_id }) {
   const [reviewList, setReviewList] = useState(null);

   /*    const getReviews = async () => {
        try {
            const { data: movieIdList, error } = await supabase.from("Movies").select("id");
            if (error) {
                console.error('Error fetching movie IDs:', error);
                return;
            }
    
            const requests = movieIdList.map(({ id: movieId }) => {
                return fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=77ea84f8c960e9d8d7e658a914bd428b&language=en-US&page=1`)
                    .then(res => res.json())
                    .then(data => ({ movieId, reviews: data.results }));
            });
    
            Promise.all(requests)
                .then(responses => {
                    const reviews = responses.flatMap(response => response.reviews.map(review => ({ ...review, movieId: response.movieId })));
                    setReviewList(reviews);
                })
                .catch(error => {
                    console.error('Error fetching reviews:', error);
                });
        } catch (error) {
            console.error('Error fetching movie IDs:', error);
        }
    };

      async function saveReviewsToDB(){
        try{
            if(!reviewList) return;

            const formattedReviews = await Promise.all(reviewList.map(async review => {
                return{
                    movie_id: review.movieId,
                    username: review.author_details.username,
                    rating: review.author_details.rating,
                    content: review.content,
                    avatar_path: review.author_details.avatar_path
                };
            }));

            const { error } = await supabase.from('reviews').insert(formattedReviews)
            if(error){
                console.error("Error inserting Data", error)
            }
        }catch(error){
            console.error("Error saving Movies", error)
        }
    } 

    useEffect(() => {
        async function fetchData() {
            await getReviews(); 
        }
        fetchData();
    }, []);
    
     useEffect(() => {
        if (reviewList !== null) { 
            saveReviewsToDB(); 
        }
    }, [reviewList]);    */

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
      <div className="mt-5 mb-20">
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
