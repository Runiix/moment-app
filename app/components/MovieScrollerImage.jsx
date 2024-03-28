'use client'

import { Favorite, StarHalf } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MovieScrollerModal from "./MovieScrollerModal";
import { supabase } from "../utils/supabaseClient";


export default function MovieScrollerImage({ src, src2, title, overview, rating, votecount, releasedate, genre}){


    const [isFavorited, setIsFavorited]= useState(false);
    const [showModal, setShowModal]= useState();

    async function addOrRemoveFromFavorites(){
     
        const {data: {user}}= await supabase.auth.getUser();
    
        if(!user){
            return{success: false, error: 'User is not authenticated!'}
        }
        if(isFavorited=== 'true'){
            const {error}= await supabase 
                .from('Favorites')
                .delete()
                .match({user_id: user.id, title: title})
    
            if(error){
                return{success: false, error}
            }
        }else{
            console.log(user.id, title)
            const {error}= await supabase
                .from('Favorites')
                .insert({user_id: user.id, title: title})
    
            if(error){
                return {success: false, error}
            }
        }

        return {success: true}
    }


    function toggleModal(){
        setShowModal(!showModal)
    }

    return(
        <div >
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
                    transition 
                    duartion 
                    shadow-xl 
                    group-hover:opacity-90 
                    sm:group-hover:opacity-0
                    delay-200
                    origin-center
                    z-2"
                />
                <div 
                    className="
                    transition
                    duration-300
                    delay-300
                    absolute
                    group-hover:first:p-20
                    w-64 
                    flex
                    invisible
                    group-hover:scale-110
                    group-hover:opacity-100
                    group-hover:visible
                    z-10
                    hover:cursor-pointer
                    " 
                    
                >
                    <img 
                        src={src}
                        alt="Movie Scroller Image"
                        className="
                        cursor-pointer
                        object-cover
                        transition
                        duration
                        relative
                        right-24
                        shadow-xl
                        h-64
                        w-44
                        min-w-44
                        rounded-l-md
                        
                        " 
                        onClick={() => setShowModal(true)}
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
                        transition
                        duration-300
                        shadow-md
                        rounded-r-md">
                            <div className="p-4">
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-xl">{title}</h3>
                                        <p className="text-[8px]">{overview}</p>
                                    </div>
                                    <div className="flex gap-24 absolute bottom-2">
                                            
                                        <div className="flex text-xl items-center">
                                                <StarHalf />
                                                <p>{rating}</p>
                                        </div>
                                        <form 
                                                action={addOrRemoveFromFavorites}
                                                onSubmit={() =>setIsFavorited(!isFavorited)}
                                                className=""
                                            >

                                            <input type="hidden" name="title" value={title}/>
                                            <input type="hidden" name="isFavorited" value={isFavorited}/>
                                            <button
                                                type="submit"
                                                className="bg-transparent border-none text-slate-100 cursor-pointer hover:text-green-600 hover:scale-110 transition duration-300"
                                            >
                                                {isFavorited ? <Favorite className="text-green-600"/> : <FavoriteBorder />}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div> 
            {
             showModal && <MovieScrollerModal 
                            src={src2}
                            alt={title} 
                            title={title} 
                            overview={overview} 
                            rating={rating} 
                            votecount={votecount} 
                            releasedate={releasedate} 
                            genre= {genre}
                            onClose={toggleModal} />
            }
        </div>
    )
}