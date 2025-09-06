import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'
import { columns,DepartmentButton } from '../../utils/DepartmentHelper'
import API from '../../services/api'
 


const DepartmentList = () => {
  // const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')
  const [departments,setDepartments]=useState([])
  const [filter,setFilter]=useState('')
  
  const onDeleteDepartment=(id)=>{
    
    setDepartments(prev => prev.filter(dep => dep.id !== id))
  }
  const fetchDepartments=async()=>{
    // setLoading(true)
    try {
       
      const res=await API.get('/department',{
        headers:{
          authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })

      if(res.data.success){
        let sno=1
         const prepareData=await res.data.data.map((dep)=>{
            return {
              id:dep._id,
              sno:sno++,
              dep_name:dep.dep_name,
              

            }
         })
         setDepartments(prepareData)
         
          
      }
    } catch (error) {
      alert(error.response.data)
    }
  }

  useEffect(()=>{
    fetchDepartments()
  },[])

  const handleFiltering=(e)=>{
     
      setFilter(e.target.value)
      
  }
  const filterData=departments.filter((dep)=>dep.dep_name.includes(filter))
  return (
    <div className='ml-3 mr-3 '>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'>Manage Departments</h3>
      </div>
      <div className='flex justify-between m-3 '>
        <input type="text" placeholder='Search By Department'
         className='py-1 px-5 border-black border' 
         onChange={handleFiltering}
         />
        <Link to='/admin-dashboard/add-department' className='bg-teal-500 rounded px-5 py-2 text-white font-semibold'>Add New Department</Link>
      </div>
      <div className='mt-5 overflow-x-auto '>
        <DataTable
          columns={columns(onDeleteDepartment)}
          data={filterData}
          responsive
        />
      </div>
    </div>



     

  )
}

export default DepartmentList
