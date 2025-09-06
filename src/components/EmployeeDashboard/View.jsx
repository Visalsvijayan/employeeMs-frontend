import React, { useContext, useEffect, useState } from 'react'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'



const View = () => {

  
  const { user, loading } = useAuth()
  const [employee,setEmployee]=useState(null)
  const [empLoading, setEmpLoading] = useState(true)
  const [fetchUser,setFetchUser]=useState(null)
  useEffect(()=>{
    if(!user?._id){
    return
  }
    const employeeData=async()=>{
       try {
        const response=await API.get(`/employee/view?userId=${user._id}`,{
          headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(response.data.success){
          setEmployee(response.data.data)
          setFetchUser(response.data.data)
          
        }
       } catch (error) {
         alert(error.response.data)
       }  finally {
        setEmpLoading(false)
      }
    }
     
     //  only call when AuthContext is done loading AND user is ready
      
      employeeData()
      
  },[user])
  


    if (loading) return <p>Verifying user...</p>
  if (!user) return <p>User not found</p>
  if (empLoading) return <p>Loading employee data...</p>

  
 

  return (
  
 <div className="flex justify-center items-center  min-h-[calc(100vh-56px)] bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row items-center w-full max-w-3xl">
        
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${user.profileImage}`}
            alt="Employee"
            className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Employee Details */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-xl font-bold mb-4">Employee Details</h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Employee ID:</span> {employee.employeeId}
            </p>
            <p>
              <span className="font-semibold">Date of Birth:</span> {employee.dob}
            </p>
            <p>
              <span className="font-semibold">Gender:</span> {employee.gender}
            </p>
            <p>
              <span className="font-semibold">Department:</span> {employee.department}
            </p>
            <p>
              <span className="font-semibold">Marital Status:</span> {employee.maritalStatus}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default View




 