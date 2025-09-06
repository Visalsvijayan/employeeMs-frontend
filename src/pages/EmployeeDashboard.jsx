import React from 'react'
import Sidebar from '../components/EmployeeDashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'
import SummeryCard from '../components/EmployeeDashboard/Summery'
import { Outlet } from 'react-router-dom'
// import { Outlet } from 'react-router-dom'
const EmployeeDashboard = () => {
  return (
    <div className='flex' >
      <Sidebar/>
      <div className='flex-1 ml-64 bg-gray-100 h-screen '>
        <Navbar/>
        {/* <SummeryCard/> */}
        <Outlet/>
      </div>
      
      
    </div>
  )
}

export default EmployeeDashboard
