import Nav from '@/app/components/Nav/Nav';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MovieList from '@/app/components/MovieLists/MovieList';

async function getUser(supabaseServer) {
   const {
      data: { user },
      error,
   } = await supabaseServer.auth.getUser();

   if (error) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
   }

   return user;
}

async function getFavoriteData(supabaseServer, u) {
   const { data: favoritesData, error: favoritesError } = await supabaseServer
      .from('favorites')
      .select('movie_title')
      .match({ user_id: u.id });
   if (favoritesError) return favoritesError;
   const favoriteTitles = favoritesData.map((favorite) => favorite.movie_title);

   return favoriteTitles;
}

async function getWatchlistData(supabaseServer, u) {
   const { data: watchlistData, error: watchlistError } = await supabaseServer
      .from('watchlist')
      .select('movie_title')
      .match({ user_id: u.id });
   if (watchlistError) return watchlistError;
   const watchlistTitles = watchlistData.map(
      (watchlist) => watchlist.movie_title
   );
   return watchlistTitles;
}

async function getDislikeData(supabaseServer, u) {
   const { data: dislikeData, error: dislikeError } = await supabaseServer
      .from('dislikes')
      .select('movie_title')
      .match({ user_id: u.id });
   if (dislikeError) return dislikeError;
   const dislikeTitles = dislikeData.map((dislike) => dislike.movie_title);

   return dislikeTitles;
}

async function getListItems(supabaseServer, params) {
   const { data: listItems, error } = await supabaseServer
      .from('MovieListItems')
      .select('movie_id')
      .eq('list_id', params.list_params[1]);
   if (error) {
      throw new Error('Failed to fetch data');
   }
   const listOfIds = listItems.map((obj) => obj.movie_id);
   return listOfIds;
}

async function getMovieList(supabaseServer, listitems) {
   const { data, error } = await supabaseServer
      .from('Movies')
      .select('*')
      .in('id', listitems);
   if (error) {
      throw new Error('Failed to fetch data');
   }
   return data;
}
async function getData(supabaseServer, query) {
   if (query === '') {
      return null;
   } else {
      const { data, error } = await supabaseServer
         .from('Movies')
         .select('*')
         .ilike('title', `%${query}%`);
      if (error) {
         // This will activate the closest `error.js` Error Boundary
         throw new Error('Failed to fetch data');
      }

      return data;
   }
}

async function getGenres() {
   try {
      const response = await fetch(
         'https://api.themoviedb.org/3/genre/movie/list?api_key=77ea84f8c960e9d8d7e658a914bd428b&language=en'
      );
      if (!response.ok) {
         throw new Error('Failed to fetch genres');
      }
      const data = await response.json();
      // Update movie list state with fetched data
      return data;
   } catch (error) {
      console.error('Error fetching genres:', error);
   }
}
async function getMovieListTitle(supabaseServer, params) {
   const { data, error } = await supabaseServer
      .from('MovieLists')
      .select('*')
      .eq('id', params.list_params[1]);
   if (error) {
      console.error('Error Getting MovieList Title', error);
   } else {
      return data[0];
   }
}

export default async function movielists({ params, searchParams }) {
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
   const paramUsername = params.list_params[0];
   const query = searchParams?.query || '';
   const MovieListId = params.list_params[1];
   const favoriteMovies = await getFavoriteData(supabaseServer, user);
   const watchlistMovies = await getWatchlistData(supabaseServer, user);
   const dislikeMovies = await getDislikeData(supabaseServer, user);
   const listItems = await getListItems(supabaseServer, params);
   const data = await getData(supabaseServer, query);
   const movieList = await getMovieList(supabaseServer, listItems);
   const genres = await getGenres();
   const MovieListItem = await getMovieListTitle(supabaseServer, params);
   const MovieListTitle = MovieListItem.name;
   const MovieListDescription = MovieListItem.description;

   return (
      <main className="font-doppio bg-gray-900">
         <Nav user={user} />
         <div>
            <MovieList
               movielistid={MovieListId}
               movielisttitle={MovieListTitle}
               movielistdescription={MovieListDescription}
               user={user}
               query={query}
               params={params}
               movieList={movieList}
               data={data}
               genres={genres}
               favorite_titles={favoriteMovies}
               dislike_titles={dislikeMovies}
               watchlist_titles={watchlistMovies}
               username={username}
               paramusername={paramUsername}
            />
         </div>
      </main>
   );
}
