import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import API from '../../services/api'
import Swal from 'sweetalert2'
import { Eye, EyeOff } from 'lucide-react'
const Settings = () => {
    const [form,setForm]=useState({})
    const [error,setError]=useState('')
    const [showPassword, setShowPassword] = useState({
                                            old: false,
                                            new: false,
                                            confirm: false
                                            })
    const {user}=useAuth()
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setForm((prev)=>({...prev,[name]:value}))
    }
    const handleSubmit=async(e)=>{
        try {
            e.preventDefault();
            if(form.newPassword!==form.confirmPassword){
                setError('Password error')
                return
            }
            if(!form.newPassword||!form.oldPassword||!form.confirmPassword) {
                setError('All feild required')
                return
            }    
            
            const response=await API.post(`/settings/changePassword/${user._id}`,form,{
                headers:{
                    authorization:`Bearer ${localStorage.getItem('token')}`
                }
            })
            if(response.data.success) {
                Swal.fire({
                    icon:'success',
                    text:'Password updated successfully'
                }).then(() => {
                        setForm({
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword:''
                        });
                        setError('')
                });

                  
               
            }
            
      
        } catch (error) {
            setError(error.response.data.message)
        }
    }
    if (!user._id) {
      return <div>Loading...</div>;
  }
  return (
    <div className='flex justify-center items-center w-full bg-gray-300 min-h-[calc(100vh-56px)] '>
        <div className=' w-full max-w-sm bg-white p-8 rounded-xl'>
            {error&&<span className='text-red-600 bg-red-100 p-1 border border-red-700'>{error}</span>}
            <form   onSubmit={handleSubmit} className=' space-y-4 justify-center'>
                <div className='relative'>
                    <label className='block text-gray-800 mb-1 ' > Old password</label>
                   

                    <input
                        onChange={handleChange}
                        value={form.oldPassword}
                        name="oldPassword"
                        type={showPassword.old ? 'text' : 'password'}
                        className="border border-gray-300 py-1 px-2 w-full pr-10"
                        placeholder="Old Password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => ({ ...prev, old: !prev.old }))}
                        className="absolute right-2 top-9 text-gray-500"
                    >
                        {showPassword.old ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
                <div className='relative'> 
                    <label className='block  text-gray-800 mb-1' > New password</label>
                    <input onChange={handleChange} value={form.newPassword} name='newPassword' 
                        type={showPassword.new?'text':'password'}
                        className='border border-gray-300 py-1 px-2 w-full'   placeholder='New Password' />
                    <button type='button' className='absolute right-2 top-9  text-gray-500'
                        onClick={()=>setShowPassword((prev)=>({...prev,new:!prev.new}))}
                    >
                        {showPassword.new ? <Eye size={18}/>:<EyeOff size={18}/>}
                    </button>
                </div>
                 <div className='relative'>
                    <label className='block  text-gray-800 mb-1' > Confirm  password</label>
                    <input onChange={handleChange} value={form.confirmPassword} name='confirmPassword' 
                        type={showPassword.confirm ? 'text':'password'}className='border border-gray-300  py-1 px-2 w-full '   placeholder='Confirm Password' />
                    <button className='absolute right-2 top-9  text-gray-500'
                        type='button'
                        onClick={()=>setShowPassword((prev)=>({...prev,confirm:!prev.confirm}))}
                    >
                        {showPassword.confirm ? <Eye size={18}/>:<EyeOff size={18}/> }
                    </button>    
                </div>
                <button type='submit' className='bg-teal-700 text-white py-2 px-5 w-full  rounded hover:bg-teal-900'>Change Password</button>
            </form>

        </div>
      
    </div>
  )
}

export default Settings
