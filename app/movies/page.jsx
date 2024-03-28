'use client'

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";

export default function Home(){

    const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    }
    
    return(
        <main className="bg-gray-900 text-slate-100 font-doppio ">
           <Nav onSearch={handleSearch}/>
           <MovieGrid searchQuery={searchQuery}/>
        </main>
    )
}