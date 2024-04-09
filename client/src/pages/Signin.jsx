/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {Link,useNavigate } from 'react-router-dom'
import {useDispatch ,useSelector} from 'react-redux'
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice'

export default function Signin() {
  const [formData,setFormData]=useState({});
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      
     dispatch(signInStart());
      const res= await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      }
      );
      const data =await res.json();
      if(data.success===false){
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
      console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' m-2 text-3xl text-center font-semibold'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'action="">
        <input className=' border p-3 rounded-lg'onChange={handleChange} id='email' type="email" name=""placeholder='Email' />
        <input className=' border p-3 rounded-lg'onChange={handleChange} id='password' type="password" name=""placeholder='Password' />
        <button disabled={loading}type='submit' className=' bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-15'>{loading?'Loading':'Sign In'}</button>
      </form>
    <div className=' flex gap-2 mt-5'>
      <p>Dont Have an account</p>
      <Link to={"/sign-up"}>
        <span className=' text-blue-700'>Sign Up</span>
      </Link>
    </div>
    {error &&<p className='text-red-500'>{error}</p>}
    </div>
  )
}

