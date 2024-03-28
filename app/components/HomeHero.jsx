'use client'


import { StarHalf } from '@mui/icons-material';
import { useEffect, useState } from 'react';

export default function HomeHero() {

    function getRandomInt(max) {
        
        return Math.floor(Math.random() * max);
        
      }

    const [movieList, setMovieList]= useState(null);

    const getMovie= async () =>{
        const totalPages= 10;
        const requests= []
        for( let page=1; page <= totalPages; page++){
            requests
                .push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=77ea84f8c960e9d8d7e658a914bd428b&page=${page}`)
                .then(res => res.json()))
        }
        Promise.all(requests)
        .then(responses =>{
            const movies= responses.flatMap(response=> response.results);
            setMovieList(movies)
        })
        .catch(error => {
            console.error('error fetching movies', error)
        });
    }

    useEffect(() =>{
        getMovie()
    }, [])

    const randomIndex= getRandomInt(200)

    return (
        <div>
            {movieList !== null &&
            <div className="h-[50vh] w-full flex flex-col ">
                <img
                    src={`https://image.tmdb.org/t/p/original${movieList[randomIndex].backdrop_path}`}
                    alt="Hero Image"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="relative bottom-1/2 lg:bottom-[30vh] w-1/2 ml-20 flex flex-col gap-3">
                    <h2 className="md:text-6xl sm:text-5xl text-4xl font-bold text-slate-100">{movieList[randomIndex].title}</h2>
                    <div className='flex items-center text-3xl'>
                        <StarHalf className="text-3xl"/>
                        <p>{movieList[randomIndex].vote_average.toFixed(1)}</p>
                    </div>
                </div>
                <div className="absolute w-full h-1/2" style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.8) 90%)'}}>
                </div>
            </div>
        }
    </div>
    );
}