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
    movieList: Movie[];
    error?: string;
    movieDetails?: Movie;
    searchTerm?: string;
    nbrPages: number;
    notify: boolean;
    getMovies: (page: number) => void;
}

export const movieStore = create<MovieStore>((set, get) => ({
    movieList: [],
    error: undefined,
    movieDetails: undefined,
    searchTerm: '',
    nbrPages: 0,
    notify: false,
    getMovies: async (page = 1) => {
        const searchTerm = get().searchTerm
        
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=${page}`,
                {
                    headers: {
                        // TODO: You should NEVER hardcode your API keys in the code !!!!!!!!
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
                        accept: 'application/json'
                    }
                }
            )

            if (!response.ok) {
                set({error: 'Something went wrong during fetching'})
                // TODO: If someting is wrong the user must know,
                // So you should pass the error somehow to the UI


                set({notify: true})
                return
            }

            const results = await response.json()


            set({movieList: results?.results, nbrPages: results?.page})
        } catch (error) {
            set({notify: true})
            set({error: 'Couldnt fetch data'})
        }

    },
}))