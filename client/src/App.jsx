/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'
import Signin from './pages/Signin'
import PrivateRoute from './components/PrivateRoute'
import CreaateListing from './pages/CreaateListing'
import Updatelisting from './pages/Updatelisting'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/sign-in' element={<Signin />}/>
    <Route path='/sign-up' element={<Signup />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/listing/:listingId' element={<Listing />}/>
    <Route path='/search' element={<Search />}/>
    <Route element={<PrivateRoute/>}>
    <Route path='/profile' element={<Profile />}/>
    <Route path='/create-listing' element={<CreaateListing />}/>
    <Route path='/update-listing/:listingId' element={<Updatelisting />}/>
    </Route>
  </Routes>
  </BrowserRouter>
}

