import MovieScroller from "./MovieScroller"

export default function MovieScrollerGrid(){
    return(
        <div className=" flex flex-col gap-[14vh] absolute top-[15vh] md:top-[20vh] ml-[1vw] ">
            <div className="flex flex-col">
                <MovieScroller scrollertitle="Action" category="28"/>
            </div>
            <div className="flex flex-col">
                <MovieScroller scrollertitle="Animation" category="16"/>
            </div>
            <div className="flex flex-col">
                <MovieScroller scrollertitle="Thriller" category="53" />
            </div>
        </div>
    )
}