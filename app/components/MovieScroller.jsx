'use client'

import { useState, useEffect } from "react"
import MovieScrollerImage from "./MovieScrollerImage"
import '../../assets/css/scrollbar.css'
import { supabase } from "../utils/supabaseClient";


export default function MovieScroller({scrollertitle, category, isfavorite, favoritetype}){

    const [movieList, setMovieList]= useState(null);
    const [currentUser, setCurrentUser]= useState(null)


/*       const getMovie= async () =>{
        const totalPages= 38;
        const requests= []
        for( let page=38; page <= totalPages; page++){
            requests
                .push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=77ea84f8c960e9d8d7e658a914bd428b&include_adult=false&include_video=false&language=en-US&page=${page}&vote_count.gte=200&sort_by=vote_count.desc`)
                .then(res => res.json()))
        }
        Promise.all(requests)
        .then(responses =>{
            const movies= responses.flatMap(response=> response.results);
            setMovieList(movies)
            console.log(movieList)
        })
        .catch(error => {
            console.error('error fetching movies', error)
        });
        console.log(movieList)
    } 

     async function saveMoviesToDB(){
        try{
            if(!movieList) return;

            const formattedMovies = await Promise.all(movieList.map(async movie => {

                return{
                    title: movie.title,
                    release_date: movie.release_date,
                    overview: movie.overview,
                    id: movie.id,
                    genre_ids: movie.genre_ids,
                    vote_average: movie.vote_average,
                    vote_count: movie.vote_count,
                    popularity: movie.popularity,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path
                };

            }));

            const { data, error } = await supabase.from('Movies').insert(formattedMovies)

        }catch(error){
            console.error("Error saving Movies", error)
        }
    } 

    useEffect(() => {
        async function fetchData() {
            await getMovie(); 
        }
        fetchData();
    }, []);
    
    useEffect(() => {
        if (movieList !== null) { 
            saveMoviesToDB(); 
        }
    }, [movieList]);   
    
    return (
        <div></div>
    ) */

    const getMovieFromDB = async () =>{
        try{
            if(!isfavorite){
                const {data, error} = await supabase.from('Movies').select('*').contains('genre_ids', [category]);
                if(error){
                    console.error('Error Getting movies from DB: ', error)
                }
                else{
                    const shuffledMovies = [...data].sort(() => Math.random() - 0.5);
                    const selectedMovies = shuffledMovies.slice(0, 20);
                    setMovieList(selectedMovies);
                } 
            }
            else{
                const { data: user, error } = await supabase.auth.getUser();
                if(error) console.error("error getting user", error)
                const { data: favoritesData, error: favoritesError } = await supabase
                    .from('favorites')
                    .select('movie_title')
                    .match({user_id: user.user.id, type: favoritetype})
                    
    
                if (favoritesError) return favoritesError;
                else {
                    const favoriteTitles = favoritesData.map(favorite => favorite.movie_title.trim());
    
                    const { data, error } = await supabase
                        .from('Movies')
                        .select('*')
                        .in('title', favoriteTitles)
                        if(error){
                            console.error('Error Getting movies from DB: ', error)
                        }
                        else{
                            const shuffledMovies = [...data].sort(() => Math.random() - 0.5);
                            const selectedMovies = shuffledMovies.slice(0, 20);
                            setMovieList(selectedMovies);
                        } 
                }
            }
        }catch(error){
            console.error('Error getting data from DB:', error)
        }
    }



    useEffect(()=> {
            getMovieFromDB();
            console.log(movieList)
        }, [])     

    useEffect(() =>{
        const fetchUser = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {       
                return user
            }
        };
        fetchUser().then(u => {
            setCurrentUser(u);            
        });
    }, [])   
   
    return(
        <div className="flex flex-col ">
            <h2 className="mt-40 ml-8 rounded-lg hover:bg-opacity-30 text-center hover:cursor-pointer hover:text-green-600 hover:underline hover:bg-gray-900 p-0">{scrollertitle}</h2>
           {
                movieList !== null &&
                <div className="w-[96vw] pl-6 xl:pl-8 pb-2 my-44 absolute overflow-x-scroll overflow-y-hidden scroll-smooth hide-scrollbar hover:first:ml-10">
                    <div className="flex gap-5 ">
                    {movieList.map((movie, index) => (
                        <MovieScrollerImage
                            key={index}
                            id={movie.id}
                            u={currentUser}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            src2={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            title={movie.title}
                            overview={movie.overview}
                            rating={movie.vote_average.toFixed(1)}
                            votecount={movie.vote_count}
                            releasedate={movie.release_date}
                            genre={movie.genre_ids}
                            isFirst={index === 0}
                            isfavorite={isfavorite}
                            favoritetype={favoritetype}
                        />
                    ))}
                    </div>     
                </div>
            } 
        </div>
    )  
    
}