'use client'
import { movieStore } from '@/store/movieStore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const MovieDetail = ({ params }: { params: Promise<{ movieId: string }> }) => {
    const [movieId, setMovieId] = useState<string>('');
    const [credits, setCredits] = useState<any[]>([]);
    const [details, setDetails] = useState<any>();
    const movieDetails = movieStore(state => state.movieDetails)

    useEffect(() => {
        const unwrapParams = async () => {
            const resolvedParams = await params;
            setMovieId(resolvedParams.movieId);
        };

        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (!movieId) return;

        const fetchDetails = async () => {
            console.log(movieId, 'idddddddddd');

            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    {
                        headers: {
                            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjEzYTZlMjAzYzk2ZWZlZTdhZDNhZTMxN2VmOWU0OSIsIm5iZiI6MTYyOTM1MTAwOS43MTYsInN1YiI6IjYxMWRlYzYxNTQzN2Y1MDA0NTE0NmEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zEdBvLFNvevGtSDysr43EY2X-0YfX1Rv0Ui-z29ot5E',
                            accept: 'application/json'
                        }
                    }
                )

                if (!response.ok) {
                    return
                }

                const result = await response.json()
                console.log(result, 'deta');
                setDetails(result)


            } catch (error) {

            }
        }
        const fetchCredits = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjEzYTZlMjAzYzk2ZWZlZTdhZDNhZTMxN2VmOWU0OSIsIm5iZiI6MTYyOTM1MTAwOS43MTYsInN1YiI6IjYxMWRlYzYxNTQzN2Y1MDA0NTE0NmEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zEdBvLFNvevGtSDysr43EY2X-0YfX1Rv0Ui-z29ot5E',
                        accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('unable to get credits');
                }

                const data = await response.json();
                console.log(data, 'credits....');
                setCredits(data?.crew);
            } catch (error) {
                console.error('unable to get credits', error);
            }
        };
        fetchDetails()
        fetchCredits();
    }, [movieId]);

    console.log(movieDetails, 'details');

    return (
        <div className='w-full h-screen space-y-2 px-8 text-white overflow-y-scroll' id={movieId || ''}>
            <div className='relative w-full h-[307px] rounded-xl'>
                <p className='absolute bg-[#10141F] text-xl text-white font-bold right-1 top-2 w-auto h-auto p-2 rounded-full z-99 text-center'>
                    {details?.vote_count}
                </p>
                <Image alt='' src={`https://image.tmdb.org/t/p/original${details?.poster_path}`} fill className='rounded-xl object-cover' />
            </div>
            <p>
                <span className='font-bold text-gray-600 text-2xl'>
                    {details?.release_date.slice(0, 4) || "2022"}
                </span>
                {details?.adult && <span>
                    {'• '} {'PG'}
                </span>}
            </p>
            <p className='text-2xl font-bold'>
                {details?.title || "Film title"}
            </p>
            <h1 className='my-12 text-2xl font-light'>Credits</h1>
            <div className='grid grid-cols-3 gap-4'>
                {credits && credits.map((credit: any) => (
                    <div key={credit?.id} className='flex flex-start w-[336px] space-x-2 items-center'>
                        <div className='relative w-24 h-24'>
                            <Image alt='' src={`https://image.tmdb.org/t/p/original${credit?.profile_path}`} fill className='rounded-full object-cover' />
                        </div>
                        <div className='flex flex-col justify-between py-3 h-full'>
                            <p className='w-auto'><span className='font-bold'>Name:</span> {credit?.original_name}</p>
                            <p className='w-auto'><span className='font-bold'>Job:</span> {credit?.job}</p>
                        </div>
                    </div>)
                )}
            </div>
        </div>
    );
};

export default MovieDetail