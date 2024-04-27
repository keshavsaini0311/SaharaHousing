/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux'
import Contact from '../components/Contact';
export default function Listing() {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [listing, setListing] = useState(null)
    const [copied, setCopied] = useState(false);
    const {currentUser} = useSelector((state) => state.user)
    const [contact, setContact] = useState(false)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const listingId = params.listingId
                const res = await fetch(`/api/listing/get/${listingId}`)
                const data = await res.json()
                if (data.success === false) {
                    setError(data.message)
                    setLoading(false)
                    console.log(data.message)
                    return
                }
                setListing(data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
                setLoading(false)
            }
        }
        fetchListing()
    },[params.ListingId])
    const regularprice= listing && listing.regularprice.toLocaleString('en-US')

  return (
    <main>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.2/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        {loading && <p className="items-center loading loading-dots loading-lg"></p>}
        {error && 
        <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Task failed to load.</span>
        </div>
        }
        {listing && !loading && !error && (
<div>
            <div className="text-center ml-2 flex p-3 items-center carousel rounded-box w-full">
                {
                    listing.imageurls.map((url, index) => (
                        <div className=" text-center ml-6 carousel-item w-full h-max" key={index} >
                            <img src={url} className="h-200 ml-auto mr-auto object-contain rounded-box"  />
                            
                        </div> 
                    ))
                }

            </div>
        
             <div className='fixed top-[20%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
             <FaShare
               className='text-slate-500'
               onClick={() => {
                 navigator.clipboard.writeText(window.location.href);
                 setCopied(true);
                 setTimeout(() => {
                   setCopied(false);
                 }, 2000);
               }}
             />
           </div>
           {copied && (
             <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
               Link copied!
             </p>
           )}
           <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
             <p className='text-2xl font-semibold capitalize '>
               {listing.name} - ${' '}
               {listing.offer
                 ? <span className="">
                  <span className='line-through opacity-50 '>{listing.regularprice.toLocaleString('en-US')}</span>{"  $"}
                  <span>{listing.discountprice.toLocaleString('en-US')}</span>
                 </span>
                 : listing.regularprice.toLocaleString('en-US')}
               {listing.type === 'rent' && ' / month'}
             </p>
             <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
               <FaMapMarkerAlt className='text-green-700' />
               {listing.address}
             </p>
             <div className='flex gap-4'>
               <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                 {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
               </p>
               {listing.offer && (
                 <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                   ${+listing.regularprice - +listing.discountprice} OFF
                 </p>
               )}
             </div>
             <p className='text-slate-800 w-full'>
               <span className='font-semibold text-black'>Description - </span>
               {listing.description}
             </p>
             <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
               <li className='flex items-center gap-1 whitespace-nowrap '>
                 <FaBed className='text-lg' />
                 {listing.bedrooms > 1
                   ? `${listing.bedrooms} beds `
                   : `${listing.bedrooms} bed `}
               </li>
               <li className='flex items-center gap-1 whitespace-nowrap '>
                 <FaBath className='text-lg' />
                 {listing.bathrooms > 1
                   ? `${listing.bathrooms} baths `
                   : `${listing.bathrooms} bath `}
               </li>
               <li className='flex items-center gap-1 whitespace-nowrap '>
                 <FaParking className='text-lg' />
                 {listing.parking ? 'Parking spot' : 'No Parking'}
               </li>
               <li className='flex items-center gap-1 whitespace-nowrap '>
                 <FaChair className='text-lg' />
                 {listing.furnished ? 'Furnished' : 'Unfurnished'}
               </li>
             </ul>
             {currentUser && listing.userref!==currentUser._id&&!contact && (
             <button onClick={()=>setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase hover:bg-slate-900 p-2'>Contact Landlord</button>
             )}
             {contact && (
             <Contact  listing={listing} />
             )}
           </div>
         </div>
        )}
    </main>
  )
}
