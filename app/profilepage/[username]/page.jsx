import Nav from '@/app/components/Nav/Nav';
import ProfileBanner from '../../components/Profile/ProfileBanner';
import MovieLists from '../../components/Profile/MovieLists';
import ProfileInfo from '../../components/Profile/ProfileInfo';
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
   for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i];
   }
   return String((sum / ratings.length).toFixed(1));
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

async function getMovieLists(supabaseServer, userId) {
   const { data: movieLists, error } = await supabaseServer
      .from('MovieLists')
      .select('*')
      .eq('user_id', userId);
   if (error) console.error('Error getting MovieLists');
   return movieLists;
}
async function getMovieIds(supabaseServer, movieListId) {
   const { data: movieIds, error: idError } = await supabaseServer
      .from('MovieListItems')
      .select('movie_id')
      .eq('list_id', movieListId);
   if (idError) console.error('Error getting Movie IDs', idError);
   return movieIds;
}

async function getMovieImage(supabaseServer, movieIds) {
   const { data: movieImageUrls, error: urlError } = await supabaseServer
      .from('Movies')
      .select('poster_path')
      .in('id', movieIds);
   if (urlError) console.error('Error getting Image Urls', urlError);
   return movieImageUrls;
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

      const movieLists = await getMovieLists(supabaseServer, userId);
      const listIds = movieLists.map((item) => item.id);
      const allMovieIds = [];
      for (const listId of listIds) {
         const movieIdData = await getMovieIds(supabaseServer, listId);
         const movieIds = movieIdData.map((item) => item.movie_id);
         allMovieIds.push(movieIds);
      }

      const allMovieImages = [];
      for (const idlist of allMovieIds) {
         const imageData = await getMovieImage(supabaseServer, idlist);
         const movieImages = imageData.map((item) => item.poster_path);
         allMovieImages.push(movieImages);
      }

      const createdat = user.created_at.split('T')[0];

      return (
         <main className=" bg-gray-900 text-slate-100">
            <Nav user={user} />
            <section>
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

               <MovieLists
                  username={username}
                  paramusername={paramUserName}
                  movielists={movieLists}
                  movieimages={allMovieImages}
               />
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

      const movieLists = await getMovieLists(supabaseServer, paramUserId);
      const listIds = movieLists.map((item) => item.id);
      const allMovieIds = [];
      for (const listId of listIds) {
         const movieIdData = await getMovieIds(supabaseServer, listId);
         const movieIds = movieIdData.map((item) => item.movie_id);
         allMovieIds.push(movieIds);
      }

      const allMovieImages = [];
      for (const idlist of allMovieIds) {
         const imageData = await getMovieImage(supabaseServer, idlist);
         const movieImages = imageData.map((item) => item.poster_path);
         allMovieImages.push(movieImages);
      }

      const createdat = user.created_at.split('T')[0];

      return (
         <main className="text-slate-100 w-screen">
            <Nav user={user} username={paramUserName} createdat={createdat} />
            <section className="">
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
               <MovieLists
                  username={paramUserName}
                  movielists={movieLists}
                  movieimages={allMovieImages}
               />
            </section>
         </main>
      );
   }
}
