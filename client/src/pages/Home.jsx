/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Listingitem from '../components/Listingitem';

export default function Home() {

  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  console.log(offerListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <main>
        <link href="https://cdn.jsdelivr.net/npm/daisyui@4.10.2/dist/full.min.css" rel="stylesheet" type="text/css" />
        <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-element-bundle.min.js"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        
        <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-700">Find your next <span className='text-slate-500'>home</span><br /> here</h1>
          <div className="text-gray-400 ">
          Discover your dream home with ease at SaharaHousing. Our intuitive search features and comprehensive listings make finding your perfect home a breeze. <br /> Whether you're searching for a cozy apartment, a spacious family house, or a luxurious estate, we've got you covered. Explore neighborhoods, filter by amenities, and connect with experienced agents who are dedicated to helping you find the home that suits your lifestyle and preferences. <br />Welcome home.
          </div>
          <Link to={'/search'} className="text-xs sm:text-sm text-blue-600 font-bold"> Let's Search your new home</Link>
        </div>

        {offerListings && offerListings.length > 0 && (
        <div>
            <div className="text-center ml-2 flex p-3 items-center carousel rounded-box w-full">
                {
                    offerListings.map((listing, index) => (
                      <>
                        <div className=" text-center ml-6 carousel-item w-full h-[400px] mx-auto" key={index} >
                            <img src={listing.imageurls[0]} className="h-200 ml-auto mr-auto object-contain rounded-box" id={`item${index}`} />
                        </div> 
                        <div className="flex justify-center w-full py-2 gap-2">
                        
                        </div>
                      </>
                    ))
                }
            </div>
            
        </div>
        )}


        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h1 className='text-3xl font-semibold text-slate-800'>Recent offers</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-slate-800'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-3xl font-semibold text-slate-800'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <Listingitem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>

    </main>
  )
}
