import MovieScroller from './MovieScroller';

export default function MovieScrollerGrid({
   user,
   genres,
   favoritemovies,
   watchlistmovies,
   dislikemovies,
}) {
   return (
      <div className=" flex flex-col gap-10 sm:gap-[18vh] absolute top-[12vh] sm:top-[15vh] lg:top-[25vh] ">
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="mymovies/Watchlist/1/vote_average/false"
               scrollertitle="My Watchlist"
               isfavorite={true}
               favoritetype={watchlistmovies}
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               genre={null}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="mymovies/Favorites/1/vote_average/false"
               scrollertitle="My Favorites"
               isfavorite={true}
               favoritetype={favoritemovies}
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               genre={null}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/28/vote_average/false"
               scrollertitle="Action"
               genre="28"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/16/vote_average/false"
               scrollertitle="Animation"
               genre="16"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/53/vote_average/false"
               scrollertitle="Thriller"
               genre="53"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
            />
         </div>
      </div>
   );
}
