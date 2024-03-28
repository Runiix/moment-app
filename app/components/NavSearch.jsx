'use client'

import { Search } from "@mui/icons-material"
import { useState } from "react"

export default function NavSearch({ onSearch }){

    const [showSearch, setShowSearch]= useState(false)
    const [query, setQuery] = useState('a')

    const handleSearch = (event) => {
        const newQuery= event.target.value
        setQuery(newQuery)
        onSearch(newQuery);
    };

    return(
        <div className="flex">
            <div>
                {
                    showSearch ?                
                    <div className="flex items-center gap-2">
                        <input id="search_input" value={query} className=" bg-zinc-900 bg-opacity-50 border border-slate-100 hover:bg-zinc-800 hover:cursor-pointer p-2 rounded-lg"  type="text" placeholder="Search a Movie" onChange={()=> handleSearch}/>
                        <Search onClick={() => setShowSearch(showSearch)}/>
                    </div>

                    :<Search onClick={() => setShowSearch(!showSearch)}/>
                }
            </div>
        </div>
    )
}