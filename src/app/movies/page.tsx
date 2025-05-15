import MoviesList from '@/components/moviesList'
import Pagination from '@/components/pagination'
import SearchInput from '@/components/searchInput'
import React from 'react'

const Movies = () => {
  return (
    <div className='flex flex-col gap-y-4 p-8 h-full w-full'>
      {/* Search input */}
      <SearchInput />
      {/* grid listing cards */}

      <div className='p-4 overflow-y-scroll h-full w-full relative'>
        <MoviesList />
      </div>
    </div>
  )
}

export default Movies