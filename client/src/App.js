import React from 'react'
import './index.css'
import RootLayout from './RootLayout'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './components/Signup'
import Login from './components/Login'
import LandPage from './components/LandingPage'
import Home from './components/Home'
function App() {


  const router = createBrowserRouter([
    {
      path:'',
      element : <RootLayout />,
      children:[
        {
          path:'',
          element:<LandPage/>
        },
        {
          path:'/home',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<SignUp/>
        }
      ]
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