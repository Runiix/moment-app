import MovieScroller from './MovieScroller';

export default function MovieScrollerGrid({ user }) {
   return (
      <div className=" flex flex-col gap-[16vh] absolute top-[15vh] lg:top-[25vh] ">
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               scrollertitle="My Watchlist"
               isfavorite={true}
               favoritetype={'watchlist'}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               scrollertitle="My Favorites"
               isfavorite={true}
               favoritetype={'favorites'}
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller user={user} scrollertitle="Action" category="28" />
         </div>
         <div className="flex flex-col">
            <MovieScroller
               user={user}
               scrollertitle="Animation"
               category="16"
            />
         </div>
         <div className="flex flex-col">
            <MovieScroller user={user} scrollertitle="Thriller" category="53" />
         </div>
      </div>
   );
}
