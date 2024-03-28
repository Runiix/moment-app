'use client'

import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { Article, Gavel, Person } from "@mui/icons-material"
import { Help } from "@mui/icons-material"

export default function ProfileNav(){
    return(

            <div className="fixed right-10 flex flex-col items-center text-right bg-gray-900 bg-opacity-50 transition-all duration-300">
                <div className="px-4 py-2 w-full hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-gray-900">
                    <Person />
                    <Link href="/account">Account</Link>
                </div>
                <div className="px-4 py-2 w-full hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-gray-900">
                    <Help />
                    <Link href="/help">Help</Link>
                </div>
                <div className="px-4 py-2 w-full hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-gray-900">
                    <Gavel />
                    <Link href="/termsofservice">Terms Of Service</Link>
                </div>
                <div className="px-4 py-2 w-full hover:underline hover:text-green-600 hover:cursor-pointer flex gap-2 border-b border-gray-900">
                    <Article />
                    <Link href="/impressum">Impressum</Link>
                </div>
                <SignOutButton />
            </div>
    )
}