import { Movie } from '@/store/movieStore'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const MovieCard = ({ movie }: { movie: Movie }) => {

  const { id, title, vote_count, poster_path, release_date, adult } = movie;


  return (
    <Link href={`movies/${id}`} key={id}>
      <div className='relative w-[383px] h-[396px] space-y-2' id={id}>
      <p className='absolute bg-[#10141F] text-xl text-white font-bold right-1 top-2 opacity-90 w-auto h-auto px-2 py-1 rounded-full z-99 text-center'>
          {vote_count}
        </p>
        <div className='relative w-[383px] h-3/4 rounded-xl'>
          <Image alt='' src={`https://image.tmdb.org/t/p/original${poster_path}`} fill className='rounded-xl object-cover z-10' />
        </div>
        <p>
          <span className='font-bold text-gray-600 text-2xl'>
            {release_date.slice(0, 4)}
          </span>
          {adult && <span>
            {'• '} {'PG'}
          </span>}
        </p>
        <p className='text-white font-bold'>
          {title}
        </p>
      </div>
    </Link>
  )

}

export default MovieCard