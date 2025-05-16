"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch, FaBars, FaUserCircle } from "react-icons/fa";

const API_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

export default function HomePage() {
  const router = useRouter();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/trending/all/week?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-white">
      {/* SIDEBAR FIXED */}
      <div className="fixed top-0 left-0 h-screen w-16 mx-2 rounded-[1rem] sm:w-20 mb-2 mt-2 bg-[#1e293b] flex flex-col justify-between py-4 px-2 z-20">
        <div>
          <div className="text-2xl mb-6 flex justify-center sm:justify-center">
            <FaBars />
          </div>
        </div>
        <div className="text-3xl flex justify-center sm:justify-center">
          <FaUserCircle />
        </div>
      </div>

      {/* MAIN CONTENT wrapper */}
      <div className="flex-1 ml-16 sm:ml-24 flex flex-col">
        {/* NAVBAR FIXED */}
        <div className="fixed top-0 left-16 sm:left-24 right-0 bg-[#0f172a] p-4 z-10 shadow-md">
          {/* SEARCH BAR */}
          <div className="relative max-w-md mx-4">
            <input
              type="text"
              placeholder="Search for a movie..."
              className="w-full p-2 pl-10 rounded bg-[#1e293b] text-white placeholder-gray-400 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* CONTENT below navbar */}
        <div className="mt-20 p-4 overflow-auto">
          {/* MOVIE GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              movies
                .filter((movie) =>
                  (movie.title || movie.name || "")
                    .toLowerCase()
                    .includes(search.toLowerCase())
                )
                .map((movie) => (
                  <div
                    key={movie.id}
                    onClick={() => router.push(`/media/${movie.media_type}/${movie.id}`)}
                    className="bg-[#1e293b] rounded shadow-md hover:scale-105 transition cursor-pointer"
                  >
                    <img
                      src={`${IMG_BASE}${movie.poster_path}`}
                      alt={movie.title || movie.name}
                      className="rounded-t w-full h-48 object-cover"
                    />
                    <div className="p-2">
                      <p className="text-sm text-gray-400 flex gap-2 items-center">
                        {movie.release_date?.slice(0, 4) ||
                          movie.first_air_date?.slice(0, 4) ||
                          "N/A"}
                        •{" "}
                        {movie.media_type === "tv" ||
                        movie.first_air_date
                          ? "TV"
                          : "Movie"}
                        • {movie.adult ? "18+" : "PG"}
                      </p>
                      <h3 className="font-semibold text-lg">
                        {movie.title || movie.name}
                      </h3>
                      {/* <p className="text-sm">⭐ {movie.vote_average}</p> */}
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}