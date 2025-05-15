import {create} from 'zustand'

export type Movie = {
    id: string;
    overview: string;
    adult: boolean;
    release_date: string;
    title: string;
    poster_path: string;
    vote_count: number;
    credits: any[]
}

type MovieStore = {
    movieList: [];
    error?: string;
    movieDetails?: Movie;
    searchTerm?: string;
    nbrPages: number;
    getMovies: (page: number) => void;
}

export const movieStore = create<MovieStore>((set, get) => ({
    movieList: [],
    error: undefined,
    movieDetails: undefined,
    searchTerm: '',
    nbrPages: 0,
    getMovies: async (page = 1) => {
        const searchTerm = get().searchTerm
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
                {
                    headers: {
                        // TODO: You should NEVER hardcode your API keys in the code !!!!!!!!
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjEzYTZlMjAzYzk2ZWZlZTdhZDNhZTMxN2VmOWU0OSIsIm5iZiI6MTYyOTM1MTAwOS43MTYsInN1YiI6IjYxMWRlYzYxNTQzN2Y1MDA0NTE0NmEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zEdBvLFNvevGtSDysr43EY2X-0YfX1Rv0Ui-z29ot5E',
                        accept: 'application/json'
                    }
                }
            )

            if (!response.ok) {
                set({error: 'Something went wrong during fetching'})
                // TODO: If someting is wrong the user must know,
                // So you should pass the error somehow to the UI
                return
            }

            const results = await response.json()


            set({movieList: results?.results, nbrPages: results?.page})
        } catch (error) {
            set({error: 'Couldnt fetch data'})
        }

    },
}))