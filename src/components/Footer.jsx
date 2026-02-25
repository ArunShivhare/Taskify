import React from 'react'

const Footer = () => {
  return (
    <div className='fixed bottom-0 w-full flex justify-center bg-white/70 dark:bg-slate-900/80
backdrop-blur-md
border-t border-slate-200 dark:border-slate-800
text-slate-600 dark:text-slate-400
transition-colors duration-500
 text-center tracking-wide py-3'>
      <p>Developed By Arun | <span className="text-indigo-600">TASK</span>
          <span className="text-slate-900 dark:text-slate-100">iFY</span> &copy; 2026 All rights reserved.</p>
    </div>
  )
}

export default Footer
