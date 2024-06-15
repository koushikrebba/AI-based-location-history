import React from 'react'
import './index.css'
import RootLayout from './RootLayout'
import Voice from './components/Voice'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import SignUp from './components/Signup'
import PastSearches from './components/PastSearches'
import Login from './components/Login'
import LandPage from './components/LandingPage'
import Home from './components/Home'
import SearchLocation from './components/SearchLocation'
import Display from './components/Display'
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
        },
        {
          path:'/search',
          element:<SearchLocation/>
        },{
          path:'/voice',
          element: <Voice />
        },{
          path:'/past-searches',
          element: <PastSearches />
        },
        {
          path:'/videos',
          element: <Display />
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