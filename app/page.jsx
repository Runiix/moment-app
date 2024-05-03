import Link from 'next/link';
import '../assets/css/fonts.css';
import Image from 'next/image';
import heroBanner from '/assets/images/dark-vip-cinema-studio-still-life.jpg';
import moviegrid from '/assets/images/MovieGrid.png';
import { ExpandMore } from '@mui/icons-material';
import Footer from './components/Footer';
import laptop from '/assets/images/realistic_laptop_with_smartphone.jpg';
import tmdb from '/assets/images/tmdb-logo.png';

export default function LandingPage() {
   return (
      <main className="flex flex-col w-full bg-gray-900 items-center justify-center font-doppio text-slate-100 overflow-x-hidden">
         <div>
            <Image
               src={heroBanner}
               alt="hero banner"
               className="absolute top-0 left-0 object-cover w-screen h-screen opacity-80 shadow-xl shadow-black"
            />
         </div>
         <div className="absolute bottom-0 right-0 text-xs opacity-50">
            Image by{' '}
            <a href="https://www.freepik.com/free-photo/dark-vip-cinema-studio-still-life_29015232.htm#query=dark%20movie%20theater&position=3&from_view=keyword&track=ais&uuid=148a6bf7-e535-4ee8-a91b-7a0b1ba24b95">
               Freepik
            </a>
         </div>
         <div className="absolute left-5 top-5 z-50">
            <h1 className="text-5xl sm:text-6xl font-bold text-green-600">
               MoMent
            </h1>
            <p className="text-sm sm:text-lg">Movie-Entertainment</p>
         </div>

         <div className="h-screen flex flex-col items-center justify-center text-center z-50 mx-4 ">
            <h1 className="text-4xl sm:text-7xl mb-4 sm:mb-10">
               Explore The World of Entertainment!
            </h1>
            <p className="mb-10 text-sm sm:text-lg">
               Explore and personalize over 2000 Movies
            </p>
            <Link
               href="/loginpage"
               className="bg-green-600 text-zinc-900 py-5 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
            >
               Get Started
            </Link>
         </div>

         <div className="absolute z-50 flex text-center bottom-5 p-3 hover:text-green-600 hover:bg-gray-950 hover:bg-opacity-25 rounded-full hover:cursor-pointer">
            <ExpandMore />
         </div>
         <div className="flex  items-center gap-5 mx-5 text-sm sm:text-lg my-10 opacity-50">
            <Image src={tmdb} alt="tmdb-logo" className="w-14" />
            <p>
               This product uses the TMDB API but is not endorsed or certified
               by TMDB
            </p>
         </div>

         <div className="flex flex-col items-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-around py-2 w-11/12 sm:w-full shadow-xl shadow-black my-6 border border-slate-400 rounded-lg">
               <h2 className="text-3xl sm:text-5xl mx-4 text-center sm:text-left w-80">
                  Explore over 2000 Movies!
               </h2>
               <Image
                  src={moviegrid}
                  alt="Movie Collage"
                  className="rounded-full object-cover w-10/12 sm:w-1/2 h-auto shadow-inner border"
               />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-around py-2 w-11/12 sm:w-full shadow-xl shadow-black my-6 border border-slate-400 rounded-lg">
               <h2 className="text-3xl sm:text-5xl mx-4 text-center sm:text-left w-80">
                  Read reviews and discuss with other users
               </h2>
               <Image
                  className="rounded-full object-cover w-10/12 sm:w-1/2 h-auto shadow-inner border"
                  src={heroBanner}
                  alt="Reviews and Comments"
               />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-around py-2 w-11/12 sm:w-full shadow-xl shadow-black my-6 border border-slate-400 rounded-lg mb-20">
               <h2 className="text-3xl sm:text-5xl mx-4 text-center sm:text-left w-80">
                  Avaialable for your Phone and PC
               </h2>
               <Image
                  className="rounded-full object-cover w-10/12 sm:w-1/3 h-auto shadow-inner border"
                  src={laptop}
                  alt="Reviews and Comments"
               />
               <a
                  href="https://www.freepik.com/free-vector/realistic-laptop-with-smartphone_35202611.htm#query=computer%20phone&position=0&from_view=keyword&track=ais&uuid=a4491061-6236-4f2c-bf0e-e7bb957bda1a"
                  className=" absolute w-1/3 h-auto hover:cursor-pointer"
               ></a>
            </div>
         </div>
         <Footer />
      </main>
   );
}
