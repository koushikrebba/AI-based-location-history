import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './index.css'
function RootLayout() {
  return (
    <div className="">
       {/* <Navbar /> */}
       <div className="" style={{minHeight:"90vh"}}>
       <Outlet />
       </div>
       <Footer />
    </div>
  )
}

export default RootLayout