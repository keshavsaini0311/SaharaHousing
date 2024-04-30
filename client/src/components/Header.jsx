/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import {FaSearch} from 'react-icons/fa'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Header() {
    const {currentUser}=useSelector(state=>state.user)
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const handlesubmit=(e)=>{
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('searchTerm');
        if (searchTerm) {
          setSearchTerm(searchTerm);
        }
    }, [window.location.search]);
  return (
   <header className='z-100 justify-between bg-slate-200 shadow-md sticky top-0 w-full '>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    <Link to='/'>
    <h1 className='font-bold-text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Sahara</span>
        <span className='text-slate-700'>Housing</span>
    </h1>
    </Link>
    <div className='rounded-lg bg-slate-100 flex sm:flex-row items-center'>
    <form onSubmit={handlesubmit} className='  p-3 rounded-lg ' action="">
        <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search...' type="text" name="" id="" className='bg-slate-100 w-20 sm:w-64 outline-none bg-transparent'/>
        <button className='' >
        <FaSearch className=' text-slate-600'/>
        </button>
    </form>
    </div>
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
