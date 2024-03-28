import HomeHero from "../components/HomeHero";
import MovieScrollerGrid from "../components/MovieScrollerGrid";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function Home(){
    
    return(
        <main className="bg-gray-900 text-slate-100 font-doppio ">
           <Nav />
            <HomeHero />
            <MovieScrollerGrid />
        </main>
    )
}