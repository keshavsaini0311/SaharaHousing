/* eslint-disable no-unused-vars */
import React from 'react'
import {Link} from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' m-2 text-3xl text-center font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4'action="">
        <input className=' border p-3 rounded-lg ' id='username' type="text" name=""placeholder='Username'  />
        <input className=' border p-3 rounded-lg' id='email' type="email" name=""placeholder='Email' />
        <input className=' border p-3 rounded-lg' id='password' type="password" name=""placeholder='Password' />
        <button className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-15'>Sign up</button>
      </form>
    <div className=' flex gap-2 mt-5'>
      <p>Have an account</p>
      <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
      </Link>
    </div>
    </div>
  )
}
