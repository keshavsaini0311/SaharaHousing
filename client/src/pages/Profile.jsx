/* eslint-disable no-unused-vars */
import React from 'react'
import { useSelector } from 'react-redux'
import {useRef ,useState,useEffect} from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'

export default function Profile() {
  const fileRef = useRef()
  const user = useSelector((state) => state.user.currentUser)
  const[file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formdata , setFormdata] = useState({
    
  })
  console.log(formdata);
  console.log(fileUploadError);
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
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className=' text-center text-3xl font-bold mb-4 text-slate-800 my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} className="hidden" accept="image/*" />
        <img onClick={() => fileRef.current.click()} className='mt-2 self-center cursor-pointer object-cover w-32 h-32 rounded-full' src={formdata.avatar || user.avatar} alt="" />
<p className='text-center'>
  {fileUploadError ? (
    <span className='text-red-500'>Upload Failed</span>
  ): filePerc >0&& filePerc < 100 ? (
      <span className='text-slate-500'>{filePerc}%</span>
    ): filePerc === 100 ? (
        <span className='text-green-500'>Uploaded Successfully</span>
      ): (
        ""
      )}
</p>
        <input id='username' type="text" placeholder='Username' className='border p-3 rounded-lg' />
        <input id='email' type="text" placeholder='email' className='border p-3 rounded-lg' />
        <input id='password' type="text" placeholder='password' className='border p-3 rounded-lg' />
        <button className='border p-3 rounded-lg bg-slate-700 text-white uppercase hover:opacity-80 disabled:opacity-25'>Update</button>
      </form>
      <div className='mt-5 flex justify-between'>
        <span className='text-red-500 cursor-pointer hover:underline'>Delete Account</span>
        <span className=' text-red-500 cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </div>
  )
}
