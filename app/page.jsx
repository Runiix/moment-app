import Link from 'next/link'
import '../assets/css/fonts.css'
import Image from 'next/image'
import heroBanner from '/assets/images/dark-vip-cinema-studio-still-life.jpg'
import movieCollage from '/assets/images/movie-poster-background-p5qblffj7cvswl5g.jpg'
import laptopPc from '/assets/images/realistic_laptop_with_smartphone.jpg'
import { ExpandMore } from '@mui/icons-material'
import Footer from './components/Footer'

export default function LandingPage(){
  return(
    <main className="flex flex-col w-full bg-gray-900 items-center justify-center font-doppio text-slate-100 overflow-x-hidden">
      
      
      <div >
        <Image
         src={heroBanner}
         alt="hero banner"
        className="absolute top-0 left-0 object-cover w-screen h-screen opacity-80"/>
      </div>
      <div className="absolute left-5 top-5 z-50">
        <h1 className="text-6xl font-bold text-green-600">MoMent</h1>
        <p>Movie-Entertainment</p> 
      </div>
      

      <div className="h-screen flex flex-col items-center justify-center text-center z-50">
        <h1 className="text-7xl mb-10">Explore The World of Entertainment!</h1>
        <p className="mb-10">Watch movies and Tv-shows and share your opinions with others</p>
        <Link 
          href="/loginpage" 
          className="bg-green-600 text-zinc-900 py-5 px-20 text-2xl rounded-2xl hover:text-slate-100 hover:bg-green-700"
        >
          Get Started
        </Link>
      </div>


      <div className="absolute z-50 flex text-center bottom-5 p-3 hover:text-green-600 hover:bg-gray-950 hover:bg-opacity-25 rounded-full hover:cursor-pointer">
        <ExpandMore/>
      </div>


      <div className="flex flex-col items-center justify-center w-full max-w-screen px-5 text-slate-100 bg-gray-950">
        <div className="flex gap-20 p-44 w-full border-b-4 border-gray-900" >
          <h2 className="text-5xl w-1/2 text-center">Explore a big variety of Movies and Tv Shows!</h2>
          <a href="https://wallpapers.com/background/movie-poster-background-p5qblffj7cvswl5g.html" className="w-1/2 h-auto hover:cursor-pointer">
            <Image 
            className="rounded-full object-cover  shadow-inner border"
            src={movieCollage}
            alt="Movie Collage"/>
          </a>
        </div>
        <div className="flex gap-20 p-44 w-full border-b-4 border-gray-900">
          <Image 
          className="rounded-full object-cover w-1/2 h-auto shadow-inner border"
          src={movieCollage}
          alt="Reviews and Comments"/>
          <h2 className="text-5xl w-1/2 text-center">Read reviews and discuss with other users</h2>
        </div>
        <div className="flex gap-20 p-44 w-full border-b-4 border-gray-900">
          <h2 className="text-5xl w-1/2 text-center">Avaialable for your Phone and PC</h2>
          <a href="https://www.freepik.com/free-vector/realistic-laptop-with-smartphone_35202611.htm#query=computer%20phone&position=0&from_view=keyword&track=ais&uuid=a4491061-6236-4f2c-bf0e-e7bb957bda1a" className="w-1/3 h-auto hover:cursor-pointer">
            <Image 
            className="rounded-full object-cover shadow-inner border"
            src={laptopPc}
            alt="Phone and PC"/>
          </a> 
        </div>
      </div>
      <Footer />
    </main>
  )
}
