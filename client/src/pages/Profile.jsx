/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {useRef ,useState,useEffect} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice.js'


export default function Profile() {
  const dispatch = useDispatch()
  const fileRef = useRef()
  const currentUser = useSelector((state) => state.user.currentUser)
  const[file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formdata , setFormdata] = useState({
  
  })
  //console.log(formdata);
  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
        },
      (error) => {
        setFileUploadError(true)
        },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
         
           setFormdata({...formdata, avatar:downloadURL})
        })
      }
    )
  }
  const handleChange = (e) => {
    setFormdata({
      ...formdata,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      
      const res =await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      })
      const data = await res.json()
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
    }
      
  

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-center text-3xl font-bold mb-4 text-slate-800 my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} className="hidden" accept="image/*" />
        <img onClick={() => fileRef.current.click()} className='mt-2 self-center cursor-pointer object-cover w-32 h-32 rounded-full' src={formdata.avatar || currentUser.avatar} alt="" />
<p className='text-center'>
  {fileUploadError ? (
    <span className='text-red-500'>Upload Failed</span>
  ): filePerc >0&& filePerc < 100 ? (
      <span className='t ext-slate-500'>{filePerc}%</span>
    ): filePerc === 100 ? (
        <span className='text-green-500'>Uploaded Successfully</span>
      ): (
        ""
      )}
</p>
        <input onChange={handleChange} defaultValue={currentUser.username} id='username' type="text" placeholder='Username' className='border p-3 rounded-lg' />
        <input onChange={handleChange} defaultValue={currentUser.email} id='email' type="text" placeholder='email' className='border p-3 rounded-lg' />
        <input onChange={handleChange} id='password' type="password" placeholder='password' className='border p-3 rounded-lg' />
        <button type='submit' className='border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-80 disabled:opacity-25'>Update</button>
      </form>
      <div className='mt-5 flex justify-between'>
        <span className='text-red-500 cursor-pointer hover:underline'>Delete Account</span>
        <span className=' text-red-500 cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </div>
  )
}
