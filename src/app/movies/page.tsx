import MoviesList from '@/components/moviesList'
import SearchInput from '@/components/searchInput'
import React from 'react'

const Movies = () => {
    return (
        <div className='flex flex-col gap-y-4 p-8 h-full w-full text-white'>
            {/* Search input */}
            {/*  TODO: It is not obvious to see the way that the search input impacts the Movie list
            It is not easy to see the how data is fetched.
      */}
            <SearchInput/>
            {/* grid listing cards */}

            <div className='p-4 overflow-y-scroll h-full w-full relative'>
                <MoviesList/>
            </div>
        </div>
    )
}

export default Movies