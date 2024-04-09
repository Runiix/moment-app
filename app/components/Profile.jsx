'use client'

import { useEffect, useState, useRef } from "react"
import { Person } from "@mui/icons-material"
import ProfileNav from "./ProfileNav"
import { supabase } from "../utils/supabaseClient"

export default function Profile({mobile=false}){ 

    const [showProfileNav, setShowProfileNav]= useState(false)
    const [loading, setLoading]= useState(true);
    const [currentUser, setCurrentUser]= useState(null);
    const [UserName, setUserName]= useState(null)
 

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

    useEffect(() =>{
        const fetchUser = async () => {
            const { data: user, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
            } else {       
                return user
            }
        };
        fetchUser().then(u => {
            setCurrentUser(u);
            setLoading(false)
            const myArray= u.user.email.split("@")
            setUserName(myArray[0])
        });
    }, [])
    
    

    function toggleProfileNav(){
        setShowProfileNav(!showProfileNav)
    }


    return(
        <div ref={profileNavRef} >
            <div onClick={toggleProfileNav} className="text-slate-100 flex hover:cursor-pointer p-2 z-10 hover:text-slate-400 hover:bg-opacity-50 rounded-full">
                <p className="hidden lg:flex">{loading ? "loading..." : UserName}</p>
                <Person />
            </div>
             <ProfileNav mobile={mobile} show={showProfileNav} />
        </div>
    )
}