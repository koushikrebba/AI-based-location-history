import React from 'react'
import './index.css'
import RootLayout from './RootLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
function App() {


  const router = createBrowserRouter([
    {
      path:'/',
      element : <RootLayout />,
    }
  ])



  return (
    <div className="">
      <RouterProvider router={router}>

      </RouterProvider>
    </div>

  )
}

export default App