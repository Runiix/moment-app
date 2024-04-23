import Review from '../MovieContainer/Review';

export default async function ProfileReviews({ reviewListWithTitles }) {
   return (
      <div className="">
         <h2 className="text-5xl mb-10">Reviews: </h2>
         {reviewListWithTitles !== null &&
            reviewListWithTitles !== undefined && (
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
