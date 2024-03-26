/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import SignI from './pages/SignI'
import Signup from './pages/Signup'
import About from './pages/About'
import Profile from './pages/Profile'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path='/' element={<Home />}/>
    <Route path='/sign-in' element={<SignI />}/>
    <Route path='/sign-up' element={<Signup />}/>
    <Route path='/about' element={<About />}/>
    <Route path='/profile' element={<Profile />}/>
  </Routes>
  </BrowserRouter>
}

