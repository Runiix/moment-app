import { supabaseServer } from '@/app/utils/supabaseServerClient';
import MovieGrid from '@/app/components/MovieGrid';

async function getUser() {
   const { data: user, error } = await supabaseServer.auth.getUser();

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return user;
}

async function getFavoriteData(u) {
   const { data: favoritesData, error: favoritesError } = await supabaseServer
      .from('favorites')
      .select('movie_title')
      .match({ user_id: u.user.id });
   if (favoritesError) return favoritesError;
   const favoriteTitles = favoritesData.map((favorite) => favorite.movie_title);

   return favoriteTitles;
}

async function getWatchlistData(u) {
   const { data: watchlistData, error: watchlistError } = await supabaseServer
      .from('watchlist')
      .select('movie_title')
      .match({ user_id: u.user.id });
   if (watchlistError) return watchlistError;
   const watchlistTitles = watchlistData.map(
      (watchlist) => watchlist.movie_title
   );
   return watchlistTitles;
}

async function getDislikeData(u) {
   const { data: dislikeData, error: dislikeError } = await supabaseServer
      .from('dislikes')
      .select('movie_title')
      .match({ user_id: u.user.id });
   if (dislikeError) return dislikeError;
   //console.log(dislikeData);
   const dislikeTitles = dislikeData.map((dislike) => dislike.movie_title);

   return dislikeTitles;
}

async function getData(filter) {
   console.log(filter);

   const { data, error } = await supabaseServer
      .from('Movies')
      .select('*')
      .in('title', [filter]);
   /* .contains('genre_ids', [genreList])
      .ilike('title', `%${searchQuery}%`)
      .order(sortedBy, { ascending: sortOrder })
      .range(from, to); */
   // The return value is *not* serialized
   // You can return Date, Map, Set, etc.

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return data;
}

export default async function Favorites() {
   const user = await getUser();
   const favoriteTitles = await getFavoriteData(user);
   const watchlistTitles = await getWatchlistData(user);
   const dislikeTitles = await getDislikeData(user);
   const data = await getData(watchlistTitles);
   /*     const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    } */

   return (
      <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
         {/* <Nav onSearch={handleSearch} /> */}
         <MovieGrid
            data={data}
            user={user} /* searchQuery={''}  */
            favorites={true}
            favoritetype="Watchlist"
            favorite_titles={favoriteTitles}
            dislike_titles={dislikeTitles}
            watchlist_titles={watchlistTitles}
         />
      </main>
   );
}
