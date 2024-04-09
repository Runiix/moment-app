'use client'

import { AddCircleOutline, CheckCircle, Favorite, HeartBroken, HeartBrokenOutlined, StarHalf } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import MovieScrollerModal from "./MovieScrollerModal";
import { supabase } from "../utils/supabaseClient";
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";


export default function MovieScrollerImage({u, id, src, src2, title, overview, rating, votecount, releasedate, genre, isFirst, modal= false, isfavorite=false, favoritetype= 0 }){


    const [isFavorited, setIsFavorited]= useState(isfavorite);
    const [favoriteType, setFavoriteType]= useState(favoritetype)
    const [showModal, setShowModal]= useState(modal);
    const [currentUser, setCurrentUser]= useState(u);



    const checkForFavorite= async (u) =>{
        try{
            const { data: favoritesData, error: favoritesError } = await supabase
            .from('favorites')
            .select('movie_title, type')
            .eq('user_id', u.user.id);
            if(favoritesError) return favoritesError;
            for(let i=0; i<favoritesData.length; i++){
                if(title===favoritesData[i].movie_title){
                setIsFavorited(true)
                setFavoriteType(favoritesData[i].type)
                }
            }
        }catch(error){
            console.error("error getting data", error)
        }
    }
    useEffect(() =>{
        if(u){
            setCurrentUser(u);
            checkForFavorite(u);
        }

    }, [])

    function toggleModal(){
        setShowModal(!showModal)
    }

    function handleFavorite(t){
        setIsFavorited(!isFavorited)
        if(isFavorited){
            setFavoriteType(0)
        }else{
            setFavoriteType(t)
        }
    }


    return(
        <div>
            <div className="group flex py-5">
                <img 
                    src={src}
                    alt="Movie Scroller Image"
                    className="
                    rounded-xl 
                    object-cover 
                    h-64
                    w-44
                    min-w-44
                    cursor-pointer 
                    transition-all 
                    duartion-500 
                    shadow-xl 
                    group-hover:opacity-90 
                    sm:group-hover:opacity-0
                    delay-200
                    "

                />
                <div 
                    className={`
                    absolute
                    w-64 
                    flex
                    visible
                    sm:invisible
                    transition-all
                    scale-100
                    sm:scale-0
                    opacity-100
                    sm:opacity-0
                    delay-300
                    duration-500
                    group:scale-100
                    group-hover:scale-[1.15]
                    group-hover:opacity-100
                    group-hover:visible
                    group-hover:translate-y-1
                    ${isFirst ? 'group-hover:translate-x-28' : ''}
                    z-2
                    hover:cursor-pointer
                    `}
                    onClick={() => setShowModal(true)}
                >
                    <img 
                        src={src}
                        alt={`${title} Poster`}
                        className="
                        cursor-pointer
                        object-cover
                        transition-all
                        relative
                        right-24
                        shadow-xl
                        h-64
                        w-44
                        min-w-44
                        rounded-l-md                        
                        " 
                    />
                    <div
                        className="
                        bg-gray-950
                        z-10
                        h-64
                        w-52
                        min-w-52
                        relative
                        right-24
                        shadow-md
                        rounded-r-md">
                            <div className="p-4">
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl">{title}</h3>
                                        <p className="text-[8px]">{overview}</p>
                                    </div>
                                    <div className="flex gap-12 absolute bottom-2">
                                            
                                        <div className="flex text-xl items-center">
                                                <StarHalf />
                                                <p>{rating}</p>
                                        </div>
                                        <div className="flex items-center">
                                        <form 
                                                id="favoriteForm"
                                                action={addOrRemoveFromFavorites}
                                                >
                                            <input type="hidden" name="title" value={title}/>
                                            <input type="hidden" name="isFavorited" value={isFavorited}/>
                                            <input type="hidden" name="favoriteType" value={favoriteType}/>

                                            {
                                                (favoriteType === 1 || isFavorited === false) &&
                                                <button
                                                type="submit"
                                                className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                                                onClick={() =>handleFavorite(1)}
                                                >
                                                    {favoriteType=== 1 ? <Favorite className="text-green-600"/> : <FavoriteBorder />}
                                                </button>
                                            }
                                        </form>
                                        <form 
                                                id="favoriteForm"
                                                action={addOrRemoveFromFavorites}
                                            >
                                            <input type="hidden" name="title" value={title}/>
                                            <input type="hidden" name="isFavorited" value={isFavorited}/>
                                            <input type="hidden" name="favoriteType" value={favoriteType}/>

                                            {
                                                (favoriteType === 2 || isFavorited === false) &&
                                                <button
                                                type="submit"
                                                className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300"
                                                onClick={() => handleFavorite(2)}
                                                >
                                            
                                                    {favoriteType=== 2 ? <HeartBroken className="text-red-600"/> : <HeartBrokenOutlined />}
                                                </button>
                                            }
                                        </form>
                                        <form 
                                                id="favoriteForm"
                                                action={addOrRemoveFromFavorites}
                                            >
                                            <input type="hidden" name="title" value={title}/>
                                            <input type="hidden" name="isFavorited" value={isFavorited}/>
                                            <input type="hidden" name="favoriteType" value={favoriteType}/>

                                            {
                                                (favoriteType === 3 || isFavorited === false) &&
                                                <button
                                                type="submit"
                                                className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                                                onClick={() =>handleFavorite(3)}
                                                >
                                                    {favoriteType=== 3 ? <CheckCircle className="text-green-600"/> : <AddCircleOutline />}
                                                </button>
                                            }
                                        </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div> 
            {
             showModal && <MovieScrollerModal 
                            id={id}
                            src={src2}
                            alt={title} 
                            title={title} 
                            overview={overview} 
                            rating={rating} 
                            votecount={votecount} 
                            releasedate={releasedate} 
                            genre= {genre}
                            onClose={toggleModal} 
                            favorite={isFavorited}
                            visible= {toggleModal}/>
            }
        </div>
    )
}