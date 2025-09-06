import React, { useEffect, useState } from 'react'
import { fetchDepartment } from '../../utils/employeeHelper'
import API from '../../services/api'
import { useNavigate } from 'react-router-dom'
const Add = () => {
  const [department,setDepartment]=useState([])
  const [employee,setEmployee]=useState([])
  const [selectedDepartment,setSelectedDepartment]=useState('')
  const [formData,setFormData]=useState({})
  const [error,setError]=useState('')
  const [validationError,setValidationError]=useState({})
  const navigate=useNavigate()
  useEffect(()=>{
    const getDepartment=async()=>{
      const departmentDb=await fetchDepartment()
      setDepartment(departmentDb)
      console.log(department)
    }
    getDepartment()
  },[])

  //set the employees in i
  useEffect(()=>{
    if(!selectedDepartment) return
    const employeeFetch=async()=>{
        try {
          
        const response = await API.get(`/salary/${selectedDepartment}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if(response.data.success){
        setEmployee(response.data.data)
      }
      } catch (error) {
        setError('Employee fetching error')
      }
    }
    employeeFetch()
  
  },[selectedDepartment])
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
};
 
const handleSubmit=async(e)=>{
  e.preventDefault();
  const errors=validate(formData)
  if(Object.keys(errors).length>0){
    setValidationError(errors)
    return
  }

  try {
    const response=await API.post('/salary/add',formData,{
      headers:{
        authorization:`Bearer ${localStorage.getItem('token')}`
      }
    })
    if(response.data.success){
      navigate('/admin-dashboard/employee')
    }
    
  } catch (error) {
    setError('Salary updation failed')
  }
}
//validations
const validate=(data)=>{
  const errors={}
  if(!data.departmentId) errors.departmentId='Select Department'
  if(!data.employeeId) errors.employeeId='Select the Employee'
  if(!data.salary) errors.salary='Salary required'
  if(!data.allowance) errors.allowance='Allowance required'
  if(!data.deduction) errors.deduction='deduction required'
  
  if(!data.payDate) errors.payDate= 'Select the date'
   if (
    data.salary &&
    data.allowance &&
    data.deduction &&
    Number(data.salary) + Number(data.allowance) < Number(data.deduction)
  ) {
    errors.deduction = 'Salary + allowance should be greater than deduction';
  }
  
  return errors
}
  return (
     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Add New Salary</h2>
        
      {error && <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2"><p>{error}</p></div>}
        <form  onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Department */}
          <div>
            <label className="block mb-1 font-medium">Department</label>
            <select name='departmentId'
              onChange={(e)=>{
                handleChange(e);
                setSelectedDepartment(e.target.value);
              }}
             className="w-full border rounded p-2">
              <option value=''>Select Department</option>
              {
                department.map((dep)=>(
                  <option  value={dep._id} key={dep._id} >
                    {dep.dep_name}
                  </option>
                ))
              }
            </select>
            {validationError.departmentId && <span className="text-red-500 text-sm">{validationError.departmentId}</span>}
          </div>

          {/* Employee */}
          <div>
            <label className="block mb-1 font-medium">Employee</label>
            <select 
            name='employeeId'
            onChange={handleChange}
            className="w-full border rounded p-2">
              <option value=''>Select Employee</option>
              {
                employee.map((emp)=>(
                  <option value={emp._id} key={emp._id}>
                    {emp.userId.name}
                  </option>
                ))
              }
            </select>
            {validationError.employeeId && <span className="text-red-500 text-sm">{validationError.employeeId}</span>}

          </div>

          {/* Basic Salary */}
          <div>
            <label className="block mb-1 font-medium">Basic Salary</label>
            <input
              type="number"
              name='salary'
              min='0'
              onChange={handleChange}
              placeholder="Insert Salary"
              className="w-full border rounded p-2"
            />
             {validationError.salary && <span className="text-red-500 text-sm">{validationError.salary}</span>}
          </div>

          {/* Allowances */}
          <div>
            <label className="block mb-1 font-medium">Allowances</label>
            <input
              name='allowance'
              type="number"
              min='0'
              onChange={handleChange}
              placeholder="Monthly Allowances"
              className="w-full border rounded p-2"
            />
             {validationError.allowance && <span className="text-red-500 text-sm">{validationError.allowance}</span>}
          </div>

          {/* Deductions */}
          <div>
            <label className="block mb-1 font-medium">Deductions</label>
            <input
              type="number"
              name='deduction'
              min='0'
              onChange={handleChange}
              placeholder="Monthly Deductions"
              className="w-full border rounded p-2"
            />

             {validationError.deduction && <span className="text-red-500 text-sm">{validationError.deduction}</span>}
          </div>

          {/* Pay Date */}
          <div>
            <label className="block mb-1 font-medium">Pay Date</label>
            <input
              type="date"
              name='payDate'
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
             {validationError.payDate && <span className="text-red-500 text-sm">{validationError.payDate}</span>}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Add Salary
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Add
