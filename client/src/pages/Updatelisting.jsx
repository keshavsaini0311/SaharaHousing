/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreaateListing() {
    const params=useParams()
    const navigate=useNavigate()
    const {currentUser}=useSelector(state=>state.user)
    const [files, setFiles] = React.useState([])
    const [formData, setFormData] = React.useState({
        imageurls: [],
        name: '',
        description: '',
        address: '',
        type: '',
        bedrooms: 1,
        bathrooms: 1,
        regularprice: 50,
        discountprice: 0,
        offer: false,
        parking: false,
        furnished: false,
    })

    useEffect(() => {
        const fetchlisting = async () => {
            const listingId = params.listingId
            const res = await fetch(`/api/listing/get/${listingId}`)
            const data = await res.json()
            if (data.success === false) {
                console.log(data.message)
                return
            }
            setFormData(data)
        }
        fetchlisting()
    }, [])
    
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const handleChange = (e) => {
        if (e.target.id === 'name') {
            setFormData({ ...formData, name: e.target.value })
        }
        else if (e.target.id === 'description') {
            setFormData({ ...formData, description: e.target.value })
        }
        else if (e.target.id === 'address') {
            setFormData({ ...formData, address: e.target.value })
        }
        else if (e.target.id === 'bedrooms') {
            setFormData({ ...formData, bedrooms: e.target.value })
        }
        else if (e.target.id === 'bathrooms') {
            setFormData({ ...formData, bathrooms: e.target.value })
        }
        else if (e.target.id === 'regularprice') {
            setFormData({ ...formData, regularprice: e.target.value })
        }
        else if (e.target.id === 'discountprice') {
            setFormData({ ...formData, discountprice: e.target.value })
        }
        else if (e.target.id === 'type') {
            setFormData({ ...formData, type: e.target.value })
        } else if (e.target.id === 'offer') {
            setFormData({ ...formData, offer: e.target.checked })
        } else if (e.target.id === 'parking') {
            setFormData({ ...formData, parking: e.target.checked })
        } else if (e.target.id === 'furnished') {
            setFormData({ ...formData, furnished: e.target.checked })
        } 
    }
    const [uploading, setUploading] = React.useState(false)
    const [imageuploaderror, setImageUploadError] = React.useState(false)
    const handleimagesubmit = (e) => {
        if(files.length > 0 && files.length+formData.imageurls.length<7){
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                setUploading(true)
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData,
                    imageurls: formData.imageurls.concat(urls)
                })
                setImageUploadError(false)
                setUploading(false)
            }).catch((err) => {
                console.log(err);
                setUploading(false)
                setImageUploadError("Image upload failed (2 mb max per image)")
            })
        }else{
            setUploading(false)
            setImageUploadError("Image upload failed ( Max 6 images per listing )")
        }
    }
    console.log(formData);
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    }

    const handledelete=(index)=>{
        setFormData({
            ...formData,
            imageurls: formData.imageurls.filter((_, i) => i !== index),
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(formData.imageurls.length<1){
                setError("Please add atleast one image");
                return;
            }
            if(+formData.regularPrice < +formData.discountPrice){
                setError("Discount price must be lower than regular price");
                return;
            }
            setLoading(true);
            setError(false);
            const res= await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    userref:currentUser._id
                }),
            }
            );
            const data = await res.json();
            console.log(data);
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }
  return (
    <main className='max-w-4xl mx-auto p-3 gap-4'>
        <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className="flex flex-col gap-4 flex-1" >
                <input value={formData.name} onChange={handleChange} type="text" placeholder='Name' id='name' className='border p-3 rounded-lg' maxLength={64} minLength={10} required/>
                <textarea value={formData.description} type="text" onChange={handleChange} placeholder='Description' id='description' className='border p-3 rounded-lg' required/>
                <input value={formData.address} type="text" onChange={handleChange} placeholder='Address' id='address' className='border p-3 rounded-lg' required/>
                <div className="flex gap-6 flex-wrap">
                    <div className=" flex gap-2">
                        <input  onChange={handleChange} checked={formData.type==='sale'} type="checkbox" id='type' className='w-5' value="sale" />
                        <span>Sale</span>
                    </div>
                    <div className=" flex gap-2">
                        <input onChange={handleChange} checked={formData.type==='rent'} type="checkbox" id='type' className='w-5' value='rent'/>
                        <span>Rent</span>
                    </div>
                    <div className=" flex gap-2">
                        <input checked={formData.offer} type="checkbox" onChange={handleChange} id='parking' className='w-5'/>
                        <span>Parking</span>
                    </div>
                    <div className=" flex gap-2">
                        <input checked={formData.furnished} type="checkbox" onChange={handleChange} id='furnished' className='w-5'/>
                        <span>Furnished</span>
                    </div>
                    <div className=" flex gap-2">
                        <input checked={formData.offer} type="checkbox" id='offer' onChange={handleChange} className='w-5'/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                        <input value={formData.bedrooms} type="number" onChange={handleChange} id='bedrooms' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <span>Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input value={formData.bathrooms} type="number" onChange={handleChange} id='bathrooms' min={1} max={10} required className='p-3 border-gray-300 rounded-lg'/>
                        <span>Bathrooms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <input value={formData.regularprice} type="number" id='regularprice' onChange={handleChange}  required className='p-3 border-gray-300 rounded-lg'/>
                        <div className="flex flex-col items-center">
                        <p>Regular Price</p>
                        <span hidden={formData.type!=='rent'} className='text-gray-500 text-xs'>$/Month</span>
                        </div>
                    </div>
                    {formData.offer && (
                        <div className="flex items-center gap-2">
                        <input value={formData.discountprice} onChange={handleChange} type="number" id='discountprice' required className='p-3 border-gray-300 rounded-lg'/>
                        <div className="flex flex-col items-center">
                        <p>Discounted Price</p>
                        <span hidden={formData.type!=='rent'} className='text-gray-500 text-xs'>$/Month</span>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <p className='font-semibold'>Images :
                <span className='font-normal text-gray-500 ml-2'> The first image will be the cover (max 6)</span>
                </p>
                <div className="flex gap-4">
                    <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" name="" id="images" accept='image/*' multiple/>
                    <button disabled={uploading} type='button' onClick={handleimagesubmit} className='p-3 border border-green-700 text-green-700 rounded uppercase hover:shadow-lg disabled:opacity-75'>{uploading ? 'Uploading...' : 'Upload'}</button>
                </div>
            <p className='text-red-500 text-sm'>{imageuploaderror && imageuploaderror}</p>
            {
                formData.imageurls.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {
                        formData.imageurls.map((url, index) => (
                            <div key={url} className='relative' >
                                <img src={url} alt="image" className='w-20 h-20 object-contain rounded-lg'/>
                                <button type='button' onClick={()=>handledelete(index)} className='absolute top-3 right-3 p-3 rounded-full bg-red-500 text-white'>X</button>
                            </div>
                        ))
                    }
                    </div>
                )
            }
            <button className='p-3 m-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-75'>{loading ? 'Loading...' : 'Update Listing'}</button>
            {error && <p className='text-red-500'>{error}</p>}
            </div>
        </form>
    </main>
  )
}
