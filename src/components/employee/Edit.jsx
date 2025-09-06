import React from 'react'
import API from '../../services/api'
import { useState,useEffect } from 'react'
import { useNavigate,useParams} from 'react-router-dom'

import { fetchDepartment } from '../../utils/employeeHelper'

 
const Edit = () => {
  const [department,setDepartment]=useState([])
  const [employee, setEmployee] = useState({
  name: '',
  dob: '',
  maritalStatus: '',
  designation: '',
  departmentId: '',
  salary: ''
});

  const [error,setError]=useState('')
  const [inputError,setInputError]=useState({})
  const navigate=useNavigate()
  const {id}=useParams()
  useEffect(()=>{
      const getDepartments=async()=>{
        let data=await fetchDepartment()
        
        setDepartment(data)
      }
      getDepartments()
    },[])
  useEffect(()=>{
    const getEmployee=async()=>{
       
        try {
          const res=await API.get(`/employee/${id}`,{
            headers:{
              Authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          if(res.data.success){
              setEmployee(res.data.data)
          }
        } catch (error) {
          console.error('Error fetching employee:', error.message);
          setError(error.response.data.message)
        }
      
       
     
    }
    getEmployee()
  },[])



  const handleChange=(e)=>{
      const { name, value, files } = e.target;
      setError('')
     
      setEmployee((prev)=>({...prev,[name]:value}))

   
  }

  const validate = (data) => {
    const errors = {}

    if (!data.name || data.name.trim().length < 2) errors.name = "Name is required (min 2 chars)"
   
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
     
    if (!data.maritalStatus) errors.maritalStatus = "Marital status is required"
    if (!data.designation) errors.designation = "Designation is required"
    if (!data.department) errors.department = "Department is required"
    if (!data.salary || isNaN(data.salary) || Number(data.salary) <= 0) errors.salary = "Valid salary is required"
  
    

   return errors
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const errors=validate(employee)
 
    if (Object.keys(errors).length > 0) {
      setInputError(errors)
      return
    }
    setError('')
    try {
      const token=localStorage.getItem('token')
      const res=await API.put(`/employee/edit/${id}`,employee,{
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
     
  }
  return (
    <div >
       
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded mt-4 ">
                    <h3 className='text-2xl font-semibold mb-4'>Add New Employee</h3>
        {error && <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2"><p>{error}</p></div>}
        <form onSubmit={handleSubmit}  >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input type="text" placeholder="Insert Name"
                 name='name' className="w-full border p-2 rounded"
                value={employee.name ||''}
                 onChange={handleChange} />
                 {inputError.name && <span className="text-red-500 text-sm">{inputError.name}</span>}
              </div>
              
             
              {/* Date of birth */}

              <div>
                <label className="block mb-1 font-medium">Date of Birth</label>
                <input type="date" 
                name='dob' className="w-full border p-2 rounded"
                value={ employee.dob ? employee.dob.slice(0, 10) : ''}
                onChange={handleChange} />
                 {inputError.dob && <span className="text-red-500 text-sm">{inputError.dob}</span>}
              </div>

               
              {/* martial Status */}
              <div>
              <label className="block mb-1 font-medium">Marital Status</label>
              <select name='maritalStatus'
               onChange={handleChange}
              value={employee.maritalStatus ||''}
                className="w-full border p-2 rounded">
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
              onChange={handleChange}
              value={employee.designation ||''}
              />

               {inputError.designation && <span className="text-red-500 text-sm">{inputError.designation}</span>}
              
              </div>
              {/* department */}
              <div>
              <label className="block mb-1 font-medium">Department</label>
              <select  name='departmentId' value={employee.departmentId || ''} onChange={handleChange} className="w-full border p-2 rounded">
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
              name='salary' value={employee.salary ||''} placeholder="Salary" className="w-full border p-2 rounded" 
              onChange={handleChange}/>
               {inputError.salary && <span className="text-red-500 text-sm">{inputError.salary}</span>}
              </div>
               

              
               
          </div>

    
          <div className="mt-6">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded">
              Edit Employee
            </button>
          </div>
        </form>


      </div>
    </div>
  )
}

export default Edit
