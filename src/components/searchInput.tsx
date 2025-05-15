'use client'
import { movieStore } from '@/store/movieStore'
import { Search } from 'lucide-react'
import React, { useState } from 'react'

// TODO: Your code is not easy to understand because it is too fragmented
//   Why are you using a store to perform a search?
const SearchInput = () => {
    const [search, setSearch] = useState('')
    const {getMovies} = movieStore.getState()

    const handleSearch = (e:any) =>{
        setSearch(e.target.value),
        movieStore.setState({searchTerm: e.target.value})
        getMovies(1)
    }

  return (
    <div className='flex items-center text-2xl text-white'>
        <Search size={28} className='mx-2' />
        <input
            value={search}
            onChange={(e)=>{
                handleSearch(e)
            }}
            placeholder='Search for movies or TV series'
            className='placeholder:text-xl placeholder:font-extrabold placeholder:text-gray-600 p-3 rounded-lg'
        />
    </div>
  )
}

export default SearchInput