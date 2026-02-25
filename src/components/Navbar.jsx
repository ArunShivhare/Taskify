import React from 'react'

const Navbar = ({ darkMode, setDarkMode }) => {
  return (
    <nav className='bg-white/80 dark:bg-slate-900/80
backdrop-blur-xl
border-b border-slate-200 dark:border-slate-800
shadow-sm
transition-colors duration-500 sticky top-0 z-10'>
      {/* can add mycontainer utility made in index.css */}
      <div className="flex justify-between items-center px-5 py-5 h-12">
        <h1 className="text-xl sm:text-xl font-semibold tracking-tight text-slate-800 text-center">
          <span className="text-indigo-600">TASK</span>
          <span className="text-slate-900 dark:text-slate-100">iFY</span>
        </h1>
        <ul className='flex items-center'>
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
          <li>
            <button
              onClick={() => setDarkMode(prev => !prev)}
              className="ml-4 flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-slate-700 dark:text-yellow-300 hover:scale-105 transition-all duration-300 shadow-sm"
            >
              <span className="text-sm font-medium">
                {darkMode ? "Light" : "Dark"}
              </span>
              <span className="text-lg">
                {darkMode ? "☀️" : "🌙"}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
