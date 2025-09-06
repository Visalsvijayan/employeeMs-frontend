import React from 'react'
import DataTable from 'react-data-table-component'
import { columns } from '../../utils/SalaryHelper'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../services/api'
import { useState } from 'react'
 

const View = () => {
    const {id}=useParams()
    const [data,setData]=useState([])
    const [error,setError]=useState('')
    const customStyles = {
        headCells: {
            style: {
            fontWeight: 'semibold',
            fontSize: '16px',
            backgroundColor: '#f3f4f6', // light gray
            color: '#1f2937',           // dark text
            justifyContent: 'center',   // center the heading text
            },
        },
        cells: {
            style: {
            justifyContent: 'center', // center cell content
            color: '#4B5563'
            },
        },
    };


    useEffect(()=>{
        const fetchSalary=async()=>{
            try {
                const response=await API.get(`/salary/employee/${id}`,{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success){
                    let SNo=1
                    const prepareData=await response.data.data.map((slry)=>{
                        return{
                            SNo:SNo++,
                            employeeId:slry.employeeId.employeeId,
                            salary:slry.salary,
                            allowance:slry.allowance,
                            deduction:slry.deduction,
                            netSalary:slry.netSalary,
                            payDate:slry.payDate 

                        }
                        
                    })
                    setData(prepareData)
                }
                
            } catch (error) {
                setError('')
            }
        }
        fetchSalary()
    },[])
  return (
    <div>
       <div>
        <h1 className='text-3xl font-semibold text-center'>Salary History </h1>
        <div className='flex justify-end'>
            <input type="text" placeholder='Search By Emp ID' className='px-3 py-2 m-2 border border-gray-300 rounded justify-end '/>

        </div>
        {error && <div className="mb-4 text-red-600 bg-red-100 border border-red-300 rounded px-3 py-2"><p>{error}</p></div>}
        <div  >
            <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}

            />
        </div>
       </div>
    </div>
  )
}

export default View 
