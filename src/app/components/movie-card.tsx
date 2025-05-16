import Image from "next/image";
import Link from "next/link";



type MovieType = {
    id?: number;
    poster_path?: string;
    title?: string;
    release_date?: string;
    vote_average?: number;
    adult?: boolean;
    
  }

  interface MovieProps {
    data?: MovieType[]
  }

  interface CardProp {
    id: number;
    imageUrl: string;
    title: string;
    voting: number;
    years: string;
    category: string;
  }

 const Card = ({id,imageUrl, title, voting, years, category}: CardProp) => {

    return (
             <div className="relative w-[200px] h-[340px] group cursor-pointer overflow-hidden">
                <div className="relative aspect-[4/2]">
            <Link href={`/detail/${id}`}>
                <Image 
                   src={imageUrl}
                   alt={title}
                   width={200}
                   height={200}
                   className="object-cover rounded-lg  object-content group:hover:scale-105"
                  />
                </Link>
                 
                </div>
              <div className="absolute top-3 right-2.5 text-white">
                   {voting}
                </div> 
                <div className="flex items-center text-gray-400 text-sm">
                    <span>{years}</span>
                    <span className="mx-2 font-bold">.</span>
                    <span>{category}</span>
                </div>               
                <h3 className="text-white font-bold ">{title}</h3>
             </div>
        
    )
}

export const MovieCard = ({data}: MovieProps) => {

    return (
        <div className="flex flex-row flex-wrap gap-6 py-5">
            {data?.map((item)=> (
                <Card
                  key={item.id}
                  title={item.title || ""}
                  voting={item.vote_average || 0}
                  imageUrl={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                  years={item.release_date || "" }
                  category={ item.adult ? "PA" : "PE" }
                  id={item.id || 0}
                />
            ) )}

        </div>
    )
}