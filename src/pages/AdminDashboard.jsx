import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/dashboard/AdminSidebar'
import Navbar from '../components/dashboard/Navbar'
import AdminSummery from '../components/dashboard/AdminSummery'
import { Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  const {user,loading}=useAuth()
  const navigate=useNavigate()
  useEffect(()=>{
      if(loading){
        return <div>Loading...</div>
      }
      if(!user){
        navigate('/login')
      }
  },[user,navigate])
  
  return (
    <div className='flex' >
      <AdminSidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen '>
        <Navbar/>
        {/* <AdminSummery/> */}
        <Outlet/>
      </div>
      
      
    </div>
  )
}

export default AdminDashboard
