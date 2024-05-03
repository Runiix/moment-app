import MovieScroller from './MovieScroller';

export default function MovieScrollerGrid({
   user,
   genres,
   favoritemovies,
   watchlistmovies,
   dislikemovies,
   favoritedata,
   watchlistdata,
   actiondata,
   animationdata,
   thrillerdata,
}) {
   return (
      <div className=" flex flex-col gap-10 sm:gap-[16vh] absolute top-[12vh] sm:top-[15vh] lg:top-[25vh] ">
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="mymovies/Watchlist/1/vote_average/false"
               scrollertitle="My Watchlist"
               isfavorite={true}
               favoritetype={'watchlist'}
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               data={watchlistdata}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="mymovies/Favorites/1/vote_average/false"
               scrollertitle="My Favorites"
               isfavorite={true}
               favoritetype={'favorites'}
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               data={favoritedata}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/28/vote_average/false"
               scrollertitle="Action"
               category="28"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               data={actiondata}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/16/vote_average/false"
               scrollertitle="Animation"
               category="16"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               data={animationdata}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               genres={genres}
               link="movies/53/vote_average/false"
               scrollertitle="Thriller"
               category="53"
               favoritemovies={favoritemovies}
               watchlistmovies={watchlistmovies}
               dislikemovies={dislikemovies}
               data={thrillerdata}
            />
         </div>
      </div>
   );
}
