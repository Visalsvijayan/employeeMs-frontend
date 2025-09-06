import React, { useEffect,useState} from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import {columns} from '../../utils/employeeHelper'
import API from '../../services/api'

const List = () => {
  const [employee,setEmployee]=useState([])
  const [filterEmployees,setFilterEmployees]=useState([])
  useEffect(()=>{
    const fetchEmployees=async ()=>{
      try {
        const res=await API.get('/employee',{
          headers:{
            authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(res.data.success){
          let sno=1
           const prepareData=await res.data.employeeData.map((emp)=>{
             return {
                id:emp._id,
                sno:sno++,
                name:emp.userId.name,
                dob:emp.dob,
                department:emp.department.dep_name,
                image:emp.userId.profileImage

             }
           })
           setEmployee(prepareData)
           setFilterEmployees(prepareData)

        }
      } catch (error) {
        
      }
    }
    fetchEmployees()
  },[])

  const handleChange=(e)=>{
      const input=e.target.value;
      const record=employee.filter((emp)=>{
        return emp.name.toLowerCase().includes(input.toLowerCase())
      })
      setFilterEmployees(record)
  }
  return (
     <div className='ml-3 mr-3 '>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Employee</h3>
      </div>
      <div className='flex justify-between m-3 '>
        <input type="text" placeholder='Search By Department'
         className='py-1 px-5 border-black border' 
          onChange={handleChange}
         />
        <Link to='/admin-dashboard/add-employee'
         className='bg-teal-500 rounded px-5 py-2 text-white font-semibold'
         >
          Add New Employee
        </Link>
      </div>
      <div className='mt-5 overflow-x-auto '>
         <DataTable
        title="Manage Employees"
        columns={columns}
        data={filterEmployees}
        pagination
        responsive
        highlightOnHover
        pointerOnHover
        striped
        fixedHeader
      />
      </div>
    </div>
  )
} 

export default List 
