import Nav from '@/app/components/Nav';
import ProfileBanner from '../../components/ProfileBanner';
import MovieLists from '@/app/components/MovieLists';
import ProfileInfo from '../../components/ProfileInfo';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function getUser(supabaseServer) {
   const {
      data: { user },
      error,
   } = await supabaseServer.auth.getUser();
   if (error) console.error('Error fetching User', error);
   else return user;
}
async function getParamUser(supabaseServer, username) {
   const { data, error } = await supabaseServer
      .from('users')
      .select('*')
      .eq('displayname', username);
   if (error) console.error('Error getting paramUser', error);
   else {
      return data;
   }
}

async function getReviewCount(supabaseServer, username) {
   const { count, error } = await supabaseServer
      .from('reviews')
      .select('*', { count: 'exact' })
      .eq('username', username);
   if (error) console.error('Error getting ReviewCount', error);
   else return count;
}

async function getFavoriteCount(supabaseServer, userId) {
   const { count, error } = await supabaseServer
      .from('favorites')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);

   if (error) console.error('Error getting FavoriteCount', error);
   else return count;
}
async function getDislikeCount(supabaseServer, userId) {
   const { count, error } = await supabaseServer
      .from('dislikes')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);
   if (error) console.error('Error getting DislikeCount', error);
   else return count;
}
async function getWatchlistCount(supabaseServer, userId) {
   const { count, error } = await supabaseServer
      .from('watchlist')
      .select('*', { count: 'exact' })
      .eq('user_id', userId);
   if (error) console.error('Error getting WatchlistCount', error);
   else return count;
}

const calcAverageRating = async (supabaseServer, username) => {
   const { data: ratingData } = await supabaseServer
      .from('reviews')
      .select('rating')
      .eq('username', username);
   const ratings = ratingData.map((rating) => rating.rating);
   let sum = 0;
   for (let i = 0; i <= ratings.length; i++) {
      sum += ratings[i];
      return String(sum / ratings.length);
   }
};

async function getReviewListWithTitles(supabaseServer, username) {
   const { data: reviewList, error: reviewListerror } = await supabaseServer
      .from('reviews')
      .select('*')
      .eq('username', username);
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
      } else {
         const movieTitle = movieData ? movieData.title : 'Unknown';
         reviewListWithTitles.push({ ...review, movie_title: movieTitle });
      }
   }
   return reviewListWithTitles;
}

export default async function ProfilePage({ params }) {
   const cookieStore = cookies();

   const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
         cookies: {
            get(name) {
               return cookieStore.get(name)?.value;
            },
         },
      }
   );

   const user = await getUser(supabaseServer);
   const username = user.user_metadata.displayName;
   const userId = user.id;
   const paramUserName = params.username;
   const paramUser = await getParamUser(supabaseServer, paramUserName);
   const paramUserId = paramUser[0].id;
   if (paramUserName === username) {
      const ReviewCount = await getReviewCount(supabaseServer, username);
      const FavoriteCount = await getFavoriteCount(supabaseServer, userId);
      const DislikeCount = await getDislikeCount(supabaseServer, userId);
      const WatchlistCount = await getWatchlistCount(supabaseServer, userId);
      const averageRating = await calcAverageRating(supabaseServer, username);
      const reviewListWithTitles = await getReviewListWithTitles(
         supabaseServer,
         username
      );
      /*       const MovieLists = await getMovieLists(supabaseServer, userId);
       */
      const createdat = user.created_at.split('T')[0];

      return (
         <main className="font-doppio bg-gray-900">
            <Nav user={user} />
            <section className="font-doppio">
               <ProfileBanner
                  paramusername={params.username}
                  paramuserid={paramUserId}
                  user={user}
                  createdat={createdat}
                  username={username}
               />
               <ProfileInfo
                  user={user}
                  reviewListWithTitles={reviewListWithTitles}
                  username={username}
                  ReviewCount={ReviewCount}
                  WatchlistCount={WatchlistCount}
                  FavoriteCount={FavoriteCount}
                  DislikeCount={DislikeCount}
                  averageRating={averageRating}
               />
               <MovieLists user={user} />
            </section>
         </main>
      );
   } else {
      const ReviewCount = await getReviewCount(supabaseServer, paramUserName);
      const ParamFavoriteCount = await getFavoriteCount(
         supabaseServer,
         paramUserId
      );
      const ParamDislikeCount = await getDislikeCount(
         supabaseServer,
         paramUserId
      );
      const ParamWatchlistCount = await getWatchlistCount(
         supabaseServer,
         paramUserId
      );
      const averageRating = await calcAverageRating(
         supabaseServer,
         paramUserName
      );
      const reviewListWithTitles = await getReviewListWithTitles(
         supabaseServer,
         paramUserName
      );
      const createdat = user.created_at.split('T')[0];

      return (
         <main className="font-doppio">
            <Nav user={user} username={paramUserName} createdat={createdat} />
            <section className="font-doppio">
               <ProfileBanner
                  user={user}
                  paramuserid={paramUserId}
                  changeprofile={false}
                  username={paramUserName}
                  createdat={paramUser[0].joyndate}
               />
               <ProfileInfo
                  user={user}
                  reviewListWithTitles={reviewListWithTitles}
                  username={username}
                  ReviewCount={ReviewCount}
                  WatchlistCount={ParamWatchlistCount}
                  FavoriteCount={ParamFavoriteCount}
                  DislikeCount={ParamDislikeCount}
                  averageRating={averageRating}
               />
            </section>
            <section>
               {/*                <MovieLists />
                */}{' '}
            </section>
         </main>
      );
   }
}
