import React from 'react'

const Navbar = () => {
  return (
    // <nav>
    //   <ul className='list-none flex w-[45vw] justify-evenly h-[35%] text-white p-2 px-3 '>
    //     <li>Day</li>
    //     <li>Week</li>
    //     <li>Month</li>
    //     <li>Year</li>
    //   </ul>
    //   <div className="break h-[2px] bg-gray-900 w-full"></div>
    // </nav>

    <nav>
  <ul className='list-none flex w-[100%] max-sm:text-xs justify-evenly h-[35%] text-white p-2 px-3'>
    <li className="relative hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-500 hover:cursor-pointer">
      Day
    </li>
    <li className="relative hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-500 hover:cursor-pointer">
      Week
    </li>
    <li className="relative hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-500 hover:cursor-pointer">
      Month
    </li>
    <li className="relative hover:after:content-[''] hover:after:absolute hover:after:left-0 hover:after:-bottom-2 hover:after:w-full hover:after:h-[2px] hover:after:bg-blue-500 hover:cursor-pointer">
      Year
    </li>
  </ul>
  <div className="break h-[2px] bg-gray-900 w-full"></div>
</nav>

  )
}
export default Navbar
