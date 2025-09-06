import React from 'react'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
const Leaves = () => {              
    const [leave,setLeave]=useState([])
    const {user}=useAuth()
    const [filter,setFilter]=useState([])
 
  const { id:empId } = useParams()     //this makes page available from admin side also
  const finalId = user.role === 'admin' ? empId : user._id

    useEffect(()=>{
        const fetchLeave=async()=>{
            try {
                const response=await API.get(`/leave/${finalId}`,{
                    headers:{
                        authorization:`Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success){
                    let sno=1
                    const prepareData=response.data.data.map((leave)=>{
                        return{
                            sno:sno++,
                            leaveType:leave.leaveType,
                            from: new Date(leave.startDate).toLocaleDateString(),
                            to:new Date(leave.endDate).toLocaleDateString(),
                            description:leave.reason,
                            status:leave.status,
                            applied:new Date(leave.appliedAt).toLocaleDateString()
                        }
                    })

                    setLeave(prepareData)
                    setFilter(prepareData)
                }

            } catch (error) {
                alert('something went wrong')
            }
        }
        fetchLeave()
    },[])
    
    const inputFilter=(e)=>{
        const value=e.target.value.toLowerCase()
        const data=leave.filter((lev)=>lev.status.toLowerCase().includes(value))
        setFilter(data)
    }
  return (
    <div className='w-full min-h-[calc(100vh-56px)] bg-gray-300'>
        <h1 className='text-3xl font-semibold text-center'>Manage Leaves</h1>
        <div className=' flex justify-between p-4'>
            <input
             type="text"
             onChange={inputFilter}
              placeholder='Search By Status'
              className='p-2 border border-gray text-center rounded'
            />
            {user.role==='employee'&&
             <Link to='/employee-dashboard/add-leave'  className='py-2 px-9 bg-teal-600 rounded text-white'>Add Leave</Link>
            }
        </div>
         

         {/* Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg m-3">
            <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                <th className="px-4 py-3 text-left">SNO</th>
                <th className="px-4 py-3 text-left">Leave Type</th>
                <th className="px-4 py-3 text-left">From</th>
                <th className="px-4 py-3 text-left">To</th>
                <th className="px-4 py-3 text-left">Description</th>
                <th className="px-4 py-3 text-left">Applied Date</th>
                <th className="px-4 py-3 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    filter.map((l,i)=>(
                        <tr key={i}className="border-b">
                            <td className="px-4 py-3">{l.sno}</td>
                            <td className="px-4 py-3">{l.leaveType}</td>
                            <td className="px-4 py-3">{l.from}</td>
                            <td className="px-4 py-3">{l.to}</td>
                            <td className="px-4 py-3">{l.description}</td>
                            <td className="px-4 py-3">{l.applied}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">{l.status}</td>
                        </tr>
                    ))
                }
                
                
            </tbody>
            </table>
        

            
        
        </div>
</div>


  )
}

export default Leaves
