import React from 'react'
import { Loader } from 'lucide-react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <Loader className='size-8' />
    </div>
  )
}

export default Loading