"use client"

import { SearchIcon } from "lucide-react"
import { useState } from "react"

interface SearchProp {
    filterMovies: (value: string) => void
}

export const Search = ({filterMovies}: SearchProp) => {
    const [search, setSearch] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        filterMovies(e.target.value)
    }

    return (
        <form className="relative w-full max-w-2xl">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer" size={23}/>
            <input
               type="text"
               placeholder="search for movies or tv"
               value={search}
               onChange={handleChange}
               className="w-full text-gray-300 pl-10 pr-4 py-2 rounded-md focus:outline-none focus: ring-1 focus:ring-gray-400"
            />
        </form>
    )
}