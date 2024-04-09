'use client'

import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { Article, Gavel, Person } from "@mui/icons-material"
import { Help } from "@mui/icons-material"

export default function ProfileNav({mobile= false, show= false}){
    return(
            <div id="profileNav" className={!mobile ? `z-50 fixed right-5 flex flex-col items-center text-right bg-gray-900 border border-slate-400 transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}` : `z-50 fixed right-0 flex flex-col w-[18.75rem] items-center bg-gray-900 border border-slate-400 p-10 px-16 transition-all duration-500 ${show ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                
                <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
                    <Person />
                    <Link href="/account">Account</Link>
                </div>
                <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
                    <Help />
                    <Link href="/help">Help</Link>
                </div>
                <div className="py-2 w-52 items-center justify-center hover:underline hover:text-green-600 hover:cursor-pointer flex border-b border-slate-400">
                    <Gavel />
                    <Link href="/termsofservice">Terms Of Service</Link>
                </div>
                <div className="py-2 w-52 items-center justify-center  hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-slate-400">
                    <Article />
                    <Link href="/impressum">Impressum</Link>
                </div>
                <SignOutButton />
            </div>
    )
}