'use client'

import Link from "next/link"
import Profile from "./Profile"
import { useState } from "react"
import { Close, Menu } from "@mui/icons-material";
import NavSearch from "./navSearch";


export default function Nav({ onSearch }){

    const [navbarBackground, setNavbarBackground] = useState(false)
    const [toggleMenu, setToggleMenu]= useState(false);


    const changeNavbar= () =>{
        if(window.scrollY >0 ){
            setNavbarBackground(true)
        }else{
            setNavbarBackground(false)
        }
    }
    if(typeof window !== "undefined"){
        window.addEventListener('scroll', () =>changeNavbar())
    }

    return(

        <nav className={navbarBackground ? "fixed w-screen top-0 left-0 p-4 z-10 flex justify-between items-center bg-gray-900" : "fixed w-screen top-0 left-0 p-4 z-10 flex justify-between items-center" } >
            <div className=" flex items-center gap-10 ">
                <div>
                    <h1 className="text-4xl font-bold text-green-600">MoMent</h1>
                    <p className="text-xs">Movie-Entertainment</p> 
                </div>
                <ul className="invisible flex sm:visible space-x-4">
                    <li>
                        <Link href="/home" className="text-slate-100 hover:text-slate-300">Homepage</Link>
                    </li>
                    <li>
                        <Link href="/movies" className="text-slate-100 hover:text-slate-300">Movies</Link>
                    </li>
                    <li>
                        <Link href="/favorites" className="text-slate-100 hover:text-slate-300">Favorites</Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-5">
                <NavSearch onSearch={onSearch}/>
                <div className={navbarBackground ? "mr-5 hover:bg-slate-100 hover:bg-opacity-90 rounded-full invisible sm:visible " : " invisible sm:visible mr-5"}>
                    <Profile />
                </div>
            </div>

            <div className="m-2 flex sm:invisible absolute right-10 top-5 hover:cursor-pointer">
                {toggleMenu 
                    ? <Close color="fff" size={27} onClick={()=> setToggleMenu(false)} className="bg-gray-900 bg-opacity-50 rounded-lg" />
                    : <Menu color="fff" size={27} onClick={()=> setToggleMenu(true)} />
                }
                {toggleMenu && (
                    <div className="">
                        <ul className="absolute right-8 p-4 flex flex-col items-end text-end bg-gray-900 bg-opacity-50 rounded-lg">
                            <li className="mb-2">
                                <Profile />
                            </li>

                            <li className="mb-2">
                                <Link href="/home" className="text-slate-100 hover:text-zinc-900">Homepage</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/movies" className="text-slate-100 hover:text-zinc-900">Movies</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/tv-shows" className="text-slate-100 hover:text-zinc-900">Tv-Shows</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/favorites" className="text-slate-100 hover:text-zinc-900">Favorites</Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}