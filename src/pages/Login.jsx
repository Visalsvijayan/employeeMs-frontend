import React from 'react'
import { useState } from 'react'
import API from '../services/api'
import {useAuth} from '../context/AuthContext.jsx'
import {useNavigate} from 'react-router-dom'


const Login = () => {
    const [formData,setFormData]=useState({email:'',password:''})
    const [error,setError]=useState('')
    const {login}=useAuth()
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        setError('')
        try {
            const response=await API.post('/auth/login',formData)
            // console.log('response:',response)
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem('token',response.data.token)
                if(response.data.user.role ==='admin'){
                    navigate('/admin-dashboard')
                }else{
                    navigate('/employee-dashboard')
                }
            }
        } catch (error) {
            if(error.response && error.response.data && error.response.data.message){
                setError(error.response.data.message)
            }else{
                setError('Login failed .Please try again')
            }    
        }
    }
  return (
    <div className='min-h-screen flex flex-col items-center justify-center
        bg-[linear-gradient(to_bottom,_#5A827E_50%,_#f3f4f6_50%)] space-y-6' >
        <h1 className='mb-6 text-2xl font-abril text-gray-600'>Employee Management System</h1>
        <div className='bg-white w-full max-w-md p-8 rounded-xl '>
            <h1 className='text-xl font-bold mb-6'>Login</h1>
             
             {error && (
                    <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2">
                        {error}
                    </div>
             )}

            <form onSubmit={handleSubmit} className='space-y-4 '>
                <div>
                    <label htmlFor="email" className='block text-gray-600 font-medium'>Email</label>
                    <input type="text" id='email'
                     placeholder='Enter username'
                     className=' w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-teal-500' 
                     onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className='block  text-gray-600 font-medium'>Password</label>
                    <input type="text" id='password' placeholder='*******'
                    className='w-full mt-1 border border-gray-300 px-3 py-2 rounded focus:ring-2 focus:ring-teal-500'
                    onChange={handleChange}
                    />
                </div>
                <div className='flex items-center justify-between text-sm text-gray-600'>
                    <label className='flex items-center' >
                        <input type="checkbox" className='mr-2' />
                        Remember me
                    </label>
                    <a href="">Forgot password</a>    
                    
                </div>   
                <button type='submit' className='w-full bg-[#ce6132d1] p-2 rounded hover:bg-[#32251fd1] transition duration-200'>
                    Login
                </button> 
            </form>
           
        </div>
     </div>
  )
}

export default Login
