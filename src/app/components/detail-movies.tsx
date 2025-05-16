
import Image from "next/image";

type MovieType = {
    id?: number;
    poster_path?: string;
    title?: string;
    overview?: string;
    release_date?: string;
    vote_average?: number;
    adult?: boolean;
    
  }

  interface MovieProps {
    data?: MovieType
  }

  interface CardProp {
    id: number;
    imageUrl: string;
    title: string;
    voting: number;
    years: string;
    category: string;
  }

 export const CardDetail = ({imageUrl, title, voting, years, category}: CardProp) => {

    return (
        <div className="group cursor-pointer">
        <div className="relative rounded-lg overflow-hidden">
          <div className="aspect-[4/3] w-full h-[450px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div className="absolute top-2 right-2  text-white rounded-full w-8 h-8 flex items-center justify-center font-medium">
            {voting}
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center text-gray-400 text-sm">
            <span>{years}</span>
            <span className="mx-2">•</span>
            <span>{category}</span>
          </div>
          <h3 className="text-white font-semibold mt-1">{title}</h3>
        </div>
      </div>
        
    )
}

export const MovieCardDetail = ({data}: MovieProps) => {

    return (
        <div>
                <CardDetail
                  key={data?.id}
                  title={data?.title || ""}
                  voting={data?.vote_average || 0}
                  imageUrl={`https://image.tmdb.org/t/p/original/${data?.poster_path}`}
                  years={data?.release_date || "" }
                  category={ data?.adult ? "PA" : "PE" }
                  id={data?.id || 0}
                />
        </div>
    )
}