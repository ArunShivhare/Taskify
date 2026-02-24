import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-white backdrop-blur-md shadow-sm border-b border-yellow-100 sticky top-0 z-10'>
      {/* can add mycontainer utility made in index.css */}
      <div className="flex justify-between items-center px-5 py-5 h-12">
        <h1 className="text-xl sm:text-xl font-semibold tracking-tight text-slate-800 text-center">
              <span className="text-indigo-600">TASK</span>
              <span className="text-slate-900">iFY</span>
            </h1>
        <ul>
          <li className='flex gap-4 items-center'>
            {/* <a className='text-black hover:font-bold' href="/">Home</a>
            <a className='text-black hover:font-bold' href="#">About</a>
            <a className='text-black hover:font-bold' href="#">Contact</a> */}
            <a
              href="https://github.com/ArunShivhare"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="p-2 w-11 hover:w-12 transition-all duration-200"
                src="/github.svg"
                alt="GitHub"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
