'use client'

import { useState, useEffect } from "react";
import HomeHero from "../components/HomeHero";
import MovieScrollerGrid from "../components/MovieScrollerGrid";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import MovieGrid from "../components/MovieGrid";
import ReviewList from "../components/ReviewList";

export default function Home(){
    
    const [searchQuery, setSearchQuery]= useState('');

    const handleSearch= (query) =>{
        setSearchQuery(query);
    }

    
    return(
        <main className="bg-gray-900 text-slate-100 font-doppio ">
           <Nav onSearch={handleSearch}/>
           {
            searchQuery === '' ?
            <div>
                <HomeHero />
                <MovieScrollerGrid/>  
            </div>
            :
            <MovieGrid searchQuery={searchQuery}/>
           } 
          
            
        </main>
    )
}