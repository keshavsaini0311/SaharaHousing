/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaMapMarkerAlt,
    FaParking,
    FaShare,
  } from 'react-icons/fa';
export default function Listingitem(listing) {
    
  return (
    <div  className="flex flex-col gap-4 bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing.listing._id}`}>
        <img src={listing.listing.imageurls[0]} alt="" className= "z-5 h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300" />
        <div className="p-3 flex flex-col gap-2">
            <p className='text-lg font-semibold text-slate-700 truncate'>{listing.listing.name}</p>
            <div className="flex items-center gap-1">
                <MdLocationOn className="h-4 w-4 text-green-700" />
                <p className="text-sm text-gray-600 truncate w-full">{listing.listing.address}</p>
            </div>
            <p className="text-sm font-semibold text-gray-700 line-clamp-2">{listing.listing.description}</p>
            {listing.listing.offer ? (
                <span>
                    <span className="text-lg font-semibold">${listing.listing.discountprice.toLocaleString('en-US')}</span>{listing.listing.type==='rent' &&"/Month" } {' '}
                    <span className="text-sm text-gray-600 line-through">${listing.listing.regularprice.toLocaleString('en-US')}{listing.listing.type==='rent' &&"/Month" }</span>
                    
                </span>
            ) : (
                <span>
                    <span className="text-2xl font-semibold">${listing.listing.regularprice.toLocaleString('en-US')}</span>{listing.listing.type==='rent' &&"/Month" }
                </span>
            )}
            <div className="text-slate-700 flex items-center gap-3">
                <div className="flex items-center gap-1 text-sm">
                    {listing.listing.bedrooms>1 ? `${listing.listing.bedrooms} ` : `${listing.listing.bedrooms} ` } 
                    <FaBed className='text-lg  ' /> 
                </div>
                <div className="flex items-center gap-1 text-sm">
                    {listing.listing.bathrooms>1 ? `${listing.listing.bathrooms} ` : `${listing.listing.bathrooms} ` } 
                    <FaBath className='text-lg' /> 
                </div>
                
            </div>
        </div>
      </Link>
    </div>
  )
}
