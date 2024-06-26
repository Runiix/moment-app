import BasicMovieImage from './BasicMovieImage';

export default function BasicMovieGrid({
   data,
   user,
   genres,
   movielistid,
   movieList,
}) {
   return (
      <div className=" grid grid-cols-1   sm:flex sm:flex-wrap sm:gap-5 sm:pl-20 sm:pr-20">
         {data !== null &&
            data !== undefined &&
            data.map((movie, index) => (
               <BasicMovieImage
                  key={index}
                  movieList={movieList}
                  movielistid={movielistid}
                  u={user}
                  id={movie.id}
                  genres={genres}
                  src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                  title={movie.title}
                  overview={movie.overview}
                  rating={movie.vote_average.toFixed(1)}
                  genre={movie.genre_ids}
               />
            ))}
      </div>
   );
}
