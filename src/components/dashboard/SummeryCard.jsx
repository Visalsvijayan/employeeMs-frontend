import React, { useEffect } from 'react'
import { useState } from 'react'
const SummeryCard = ({ icon, text, number, color }) => {
 
  return (
    <div className='flex bg-white h-16'>
      <div className={`text-2xl ${color} p-4`}>
        {icon}
      </div>
      <div className='ml-6'>
        <p className='text-lg font-semibold'>{text}</p>
        <p className='text-xl font-bold'>{number}</p>
      </div>
    </div>
  )
}

export default SummeryCard
