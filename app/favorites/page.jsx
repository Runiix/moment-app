
import MovieGrid from "../components/MovieGrid";
import Nav from "../components/Nav";

export default function Favorites(){
    return(
        <main className="min-h-screen bg-gray-900 text-white relative p-10">
           <Nav />
           <MovieGrid favorites={true} />

        </main>
    )
}