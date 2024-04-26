/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [Landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState('')
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userref}`)
                const data = await res.json()
                setLandlord(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLandlord()
    }, [listing.userref])
  return (
    <>
    {Landlord &&(
        <div className='flex flex-col gap-2'>
            <p className='text-md'>Contact <span className='font-bold'>{Landlord.username}</span> for the <span className='font-bold'>{listing.name}</span> </p>
            <textarea onChange={(e) => setMessage(e.target.value)} name="" id="" className='w-full border p-3 rounded-lg' rows="3" value={message}></textarea>
            <Link className='bg-slate-700 text-white text-center uppercase p-3 rounded-lg hover:bg-slate-800' to={`mailto:${Landlord.email}?Subject=${listing.name}&body=${message}`}>
            Send Message
            </Link>
        </div>
    )}
    </>
  )
}
