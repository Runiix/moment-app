import { supabaseServer } from '../utils/supabaseServerClient';
import Review from './Review';

export default async function ProfileReviews({ username }) {
   const { data: reviewList, error: reviewListerror } = await supabaseServer
      .from('reviews')
      .select('*')
      .eq('username', username);
   console.log('ReviewList', reviewList);
   if (reviewListerror)
      console.error('error getting ReviewList', reviewListerror);

   const reviewListWithTitles = [];

   for (const review of reviewList) {
      const { data: movieData, error } = await supabaseServer
         .from('Movies')
         .select('title')
         .eq('id', review.movie_id)
         .single();

      if (error) {
         console.error('Error fetching movie title:', error.message);
         reviewListWithTitles.push({ ...review, movie_title: 'Unknown' });
      } else {
         const movieTitle = movieData ? movieData.title : 'Unknown';
         reviewListWithTitles.push({ ...review, movie_title: movieTitle });
         console.log('ReviewlistWithTitles', reviewListWithTitles);
      }
   }
   return (
      <div className="">
         <h2 className="text-5xl mb-10">Reviews: </h2>
         {reviewListWithTitles !== null && (
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
         )}
      </div>
   );
}
