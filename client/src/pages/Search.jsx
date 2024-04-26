/* eslint-disable no-unused-vars */
import React from 'react'

export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className="flex flex-col gap-3" action="">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Search Term</label>
                    <input type="text" id='searchTerm' placeholder='Search...'  className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex md:flex-col gap-2 sm:flex-wrap'>
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Type:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="all"className='w-5' />
                        <span>Rent and Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="rent"className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="sale"className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="offer"className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex md:flex-col gap-2 sm:flex-wrap'>
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Amenities:</label>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="parking"className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" name="" id="furnished"className='w-5' />
                        <span>Furnished</span>
                    </div>
                    </div>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Sort</label>
                    <select className='border rounded-lg p-3' name="" id="sort_order">
                        <option value="">Price High to Low</option>
                        <option value="">Price Low to High</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white text-center uppercase p-3 rounded-lg hover:bg-slate-800' type="submit">Search</button>
            </form>

        </div>
        <div className="">
            <h1 className='text-3xl font-bold border-b p-3 text-black-900'>Listing Result:</h1>
        </div>
    </div>
  )
}
