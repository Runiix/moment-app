'use client' 

import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";
import { Close, StarHalf, Favorite, FavoriteBorder } from "@mui/icons-material"
import '../../assets/css/scrollbar.css'
import { useState } from "react";
import SimilarMovieGrid from "./SimilarMovieGrid";
import Reviews from "./Reviews";

export default function MovieScrollerModal({src, alt, title, overview, rating, votecount, releasedate, onClose, genre}){

    const [isFavorited, setIsFavorited]= useState()
    const [similarOrReviews, setSimilarOrReviews]= useState(false)

    const titleLength = title.length;
    const getTitleStyle = () => {
        if (titleLength > 20) {
            return "bottom-32"; 
        } else {
            return "bottom-16"; 
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-40">
            <div className="bg-gray-900 h-screen w-[50rem] rounded-lg relative mt-20 overflow-y-scroll overflow-x-hidden hide-scrollbar">
                <div className="relative w-full h-1/2 hover:opacity-90 hover:cursor-pointer">
                    <img
                        src={src} 
                        alt={alt}
                        className="rounded-t-lg h-full object-cover w-full" 
                    />
                    <Close onClick={onClose} className="absolute left-5 top-5 text-gray-300 hover:text-white z-50 bg-gray-900 bg-opacity-80 rounded-xl hover:cursor-pointer hover:bg-opacity-70" />
                    <div className={`flex justify-between items-center relative ${getTitleStyle()} bg-gray-900 bg-opacity-40 px-5 pb-5`}>
                        <div className="flex items-center gap-2">
                            <h3 className="text-6xl">{title}</h3>
                        </div>
                        <div>
                            <form 
                                action={addOrRemoveFromFavorites}
                                className=""
                                onSubmit={() => setIsFavorited(!isFavorited)}
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
                <div className="flex flex-col gap-20 items-center">
                    <div className="mx-4 mt-4 flex gap-5">
                        <div className="w-1/2">   
                            <h3 className="text-2xl">Overview:</h3>
                            <p className="text-base">{overview}</p>
                        </div>
                        <div>
                            <div className="flex text-2xl items-center">
                                <div className="text-green-600 flex items-center mr-2">
                                    <StarHalf />
                                    <p>{rating}</p>
                                </div>
                                    <p>in {votecount} Votes</p>
                                </div>
                            
                            <p>Release-Date: {releasedate}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-10 mr-12">
                            <h3 className={similarOrReviews ? "hover:text-green-600 hover:underline hover:cursor-pointer" : "text-green-600"} onClick={() => setSimilarOrReviews(false)}>Similar Movies</h3>
                            <h3 className={!similarOrReviews ? "hover:text-green-600 hover:underline hover:cursor-pointer" : "text-green-600"} onClick={() => setSimilarOrReviews(true)}>Reviews</h3>
                        </div>
                        {
                            !similarOrReviews ? <SimilarMovieGrid /> : <Reviews />
                        }
                        
                    </div>
                </div>
               
            </div>
        </div>
    )
}