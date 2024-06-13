import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/LandingPage'
import Footer from './components/Footer'
import './index.css'
function RootLayout() {
  return (
    <div className="">
       <Navbar />
       <div className="" style={{minHeight:"40vh"}}>
        <Home></Home>
       <Outlet />
       </div>
       <Footer />
    </div>
  )
}

export default RootLayout