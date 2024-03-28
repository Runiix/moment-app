'use client'

import Image from "next/image"
import { useState } from "react"
import { Delete } from "@mui/icons-material";
import { Favorite } from "@mui/icons-material";
import { FavoriteBorder } from "@mui/icons-material";
import { addOrRemoveFromFavorites } from "../actions/addOrRemoveFromFavorites";

export default function Photo({src, alt, width, height, photoName, isFavorited= false}){

    return(
        <>
            <div 
            style={{width, height}}
            className="relative w-auto h-auto shadow-md border border-white border-opacity-80 rounded-lg overflow-hidden cursor-pointer"
            >
                <form 
                action={deletePhoto}
                className="absolute bottom-2.5 right-10 z-10"
                >
                    <input type="hidden" name="photoPath" value={src} />
                    <button 
                    type="submit" 
                    className="bg-transparent border-none text-white cursor-pointer hover:text-red-500 hover:scale-110 transition duration-300"
                    >
                        <Delete />
                    </button>
                </form>

                <form 
                action={addOrRemoveFromFavorites}
                className="absolute bottom-2.5 right-2.5 z-10"
                >
                    <input type="hidden" name="photoName" value={photoName}/>
                    <input type="hidden" name="isFavorited" value={isFavorited}/>
                    <button
                    type="submit"
                    className="bg-transparent border-none text-white cursor-pointer hover:text-red-600 hover:scale-110 transition duration-300"
                    >
                        {isFavorited ? <Favorite className="text-red-600"/> : <FavoriteBorder />}
                    </button>
                </form>

                <Image 
                src={src}
                alt={alt}
                width={width}
                height={height}
                priority={true}
                style={{objectFit: 'cover', objectPosition: 'center', height: '100%'}}
                className="hover:opacity-90"
                onClick= {() => setShowModal(true)}
                />
            </div>
        </>
    )
}