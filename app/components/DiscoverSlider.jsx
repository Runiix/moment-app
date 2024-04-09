'use client'

import MovieDiscoverImage from "./MovieDiscoverImage";
import {KeyboardArrowUp, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowDown, Favorite, NotInterested, AddCircleOutline, HeartBroken } from "@mui/icons-material";
import { useState, useEffect } from "react"
import { supabase } from "../utils/supabaseClient";
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";


export default function DiscoverSlider(){

    const [randomMovie, setRandomMovie]= useState(null);
    const [currentUser, setCurrentUser]= useState(null)
    const [isFavorited, setIsFavorited]= useState(true)
    const [favoriteType, setFavoriteType]= useState(0)

    const getRandomId = async () =>{
        try{
            const {data, error}= await supabase
                .from('Movies')
                .select('id')
            if(error) console.error("Error fetching Movie Ids", error)
            console.log(data)
            const IdData = data.map(movie => movie.id);
            const randomIndex= Math.floor(Math.random() * IdData.length)
            const randomId=IdData[randomIndex]
            console.log("RAndomID",randomId)
            getMovieFromDB(randomId)
        }catch(error){
            console.error("Error fetching Movie Ids", error)
        }
    }

    const getMovieFromDB = async (rand) =>{
        try{
            if(rand !== null && rand !== undefined){
                console.log("Rand", rand)
                const { data, error } = await supabase
                    .from('Movies')
                    .select('*')
                    .eq('id', rand)
                if(error) console.error("Error getting Movie", error)
                setRandomMovie(data)
            console.log(data)
            }else{
                console.error("Rand is undefined or null")
            }

        }catch(error){
            console.error('Error getting data from DB:', error)
        }
    }

    useEffect(() =>{
        getRandomId()
    }, [])

    const handleRight = () =>{
        if(isFavorited=== 'true'){
            setFavoriteType(0)
        }else{
            setFavoriteType(3)
        }
        getRandomId()
    }
    const handleLeft = () =>{
        getRandomId()
    }

    const handleBottom = () =>{
        if(isFavorited=== 'true'){
            setFavoriteType(0)
        }else{
            setFavoriteType(2)
        }
        getRandomId()

    }
    const handleTop = () =>{
        if(isFavorited=== 'true'){
            setFavoriteType(0)
        }else{
            setFavoriteType(1)
        }
        getRandomId()

    }
    
    
    return(
        <div>
            {randomMovie &&
            <div className="mt-44 mx-auto w-8/12 h-full justify-center flex flex-col gap-10 items-center ">
                <div className="group">
                    <form 
                        action={addOrRemoveFromFavorites}
                        >
                        <input type="hidden" name="title" value={randomMovie[0].title}/>
                        <input type="hidden" name="isFavorited" value={isFavorited}/>
                        <input type="hidden" name="favoriteType" value={favoriteType}/>
                        <button
                            type="submit"
                            className="scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-[2.2] transition duration-300 flex flex-col items-center"
                            onClick={() => handleTop()}
                        >
                            <KeyboardArrowUp/>  
                            <p className=" text-[5px] invisible group-hover:visible bg-opacity-0"> Add To favorites</p>
                            <Favorite />       
                        </button>
                    </form>                
                </div>
                <div className="flex items-center gap-16">
                    <div onClick={() => handleLeft()} className="flex group scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-[2.2] transition duration-300 items-center">
                        <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[-90deg] relative left-9">Next Movie</p>
                        <KeyboardArrowLeft/>
                        <NotInterested />
                    </div>
                        <MovieDiscoverImage
                        id={randomMovie[0].id}
                        u={currentUser}
                        src={`https://image.tmdb.org/t/p/w500${randomMovie[0].poster_path}`}
                        src2={`https://image.tmdb.org/t/p/original${randomMovie[0].backdrop_path}`}
                        title={randomMovie[0].title}
                        overview={randomMovie[0].overview}
                        rating={randomMovie[0].vote_average.toFixed(1)}
                        votecount={randomMovie[0].vote_count}
                        releasedate={randomMovie[0].release_date}
                        genre={randomMovie[0].genre_ids} 
                        
                    />
                    
                    
                    <form 
                        action={addOrRemoveFromFavorites}
                        >
                        <input type="hidden" name="title" value={randomMovie[0].title}/>
                        <input type="hidden" name="isFavorited" value={isFavorited}/>
                        <input type="hidden" name="favoriteType" value={favoriteType}/>
                        <button
                            type="submit"
                            className="group flex items-center scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-[2.2] transition duration-300"
                            onClick={() => handleRight()}
                        >
                            <AddCircleOutline />
                            <KeyboardArrowRight/>  
                            <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 rotate-[90deg] relative right-10"> Add To Watchlist</p>          
                        </button>
                    </form>
                </div>
                <form 
                        action={addOrRemoveFromFavorites}
                        onSubmit={() =>handleBottom()}
                        >
                        <input type="hidden" name="title" value={randomMovie[0].title}/>
                        <input type="hidden" name="isFavorited" value={isFavorited}/>
                        <input type="hidden" name="favoriteType" value={favoriteType}/>
                        <button
                            type="submit"
                            className="group items-center scale-[2] bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-[2.2] transition duration-300 flex flex-col"
                        >
                            <HeartBroken />
                            <p className=" text-[5px] invisible group-hover:visible bg-opacity-0 ">Add to Dislikes</p>
                            <KeyboardArrowDown/>            
                        </button>
                    </form>
            </div>
            }
        </div>
    )
}