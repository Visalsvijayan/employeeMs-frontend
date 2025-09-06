import React from 'react'
import SummeryCard from './SummeryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglass, FaMoneyBillWave, FaTimesCircle, FaUser, FaUsers } from 'react-icons/fa'
import  { useEffect } from 'react'
import { useState } from 'react'
import API from '../../services/api'
const AdminSummery = () => {
  const [summery, setSummery] = useState(null)
  useEffect(() => {

    const fetchSummery = async () => {
      try {
        const summery = await API.get('/dashboard/summery', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setSummery(summery.data)
        console.log(summery)
      } catch (error) {
         alert(error)
      }

    }
    fetchSummery()
  }, [])
  if (!summery) {
    return <div>Loading...</div>
  }
  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold '>Dahbaord Overview</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-6 '>
        <SummeryCard icon={<FaUsers />} text="Total employees" number={summery.totalEmployee} color='bg-teal-600' />
        <SummeryCard icon={<FaBuilding />} text="Total Departments " number={summery.totalDepartments} color='bg-yellow-600' />
        <SummeryCard icon={<FaMoneyBillWave />} text="Monthly Pay" number={summery.totalSalary} color='bg-red-600' />

      </div>
      <div className='mt-12'>
        <h4 className='text-2xl font-bold text-center mb-6 '>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-6'>
          <SummeryCard icon={<FaFileAlt />} text="Leave Applied" number={summery.leaveSummery.applied} color='bg-teal-600' />
          <SummeryCard icon={<FaCheckCircle />} text="Leave Approved " number={summery.leaveSummery.approved} color='bg-green-600' />
          <SummeryCard icon={<FaHourglass />} text="Leave Pending" number={summery.leaveSummery.pending} color='bg-yellow-600' />
          <SummeryCard icon={<FaTimesCircle />} text="Leave Rejected" number={summery.leaveSummery.rejected} color='bg-red-600' />
        </div>

      </div>

    </div>
  )
}

export default AdminSummery
