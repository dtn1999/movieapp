"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/original";

interface Movie {
  backdrop_path: string;
  title?: string;
  name?: string;
  overview: string;
  genres: { id: number; name: string }[];
}

interface Credits {
  cast: {
    id: number;
    name: string;
    profile_path: string;
    known_for_department: string;
  }[];
}

export default function MediaDetailPage() {
  const { type, id } = useParams();
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);

  useEffect(() => {
    if (!type || !id) return;

    // Fetch movie or tv details
    fetch(`${API_URL}/${type}/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Content not found");
        return res.json();
      })
      .then(setMovie)
      .catch(console.error);

    // Fetch credits
    fetch(`${API_URL}/${type}/${id}/credits?language=en-US`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Credits not found");
        return res.json();
      })
      .then(setCredits)
      .catch(console.error);
  }, [type, id]);

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-[#1e293b] rounded hover:bg-[#2d3a4f] transition cursor-pointer"
      >
        ← Back
      </button>

      {movie.backdrop_path && (
        <img
          src={`${IMG_BASE}${movie.backdrop_path}`}
          className="rounded w-full h-92 object-cover mb-4"
          alt={movie.title || movie.name}
        />
      )}
      <h1 className="text-2xl font-bold mb-2">{movie.title || movie.name}</h1>
      <p className="mb-4 text-gray-300">{movie.overview}</p>

      <h2 className="text-xl font-semibold mb-2">Genres</h2>
      <div className="flex gap-2 mb-4 flex-wrap">
        {movie.genres?.map((g) => (
          <span
            key={g.id}
            className="bg-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {g.name}
          </span>
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-2">Credits</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {credits?.cast?.slice(0, 8).map((person) => (
          <div key={person.id} className="bg-[#1e293b] p-2 rounded">
            {person.profile_path && (
              <img
                src={`${IMG_BASE}${person.profile_path}`}
                alt={person.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <p>
              <strong>Name:</strong> {person.name}
            </p>
            <p>
              <strong>Job:</strong> {person.known_for_department}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
