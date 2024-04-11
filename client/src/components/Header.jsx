/* eslint-disable no-unused-vars */
import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser}=useSelector(state=>state.user)
  return (
   <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to='/'>
    <h1 className='font-bold-text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Sahara</span>
        <span className='text-slate-700'>Housing</span>
    </h1>
    </Link>
    <form className='w-24 sm:w-64 bg-slate-100 p-3 rounded-lg flex items-center' action="">
        <input placeholder='Search...' type="text" name="" id="" className='bg-transparent'/>
        <FaSearch className=' text-slate-600'/>
    </form>
    <ul className=' flex gap-4'>
    <Link to='/'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
    </Link>
    <Link to='/about'>
        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
    </Link>
    <Link to='/profile'>
    { currentUser ?(
        <img className='object-cover w-8 h-8 rounded-full' src={currentUser.avatar} alt="" />
    
    ):<li className='hidden sm:inline text-slate-700 hover:underline'>Sign In</li>
}
</Link>
    </ul>
    </div>
   </header>
  )
}
