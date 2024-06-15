import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { CounterContext } from './CounterContext'
import axios from 'axios'
import Navbar from './Navbar'
import Travels from '../assets/travels.jpeg'
import Footer from './Footer'

function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm()
    let [errorMessage, setErrorMessage] = useState('')
    let { user, setUser } = useContext(CounterContext)
    let navigate=useNavigate()
    async function onSigninFormSubmit(formData){
        try {
            let res = await axios.post('http://localhost:4000/login', formData)
            if (res.data.message === 'login success') {
                let token = res.data.token
                localStorage.setItem('token', token)
                setUser(res.data.user)
                let user=res.data.user
                localStorage.setItem('user',user.email)
                navigate('/home')
            }
            else {
                setErrorMessage(res.data.message)
            }
        }catch(error){
            setErrorMessage('An error occured. Please try again')
        }
    }

   

    return (
        <div>
            <Navbar></Navbar>
        <div className='d-flex justify-content-center mb-48' style={{paddingTop:"130px"}}>
        
        <div className="">
        <form onSubmit={handleSubmit(onSigninFormSubmit)} className="max-w-sm mx-auto pt-3 pb-3 ps-3 border rounded-3" style={{height:"390px",width:"600px",background:"", boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
        <div className="w-72 mt-3 ml-3">
        <div style={{marginTop:"85px"}} className="relative mb-8 w-full min-w-[200px] h-10">
            <input
            {...register('email',{required:true})}
              type="text"
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              email
            </label>
            <div className="">
            {errors.email?.type === "required" && (
              <p className="text-red-500">Enter email</p>
            )}
            </div>
          </div>
        <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
            <input
              type="password"
              {...register('password',{required:true})}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              password
            </label>
            <div className="">
            {errors.password?.type === "required" && (
              <p className="text-red-500">Enter password</p>
            )}
            {errorMessage && <p className='text-danger'>{errorMessage}</p>}
            </div>
          </div>
        </div>
        {/* <div className=""></div> */}
        <div className="mt-3 ml-3">
          <button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            // onClick={handleBothEvents}
            type="submit"
          >
            Login
          </button>
        </div>
        </form>
        </div>
        <div className="" style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px"}}>
            <img className=' rounded-3' style={{height:"390px"}} src={Travels} alt="" />
        </div>
        </div>
        <Footer></Footer>
        </div>

    )
}

export default Login