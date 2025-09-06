import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../services/api'
 import Swal from 'sweetalert2'
const EditDepartment = () => {
    const {id}=useParams()
    const [department,setDepartment]=useState({dep_name:'',description:''})
    const [error,setError]=useState('')
    const [loading,setLoading]=useState(false)
    const navigate=useNavigate()
    useEffect(() => {
  const fetchData = async () => {
      try {
        const res = await API.get(`/department/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if(res.data.success){
          setDepartment({dep_name:res.data.data.dep_name,description:res.data.data.description})
        }
        
      } catch (error) {
         setError( 
          error.response?.data.message ||
        'Something went wrong .Please try again'
         )
      }
    }

    fetchData()
  }, [id])
  
  const handleChange=(e)=>{
     return setDepartment({...department,[e.target.id]:e.target.value})
  }
  
  const handleSubmit=async(e)=>{
     e.preventDefault()
    setError('')
    setLoading(true)
    if(!department.dep_name.trim() || !department.description.trim()){
      setError('Please fill All Feilds')
      setLoading(false)
      return
    }
    try {
      const token=localStorage.getItem('token')
      const res=await API.put(`/department/${id}`,department,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      setDepartment({dep_name:'',description:''})
      setError('')
      
      Swal.fire({
        icon: 'success',
        title: 'Department Updated successfully!',
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        navigate('/admin-dashboard/departments')
      })

      
    } catch (error) {
       setError(
        error.response?.data.message ||
        'Something went wrong .Please try again'
       )
    }
    finally{
      setLoading(false)
    }
  }

  return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='bg-white mx-auto p-8 w-full max-w-xl rounded shadow-md'>
        <h3 className='text-center text-2xl font-bold mb-6'>Edit Department</h3>
        
         {error && <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2">{error}</div>}
       
        <form onSubmit={handleSubmit}  >
          <div className='flex flex-col gap-1'>
            <label htmlFor="name">Department Name</label>
            <input
              type="text"
              id="dep_name"
              name='dep_name'
              placeholder='Enter Department'
              value={department.dep_name}
              className='p-2 border border-gray-300 rounded'
              onChange={handleChange}
            />
          </div>
          <div className='flex flex-col mt-5 gap-2'>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={department.description}
              placeholder='Description'
              className='p-5 border border-gray-300 rounded'
              onChange={handleChange}
              
            ></textarea>
          </div>
          <button
            type="submit"
            className='bg-teal-600 rounded w-full mt-4 p-3 text-white hover:bg-teal-700 transition'
          >
            Edit Department
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditDepartment
