import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import RootLayout from './RootLayout'

function Routing() {
    let router=createBrowserRouter([
        {
            path:'/',
            element:<RootLayout/>,
        } 
    ])
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  )
}

export default Routing