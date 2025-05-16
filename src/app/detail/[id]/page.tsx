import { MovieCardDetail } from "@/app/components/detail-movies";

export default async function  DetailPage({
    params
  }: {
    params: { id: number }
  }) {
    
    const { id } = params

 const  token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjEzYTZlMjAzYzk2ZWZlZTdhZDNhZTMxN2VmOWU0OSIsIm5iZiI6MTYyOTM1MTAwOS43MTYsInN1YiI6IjYxMWRlYzYxNTQzN2Y1MDA0NTE0NmEyNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zEdBvLFNvevGtSDysr43EY2X-0YfX1Rv0Ui-z29ot5E'
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
    method: "GET",
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const movie = await response.json();
    return (
        <div className="flex-1 px-6 py-10">
            <div className="grid grid-cols-1">
                 <MovieCardDetail data={movie} />
            </div>
        </div>
    )
}