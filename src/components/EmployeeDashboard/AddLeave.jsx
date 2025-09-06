import React, { useState } from 'react'
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2"
const AddLeave = () => {
  const {user}=useAuth()
  const [leave,setLeave]=useState({userId:user._id})
  const [error,setError]=useState({})
  const navigate=useNavigate()
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setLeave((prev)=>({...prev,[name]:value}))

  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    const errors=validate(leave)
    if(Object.keys(errors).length>0){
       setError(errors)
       return
    }
    try {
      const response=await API.post('/leave/add',leave,{
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(response.data.success){
         Swal.fire({
            title: "Leave Submitted!",
            text: "Your leave request has been sent successfully.",
            icon: "success",
            confirmButtonText: "OK",
          })
          .then(()=>navigate('/employee-dashboard/leave'))

        
      }
    } catch (error) {
       alert('failed to add Leave')
    }
  }

  const validate=(data)=>{
    const errors={}
    if (!data.leaveType) {
      errors.leaveType = "Please select a leave type"
    }

    if (!data.startDate) {
    errors.startDate = "Start date is required"
    }

  
    if (!data.endDate) {
    errors.endDate = "End date is required"
    }
    if(!data.reason){
      errors.reason='reason is required'
    }

  
    if (data.startDate && data.endDate) {
      const start = new Date(data.startDate)
      const end = new Date(data.endDate)
      if (end < start) {
        errors.endDate = "End date cannot be before start date"
      }
      if (start < new Date()) {
        errors.startDate = "Cannot select past dates"
      }
     
  }
   return errors

}
  
  return (
     

    <div className="flex justify-center items-center min-h-[calc(100vh-56px)] bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl">
        
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
           
          <h2 className="text-2xl font-bold text-gray-800">Request for Leave</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Leave Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Leave Type</label>
            
            <select name='leaveType' onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500">
              <option value=''>Select Leave Type</option>
              <option value='sick leave'>Sick Leave</option>
              <option value='casual leave' >Casual Leave</option>
              <option value='annual leave'>Annual Leave</option>
            </select>
            {error.leaveType&& <span className="text-red-500 text-sm">{error.leaveType}</span>}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">From Date</label>
              <input
                type="date"
                name='startDate'
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
              />
              {error.startDate && <span className="text-red-500 text-sm">{error.startDate}</span>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">To Date</label>
              <input
                type="date"
                name='endDate'
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
              />
              {error.endDate&& <span className="text-red-500 text-sm">{error.endDate}</span>}

            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name='reason'
              onChange={handleChange}
              placeholder="Reason"
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500"
            ></textarea>
            {error.reason&& <span className="text-red-500 text-sm">{error.reason}</span>}

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Submit Leave Request
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddLeave
