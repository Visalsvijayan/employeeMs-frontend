import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import API from '../../services/api';
const View = () => {
  const {id}=useParams()
  const [employee,setEmployee]=useState('')
  const [error,setError]=useState('')
  const [loading,setLoading]=useState(true)
   
   useEffect(() => {
     const fetchEmployee=async()=>{
        try {
          const res=await API.get(`/employee/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          } )
          if(res.data.success){
            setEmployee(res.data.data)
          }else{
            setError('employee not found')
          }
         
        } catch (error) {
            setError('Failed to fetch employee')
        }finally{
          setLoading(false)
        }
     }
     fetchEmployee()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-6">{error}</p>;
  }

  return (
  <div className="flex items-center justify-center    bg-gray-100  " style={{ minHeight: 'calc(100vh - 3.5rem)' }}>
    <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-2xl space-y-6">
      <h2 className="text-2xl font-semibold text-center">Employee Details</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-300">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${employee.image}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1 space-y-3 text-left">
          <p className="text-md">
            <strong>Name:</strong> {employee.name}
          </p>
          <p className="text-md">
            <strong>Employee ID:</strong> {employee.employeeId}
          </p>
          <p className="text-md">
            <strong>Date of Birth:</strong> {employee.dob ?  new Date(employee.dob).toLocaleDateString() : ''}
          </p>
          <p className="text-md">
            <strong>Gender:</strong> {employee.gender}
          </p>
          <p className="text-md">
            <strong>Department:</strong> {employee.department}
          </p>
          <p className="text-md">
            <strong>Marital Status:</strong> {employee.maritalStatus}
          </p>
        </div>
      </div>
    </div>
  </div>
);

  
}

export default View
