import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

function SignUp() {

    let { register, handleSubmit, formState: { errors } } = useForm()
    // let navigate = useNavigate()
    function onSignupFormSubmit(newUser){
        console.log(newUser)
    }
    return (
        <div style={{ paddingTop: '70px' }}>
            <div className='bg-dark w-25 mx-auto p-3 rounded-2'>
                <h1 className='text-center text-primary mb-4'>SignUp</h1>
                <form onSubmit={handleSubmit(onSignupFormSubmit)}>
                    <input type="text" {...register("firstname", { required: true })} id='firstname' className='form-control mb-4 shadow-sm' placeholder='First Name' />
                    {errors.firstname?.type === 'required' && <p style={{ marginTop: '-20px' }} className='text-danger text-center'>First Name is required</p>}
                    <input type="text" {...register("lastname", { required: true })} id='lastname' className='form-control mb-4 shadow-sm' placeholder='Last Name' />
                    {errors.lastname?.type === 'required' && <p style={{ marginTop: '-20px' }} className='text-danger text-center'>Last Name is required</p>}
                    <input type="text" {...register("email", { required: true })} id='email' className='form-control mb-4 shadow-sm' placeholder='Email' />
                    {errors.email?.type === 'required' && <p style={{ marginTop: '-20px' }} className='text-danger text-center'>Email is required</p>}
                    <input type="password" {...register("password", { required: true, minLength: 6 })} id='password' className='form-control mb-4 shadow-sm' placeholder='Password' />
                    {errors.password?.type === 'required' && <p style={{ marginTop: '-20px' }} className='text-danger text-center'>Password is required</p>}
                    {errors.password?.type === 'minLength' && <p style={{ marginTop: '-20px' }} className='text-danger text-center'>Password minimium Length is 6</p>}
                    <div className='text-center'>
                        <button type='submit' className='btn btn-success'>Signup</button>
                    </div>
                </form>
                <p className='text-white text-center mt-3'>Already SignedUp ! <Link to='/login'>LogIn</Link> </p>
            </div>
        </div>

    )
}

export default SignUp