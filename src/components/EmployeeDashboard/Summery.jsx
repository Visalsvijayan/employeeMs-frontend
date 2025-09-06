import React from 'react'
import { FaUser } from 'react-icons/fa'
import {useAuth} from '../../context/AuthContext'

const SummeryCard = () => {
    const {user}=useAuth()
  return (
    <div className='flex  bg-white h-16 p-2 m-3'>
      <div className={`text-2xl bg-teal-500 p-4`}>
         <FaUser/>
      </div>
      <div className='ml-6'>
        <p className='text-lg font-semibold'>Wellcome back </p>
        <p className='text-xl font-bold'>{user.name}</p>
      </div>
    </div>
  )
}

export default SummeryCard
