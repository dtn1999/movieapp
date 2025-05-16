import Image from "next/image"
import Link from "next/link"
import { Film, } from "lucide-react"

export const SideBar = () => {
    return (
        <div className="flex flex-col items-center justify-between rounded-lg p-8 m-8  h-full w-[35px] bg-[#161D2F]">
         <div className="px-6 py-4 mt-8">
             <Link href="/" className="">
               <Image
                 src="/Logo.png"
                 alt="LOGO PAGE"
                 width={65}
                 height={65}
               />
             </Link>
             <Link href="/">
              <Film className="text-white mt-5" size={50}/>
             </Link>
         </div>
         <div>
            
         </div>
        </div>
    )
}
