import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { CounterContext } from '../CounterContext'
import axios from 'axios'

function Login() {
    let { register, handleSubmit, formState: { errors } } = useForm()
    let [errorMessage, setErrorMessage] = useState('')
    // let { user, setUser } = useContext(CounterContext)
    // let navigate=useNavigate()
    function onSigninFormSubmit(){
        
    }

    return (
        <div style={{ paddingTop: '70px' }}>
            <div className='bg-dark w-25 mx-auto p-3 rounded-2'>
                <h1 className='text-center text-primary mb-4'>LogIn</h1>
                <form onSubmit={handleSubmit(onSigninFormSubmit)}>
                    <input type="text" {...register('email',{required:true})} id='email' className='form-control mb-4 shadow-sm' placeholder='Email' />
                    {errors.email?.type === 'required' && <p style={{marginTop:'-20px'}} className='text-danger text-center'>Email is required</p>}
                    <input type="password" {...register('password',{required:true})} id='password' className='form-control mb-4 shadow-sm' placeholder='Password' />
                    {errors.password?.type === 'required' && <p style={{marginTop:'-20px'}} className='text-danger text-center'>Password is required</p>}
                    {errorMessage && <p className='text-danger text-center mt-2'>{errorMessage}</p>}
                    <div className='text-center'>
                        <button className='btn btn-success'>Login</button>
                    </div>
                </form>
                <p className='text-white text-center mt-3'>New User ! <Link to='/signup'>SignUp</Link> </p>
            </div>
        </div>

    )
}

export default Login