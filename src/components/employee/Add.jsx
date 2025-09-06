import React, { useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { fetchDepartment } from '../../utils/employeeHelper'
import API from '../../services/api'
const Add = () => {
  const [department,setDepartment]=useState([])
  const [formData,setFormData]=useState({})
  const [error,setError]=useState('')
  const [inputError,setInputError]=useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    const getDepartments=async()=>{
      let data=await fetchDepartment()
       
      setDepartment(data)
    }
    getDepartments()
  },[])
  const handleChange=(e)=>{
      const { name, value, files } = e.target;
      setError('')
    if(name==='image'){
        setFormData((prev)=>({...prev,[name]:files[0]}))
     }
     else{
        setFormData((prev)=>({...prev,[name]:value}))

     }
  }


  const handleSubmit=async(e)=>{
    e.preventDefault()
    const errors=validate(formData)
     
    const formDataObj=new FormData()
    for(const key in formData){
      formDataObj.append(key,formData[key])
    }
    if (Object.keys(errors).length > 0) {
      setInputError(errors)
      return
    }
    setError({})
    try {
      const token=localStorage.getItem('token')
      const res=await API.post('/employee/add',formDataObj,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
       
      if(res.data.success){
        navigate('/admin-dashboard/employee')
      }

      
    } catch (error) {
       setError(
        error.response?.data.message ||
        'Something went wrong .Please try again'
       )
    }
    // finally{
    //   setLoading(false)
    // }
  }


  const validate = (data) => {
    const errors = {}

    if (!data.name || data.name.trim().length < 2) errors.name = "Name is required (min 2 chars)"
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = "Valid email is required"
    if (!data.employeeId) errors.employeeId = "Employee ID is required"
    if (!data.dob){
       errors.dob = "Date of Birth is required"
    }else {
      const dobDate = new Date(data.dob);
      const today = new Date();

      const minAllowedDob = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );

      if (dobDate > minAllowedDob) {
        errors.dob = "You must be at least 18 years old";
      }
    }
    if (!data.gender) errors.gender = "Gender is required"
    if (!data.maritalStatus) errors.maritalStatus = "Marital status is required"
    if (!data.designation) errors.designation = "Designation is required"
    if (!data.department) errors.department = "Department is required"
    if (!data.salary || isNaN(data.salary) || Number(data.salary) <= 0) errors.salary = "Valid salary is required"
    if (!data.password || data.password.length < 6) errors.password = "Password must be at least 6 characters"
    if (!data.role) errors.role = "Role is required"
    if (!data.image) errors.image = "Image is required"

   return errors
  }


  return (
    <div >
       
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded mt-4 ">
                    <h3 className='text-2xl font-semibold mb-4'>Add New Employee</h3>
        {error && <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2"><p>{error}</p></div>}
        <form onSubmit={handleSubmit} >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input type="text" placeholder="Insert Name"
                 name='name' className="w-full border p-2 rounded"
                 onChange={handleChange} />
                 {inputError.name && <span className="text-red-500 text-sm">{inputError.name}</span>}
              </div>
              
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input type="email" placeholder="Insert Email"
                 name='email' className="w-full border p-2 rounded"
                 onChange={handleChange} />
                  {inputError.email && <span className="text-red-500 text-sm">{inputError.email}</span>}
              </div>
              

              {/* Emplyee Id */}
              <div>
                <label className="block mb-1 font-medium">Employee ID</label>
                <input type="text" placeholder="Employee ID" 
                name='employeeId' className="w-full border p-2 rounded" 
                onChange={handleChange}/>
                 {inputError.employeeId && <span className="text-red-500 text-sm">{inputError.employeeId}</span>}
              </div>
              {/* Date of birth */}

              <div>
                <label className="block mb-1 font-medium">Date of Birth</label>
                <input type="date" 
                name='dob' className="w-full border p-2 rounded"
                onChange={handleChange} />
                 {inputError.dob && <span className="text-red-500 text-sm">{inputError.dob}</span>}
              </div>

              {/* Gender */}
              <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select name='gender' onChange={handleChange} className="w-full border p-2 rounded">
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='other'>Other</option>
              </select>
               {inputError.gender && <span className="text-red-500 text-sm">{inputError.gender}</span>}
              </div>
              {/* martial Status */}
              <div>
              <label className="block mb-1 font-medium">Marital Status</label>
              <select name='maritalStatus' onChange={handleChange} className="w-full border p-2 rounded">
                  <option value=''>Select Status</option>
                  <option value='single'>Single</option>
                  <option value='married'>Married</option>
              </select>
               {inputError.maritalStatus && <span className="text-red-500 text-sm">{inputError.maritalStatus}</span>}
              </div>

              {/* Designation */}
              <div>
              <label className="block mb-1 font-medium">Designation</label>
              <input type="text" 
              name='designation' placeholder="Designation" className="w-full border p-2 rounded" 
              onChange={handleChange}/>
               {inputError.designation && <span className="text-red-500 text-sm">{inputError.designation}</span>}
              </div>
              {/* department */}
              <div>
              <label className="block mb-1 font-medium">Department</label>
              <select  name='department' onChange={handleChange} className="w-full border p-2 rounded">
                  <option value=''>Select Department</option>
                 {
                  department.map((dep)=>(
                    <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                  ))
                 } 
              </select>
               {inputError.department && <span className="text-red-500 text-sm">{inputError.department}</span>}
              </div>
                 {/* salary */}
              <div>
              <label className="block mb-1 font-medium">Salary</label>
              <input type="number"  
              name='salary' placeholder="Salary" className="w-full border p-2 rounded" 
              onChange={handleChange}/>
               {inputError.salary && <span className="text-red-500 text-sm">{inputError.salary}</span>}
              </div>
              {/* password */}
              <div>
              <label className="block mb-1 font-medium">Password</label>
              <input type="password" name='password' placeholder="******"
               className="w-full border p-2 rounded"
               onChange={handleChange} />
                {inputError.password && <span className="text-red-500 text-sm">{inputError.password}</span>}
              </div>

              {/* role */}
              <div>
              <label className="block mb-1 font-medium">Role</label>
              <select name='role' onChange={handleChange} className="w-full border p-2 rounded">
                  <option value=''>Select Role</option>
                  <option value='admin'>Admin</option>
                  <option value='employee'>Employee</option>
              </select>
               {inputError.role && <span className="text-red-500 text-sm">{inputError.role}</span>}
              </div>
              {/* image */}
              <div>
              <label className="block mb-1 font-medium">Upload Image</label>
              <input type="file" 
              name='image' className="w-full border p-2 rounded" 
              onChange={handleChange}/>
               {inputError.image && <span className="text-red-500 text-sm">{inputError.image}</span>}
              </div>
          </div>

    
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
              Add Employee
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default Add
