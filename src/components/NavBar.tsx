'use client';
import Link from 'next/link';
export default function NavBar() {
    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-blue/60 backdrop-blur-lg">
          <img src="/fav_lol.png" alt="LOL App Logo" className="w-10 h-10"/>
      {/* links only visible of large sreens*/}
      <div className="items-center hidden space-x-6 lg:block">
        <Link href="#"
        className='text-lg font-medium text-gray-700 transition-colors hover:text-blue-600'
        >About</Link>
        <Link href="#"
        className='text-lg font-medium text-gray-700 transition-colors hover:text-blue-600'
        >Blog</Link>
        <Link href="#"
        className='text-lg font-medium text-gray-700 transition-colors hover:text-blue-600'
        >Contact Us</Link>
      </div>
      <div className="items-center hidden space-x-4 lg:block">
        <Link href="/send"
         className="px-4 py-2 font-medium text-blue-600 transition-colors bg-blue-100 hover:text-blue-1000 rounded-xl hover:bg-blue-200">
        SignUp
        </Link>
        <Link href="/login"
         className="px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-400">
        Login
        </Link>
      </div>
      {/* menu icon */}
      <div className="lg:hidden">
        <button className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
    )}