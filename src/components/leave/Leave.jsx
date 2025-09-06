import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/DepartmentHelper'
import API from '../../services/api'
import { useNavigate } from 'react-router-dom'
const Leave = () => {
  const [data,setData]=useState([])
  const [filterButton,setFilterButton]=useState([])
  const [error,setError]=useState('')
  const navigate=useNavigate()
    const columns=[
        {name:'S No',selector:(row)=>row.sno,sortable:true},
        {name:'Emp ID',selector:(row)=>row.employeeId,sortable:true},
        {name:'Leave Type',selector:(row)=>row.leaveType,sortable:true},
        {name:'Department',selector:(row)=>row.department,sortable:true},
        {name:'Days',selector:(row)=>row.days,sortable:true,},
        {name:'Status',selector:(row)=>row.status,sortable:true},
        {name:'Action',
          cell:(row)=>(
            <button
            className='bg-teal-700 text-white px-3 py-1 rounded'
            onClick={(id)=>navigate(`/admin-dashboard/leave/${row.id}`)}>
              View
            </button>
          )
        }

    ]

    useEffect(()=>{
      const fetchTableData=async()=>{
        try {
          const res=await API.get('/leave',{
            headers:{
              authorization:`Bearer ${localStorage.getItem('token')}`
            }
          })
          if(res.data.success){
            let sno=1
             
             const prepareData=res.data.leaves.map((lev)=>{
              const start=new Date(lev.startDate)
              const end=new Date(lev.endDate)
              const days =Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
              return {
                sno:sno++,
                employeeId:lev.employeeId.employeeId,
                name:lev.employeeId.userId.name,
                leaveType:lev.leaveType,
                department:lev.employeeId.department.dep_name,
                days:days,
                status:lev.status,
                id:lev._id
              }
             })
             setData(prepareData)
             setFilterButton(prepareData)
          }
          
        } catch (error) {
          setError('Something went wrong, Table data missing')
        }
      }
      fetchTableData()
    },[])

    const filterStatus=(status)=>{
       const filter= data.filter((leav)=>leav.status.includes(status))
       setFilterButton(filter)
    }
     
    const filterByInput = (e) => {
    const value = e.target.value.toLowerCase()
    const filter = data.filter((leav) =>
      leav.employeeId.toLowerCase().includes(value)
    )
    setFilterButton(filter)
  }
  return (
    <div className='w-full min-h-[calc(100vh-56px)] bg-gray-200'>
        <h2 className='text-3xl font-semibold text-center p-2'>Manage Leaves</h2>
      <div className=' flex flex-col md:flex-row md:justify-between md:items-center gap-3 p-4"'>
        <input type="text" onChange={filterByInput}
         placeholder='Employee Id'className=' border border-gray-300 py-1 px-4 m-2' />
        <div className='flex justify-center space-x-2 mr-2'>
            <button onClick={()=>filterStatus('Pending')}className='bg-teal-600 text-white px-2 py-1 rounded'>Pending</button>
            <button onClick={()=>filterStatus('Rejected')} className='bg-teal-600 text-white px-2 py-1 rounded'>Approved</button>
            <button onClick={()=>filterStatus('Approved')}className='bg-teal-600 text-white px-2 py-1 rounded'>Rejected</button>

        </div>
      </div>
      <div className='mt-4 mr-2 ml-2'>
        {error&&<span className='text-red-700'>{error}</span>}
        <DataTable
          columns={columns}
          data={filterButton}
          pagination

        />

         
      </div>
    </div>
  )
}

export default Leave
