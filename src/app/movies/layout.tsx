import SideBar from '@/components/sideBar'
import React, { ReactNode } from 'react'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className='p-8 flex justify-start w-screen h-screen bg-[#10141F]'>
        <div className='flex gap-x-8 w-full'>
            {/* sidebar */}
            <SideBar />
            {/* mainSection */}
            <div className='w-full h-full'>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Layout