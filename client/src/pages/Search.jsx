/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Listingitem from '../components/Listingitem';

export default function Search() {
    const navigate = useNavigate();
    const[loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const [sidebarData, setSidebarData] = useState({
        type: 'all',
        searchTerm: '',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    })
    const[showmore , setShowMore] = useState(false);
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');
        if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl || false,
                furnished: furnishedFromUrl || false,
                offer: offerFromUrl || false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }
    
    const fetchListings = async () => {
        setLoading(true);
        const searchQuery = urlParams.toString();
        
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        
        if(data.length > 8){
            setShowMore(true);
        }
        setListings(data);
        setLoading(false);
    }

    fetchListings();
}, [location.search])
    
    const handleChange = (e) => {
        if (e.target.id === 'all' ||e.target.id === 'rent' ||e.target.id === 'sale'){
            setSidebarData({...sidebarData, type: e.target.id})
        } 
        else if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})   
        }
        else if(e.target.id === 'parking'){
            setSidebarData({...sidebarData, parking: e.target.checked|| e.target.checked === 'true' ? true : false})   
        }
        else if(e.target.id === 'furnished'){
            setSidebarData({...sidebarData, furnished: e.target.checked|| e.target.checked === 'true' ? true : false})   
        }
        else if(e.target.id === 'offer'){
            setSidebarData({...sidebarData, offer: e.target.checked|| e.target.checked === 'true' ? true : false})   
        }
        else if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSidebarData({...sidebarData, sort, order})   
        }
    }

    const hadlesubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('type', sidebarData.type);
        urlParams.set('parking', sidebarData.parking);
        urlParams.set('furnished', sidebarData.furnished);
        urlParams.set('offer', sidebarData.offer);
        urlParams.set('sort', sidebarData.sort);
        urlParams.set('order', sidebarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
        
    }

    const handleShowMore = async() => {
        const number = listings.length;
        const urlParams = new URLSearchParams(location.search);
        const start = number;
        urlParams.set('startIndex', start);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        setListings([...listings, ...data]);
        if(data.length < 8){
            setShowMore(false);
        }
    }

  return (
    <div className="flex flex-col md:flex-row">
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={hadlesubmit} className="flex flex-col gap-3" action="">
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Search Term</label>
                    <input onChange={handleChange} value={sidebarData.searchTerm} type="text" id='searchTerm' placeholder='Search...'  className='border rounded-lg p-3 w-full'/>
                </div>
                <div className='flex md:flex-col gap-2 sm:flex-wrap'>
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Type:</label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.type === 'all'}  type="checkbox" name="" id="all"className='w-5' />
                        <span>Rent and Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.type === 'rent'} type="checkbox" name="" id="rent"className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.type === 'sale'} type="checkbox" name="" id="sale"className='w-5' />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.offer===true||sidebarData.offer === 'true'} type="checkbox" name="" id="offer"className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex md:flex-col gap-2 sm:flex-wrap'>
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Amenities:</label>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.parking===true||sidebarData.parking === 'true'} type="checkbox" name="" id="parking"className='w-5' />
                        <span>Parking</span>
                    </div>
                    <div className="flex gap-2">
                        <input onChange={handleChange} checked={sidebarData.furnished===true||sidebarData.furnished === 'true'} type="checkbox" name="" id="furnished"className='w-5' />
                        <span>Furnished</span>
                    </div>
                    </div>
                <div className="flex items-center gap-2">
                    <label className="whitespace-nowrap font-semibold" htmlFor="">Sort</label>
                    <select onChange={handleChange} defaultValue={'created_at_desc'} className='border rounded-lg p-3' name="" id="sort_order">
                        <option value="regularprice_desc">Price High to Low</option>
                        <option value="regularprice_asc">Price Low to High</option>
                        <option value="created_at_desc">Latest</option>
                        
                    </select>
                </div>
                <button className='bg-slate-700 text-white text-center uppercase p-3 rounded-lg hover:bg-slate-800' type="submit">Search</button>
            </form>

        </div>
        <div className="flex-1">
            <h1 className='text-3xl font-bold border-b p-3 text-black-900'>Listing Result:</h1>
            <div className="p-7 flex flex-wrap gap-3">
                {!loading && listings.length ===0 && (
                    <p className='text-2xl font-bold border-b p-3 text-slate-600'>No listings found !</p>
                ) }
                {loading && <p className='text-center w-ful text-2xl font-bold border-b p-3 text-slate-600'>Loading...</p>}
                {
                    !loading && listings && listings.map((listing)=>(
                            <Listingitem key={listing._id} listing={listing}/>
                    ))
                }
                
            </div>
                {showmore && (
                    <button onClick={handleShowMore} className='ml-6 bg-green-700 text-white text-center uppercase p-3 rounded-lg hover:underline'>Show More</button>
                )}
        </div>
    </div>
  )
}
