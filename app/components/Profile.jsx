'use client'

import { useEffect, useState, useRef } from "react"
import { Person } from "@mui/icons-material"
import ProfileNav from "./ProfileNav"
import { supabase } from "../utils/supabaseClient"

export default function Profile(){ 

    const [showProfileNav, setShowProfileNav]= useState(false)
    const [user, setUser]= useState();

    let profileNavRef= useRef();

    useEffect(()=> {
        let handler= (e)=>{
            if(showProfileNav && !profileNavRef.current.contains(e.target)){
                setShowProfileNav(false)
            }
        };
        document.addEventListener("mousedown", handler);

        return() =>{
            document.removeEventListener("mousedown", handler)
        }
    });

    useEffect(() => {
    const fetchUser = async () => {
        const { data: user, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Error fetching user:', error.message);
        } else {
            console.log(user)
            setUser(user)
        }
    };
        fetchUser();
    }, []);
    

    function toggleProfileNav(){
        setShowProfileNav(!showProfileNav)
    }

    return(
        <div ref={profileNavRef} >
            <div onClick={toggleProfileNav} className="text-slate-100 flex hover:cursor-pointer p-2 z-10 hover:bg-gray-900 hover:bg-opacity-50 rounded-full">
                
                <p>{user ? user.email : 'Loading...'}</p>
                <Person />
            </div>
            {
                showProfileNav && <ProfileNav/>
            }
        </div>
    )
}