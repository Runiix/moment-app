'use client'

import MovieGrid from "../components/MovieGrid";
import Nav from "../components/Nav";
import { useState } from "react";

export default function Favorites(){

    const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    }
    

    return(
        <main className="min-h-screen bg-gray-900 text-white relative  font-doppio">
           <Nav onSearch={handleSearch} />
           <MovieGrid favorites={true} searchQuery={searchQuery}/>
        </main>
    )
}