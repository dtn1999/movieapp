'use client'
import {Movie, movieStore} from '@/store/movieStore'
import React, {useEffect} from 'react'
import MovieCard from './movieCard'
import HandlePagination from './pagination'

const MoviesList = () => {
    // TODO: Why do you need a store?
    const {getMovies} = movieStore.getState()
    const movieList = movieStore(state => state.movieList)
    useEffect(() => {
        getMovies(1)
    }, [])

    if (movieList.length < 1) {
        return <div className='text-white'>No movie found</div>
    }

    return (
        <div className='h-full w-full overflow-scroll'>
            <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 border-white'>
                {/* Cards */}
                {/* TODO: How do you handle the case where the movie list is empty*/}
                {/* TODO: You can use optional chaining */}
                {movieList?.map((movie: Movie) => (
                    // TODO: If you don't use a key prop, react will complain
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </div>
            <div className='relative flex justify-center w-full bg-gray-900'>
                <HandlePagination/>
            </div>
        </div>
    )
}

export default MoviesList