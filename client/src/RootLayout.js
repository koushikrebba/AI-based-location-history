import React from 'react'
import {Outlet} from 'react-router-dom'
import './index.css'
function RootLayout() {
  return (
    <div className="">
       <div className="" style={{minHeight:"90vh"}}>
       <Outlet />
       </div>
       {/* <Footer /> */}
    </div>
  )
}

export default RootLayout