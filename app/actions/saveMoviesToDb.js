'use server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

async function fetchMovies() {
   const totalPages = 100;
   const requests = [];
   for (let page = 1; page <= totalPages; page++) {
      requests.push(
         fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=77ea84f8c960e9d8d7e658a914bd428b&include_adult=false&include_video=false&language=en-US&page=${page}&vote_count.gte=200&sort_by=vote_count.desc`
         ).then((res) => res.json())
      );
   }
   const responses = await Promise.all(requests);
   const movies = responses.flatMap((response) => response.results);
   try {
      const formattedMovies = await Promise.all(
         movies.map(async (movie) => {
            return {
               title: movie.title,
               release_date: movie.release_date,
               overview: movie.overview,
               id: movie.id,
               genre_ids: movie.genre_ids,
               vote_average: movie.vote_average,
               vote_count: movie.vote_count,
               popularity: movie.popularity,
               poster_path: movie.poster_path,
               backdrop_path: movie.backdrop_path,
            };
         })
      );
      console.log(formattedMovies);
      return formattedMovies;
   } catch (error) {
      console.error('Error saving Movies', error);
   }
}

export default async function saveMoviesToDb() {
   const cookieStore = cookies();

   const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
         cookies: {
            get(name) {
               return cookieStore.get(name)?.value;
            },
            set(name) {
               cookieStore.set({ name, value, ...options });
            },
            remove(name, options) {
               cookieStore.set({ name, value: '', ...options });
            },
         },
      }
   );
   const formattedMovies = await fetchMovies();
   try {
      const { error } = await supabaseServer
         .from('Movies')
         .insert(formattedMovies);
      if (error) console.error('error inserting movies', error);
   } catch {
      throw new Error();
   }
}
