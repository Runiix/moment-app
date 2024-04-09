'use client'

import MovieScrollerImage from "./MovieScrollerImage";
import { useState, useEffect} from "react"
import { supabase } from "../utils/supabaseClient";

export default function SimilarMovieGrid({genre}){

    const [movieList, setMovieList]= useState(null)

    const getMovieFromDB = async () =>{
        try{
            const {data, error} = await supabase.from('Movies').select('*').contains('genre_ids', [genre]);
            if(error){
                console.error('Error Getting movies from DB: ', error)
            }
            else{
                const shuffledMovies = [...data].sort(() => Math.random() - 0.5);
                const selectedMovies = shuffledMovies.slice(0, 20);
                setMovieList(selectedMovies);
            } 
        }catch(error){
            console.error('Error getting data from DB:', error)
        }
    }

    useEffect(()=>{
        getMovieFromDB();
    }, [])

    const movieScrollerImages = movieList !== null && movieList
        .map((movie, index) => (
            <MovieScrollerImage 
                key={index} 
                id={movie.id}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                src2={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                title={movie.title} 
                overview={movie.overview}
                rating={movie.vote_average.toFixed(1)}
                votecount={movie.vote_count}
                releasedate={movie.release_date}
            />
    ));

    return(
        
        <div className=" w-full">
            {
                movieList !== null &&
                    <div className=" grid grid-cols-3 gap-4 ">
                        {movieScrollerImages}
                    </div>     
            }
        </div>
   
    )
}