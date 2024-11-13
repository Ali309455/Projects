import React from 'react'
import { FaLock } from 'react-icons/fa'


const Navbar = () => {
  return (
    <nav className='w-full  text-white font-poppins'>
        <div className=' bg-pink-400 justify-between w-full flex  py-1 ' >
        <div className="logo flex items-center   "><span className='text-pink-600 flex items-center gap-0 pl-2  text-3xl'>&lt;<span className='text-white text-sm'><FaLock /></span>&gt;</span><span className='text-lg'>The Safe</span></div>
        <div className='mx-3' >
            <button className="tags flex items-center gap-1 px-3 py-1 rounded-md bg-pink-500 hover:bg-pink-600"><img src="/github.svg" alt="github" className='invert' width={30} /><a href="http://localhost:5173/" target='_blank'>Github</a></button>
        </div>
        </div>
    </nav>
  )
}

export default Navbar
