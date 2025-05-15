import Image from 'next/image'
import React from 'react'
import { Grid2x2Icon } from 'lucide-react'
export default function SideBar () {
  return (
    <div className='flex flex-col justify-between items-center gap-10 bg-[#161D2F] h-full py-12 px-4 rounded-xl'>
        <div className='relative size-[40px]'>
            <Image 
                src={'/assets/Logo.png'}
                alt='logo'
                fill
            />
        </div>
        <div className='flex-1 h-full text-white'>
            <Grid2x2Icon size={40} />
        </div>
        <div className='relative size-[40px]'>
            <Image 
                src={'/assets/user.png'}
                alt='user'
                fill
            />
        </div>
    </div>
  )
}
