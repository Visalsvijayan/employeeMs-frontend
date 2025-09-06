import React from 'react'
import {useAuth} from '../../context/AuthContext'
import { use } from 'react'
const Navbar = () => {
    const {user,logout}=useAuth()
  return (
    <div className='flex items-center justify-between text-white  h-14 bg-teal-500'>
      <p>Welcome {user.name}</p>
      <button className='bg-gray-500 rounded px-2 py-1 hover:bg-gray-900 mx-5'
       onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar
