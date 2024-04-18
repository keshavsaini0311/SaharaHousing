/* eslint-disable no-unused-vars */
import React from 'react'

export default function CreaateListing() {
  return (
    <main className='max-w-4xl mx-auto p-3 gap-4'>
        <h1 className='text-3xl font-semibold text-center my-7'>Creaate a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1" >
                <input type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength={64} minLength={10} required/>
                <textarea type="text" placeholder='Description' id='description' className='border p-3 rounded-lg' required/>
                <input type="text" placeholder='Address' id='Address' className='border p-3 rounded-lg' required/>
                <div className="flex gap-6 flex-wrap">
                    <div className=" flex gap-2">
                        <input type="checkbox" id='sale' className='w-5'/>
                        <span>Sale</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" id='rent' className='w-5'/>
                        <span>Rent</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" id='parking' className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    <div className=" flex gap-2">
                        <input type="checkbox" id='offer' className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input type="number" id='bedrooms' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <span>Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='bathrooms' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <span>Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='regularprice' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span className='text-gray-500 text-xs'>$/Month</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="number" id='discountedprice' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <div className="flex flex-col items-center">
                        <p>Discounted Price</p>
                        <span className='text-gray-500 text-xs'>$/Month</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className='font-semibold'>Images :
                <span className='font-normal text-gray-500 ml-2'> The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input className='p-3 border border-gray-300 rounded w-full' type="file" name="" id="images" accept='image/*' multiple/>
                    <button className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-75'>Upload</button>
                </div>
            <button className='p-3 m-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>Create Listing</button>
            </div>
        </form>
    </main>
  )
}
