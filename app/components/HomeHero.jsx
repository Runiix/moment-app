'use client'


import { StarHalf } from '@mui/icons-material';
import MovieScrollerModal from './MovieScrollerModal';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

export default function HomeHero() {

    const [showModal, setShowModal]= useState(false)
    const [randomMovie, setRandomMovie]= useState(null);


    function toggleModal(){
        setShowModal(!showModal)
    }

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

    return (
        <div>
            {randomMovie &&
            <div className="h-[50vh] w-full flex flex-col hover:cursor-pointer" onClick={() =>setShowModal(!showModal)} >
                <img
                    src={`https://image.tmdb.org/t/p/original${randomMovie[0].backdrop_path}`}
                    alt="Hero Image"
                    className="w-full h-full object-cover opacity-90"
                    
                />
                <div className="relative bottom-1/2 lg:bottom-[30vh] w-1/2 ml-20 flex flex-col gap-3">
                    <h2 className="md:text-6xl sm:text-5xl text-4xl font-bold text-slate-100">{randomMovie[0].title}</h2>
                    <div className='flex items-center text-3xl'>
                        <StarHalf className="text-3xl"/>
                        <p>{randomMovie[0].vote_average.toFixed(1)}</p>
                    </div>
                </div>
                <div className="absolute w-full h-1/2" style={{background: 'linear-gradient(0deg, rgba(0, 0, 0, 0) 80%, rgba(0, 0, 0, 0.8) 90%)'}}>
                </div>
               
            </div>
        }
        {
        showModal && <MovieScrollerModal
                    src={`https://image.tmdb.org/t/p/original${randomMovie[0].backdrop_path}`}
                    alt={randomMovie[0].title} 
                    title={randomMovie[0].title} 
                    overview={randomMovie[0].overview} 
                    rating={randomMovie[0].vote_average} 
                    votecount={randomMovie[0].vote_count} 
                    releasedate={randomMovie[0].release_date} 
                    genre= {randomMovie[0].genre}
                    onClose={toggleModal} 
                    visible={toggleModal}
                    />
            }
    </div>
    );
}