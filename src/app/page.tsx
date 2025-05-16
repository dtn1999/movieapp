"use client"

import React, { useState } from "react";
import { MovieCard } from "./components/movie-card";
import { Search } from "./components/search";

type Movie = {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average?: number;
  adult?: boolean;
};

export default function Home() {
  const [filteredMovies, setFilteredMovies] = useState<Movie[] | null>(null);
  const [data, setData] = useState<Movie[]>([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjEzYTZlMjAzYzk2ZWZlZTdhZDNhZTMxN2VmOWU0OSIsIm5iZiI6MTYyOTM1MTAwOS43MTYsInN1YiI6IjYxMWRlYzYxNTQzN2Y1MDA0NTE0NmEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zEdBvLFNvevGtSDysr43EY2X-0YfX1Rv0Ui-z29ot5E';
      const response = await fetch("https://api.themoviedb.org/3/search/movie?query=manga&include_adult=false&language=en-US&page=1", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const movie = await response.json();
      setData(movie.results);
    };
    fetchMovies();
  }, []);

  const filterMovies = (search: string) => {
    const filtered = data?.filter((item: Movie) => {
      return item?.title.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredMovies(filtered);
  };

  return (
    <div className="w-full">
      <div className="flex-1 px-6 py-10">
        <Search filterMovies={filterMovies} />
        {filteredMovies && (
          <div>
            <MovieCard data={filteredMovies} />
          </div>
        )}
        {!filteredMovies && (
          <div>
            <MovieCard data={data} />
          </div>
        )}
      </div>
    </div>
  );
}