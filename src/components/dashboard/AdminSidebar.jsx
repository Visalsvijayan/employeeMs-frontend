// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import {FaTachometerAlt,FaUsers,FaBuilding, FaMoneyBill,FaCog} from 'react-icons/fa'
// const AdminSidebar = () => {
//   return (
//     <div className='w-64 bg-gray-900 h-screen tex-white fixed'>
//         <div className='flex h-12 text-white font-abril text-4xl mb-16 bg-teal-500'>
//             <h3>Employee MS</h3>
//         </div>
//         <nav className='flex flex-col gap-9 ml-5'>
//             <NavLink 
//             to='/admin-dashboard'
//             className={`flex items-center space-x-4 text-white font-bold`}

            
//             >
//                 <FaTachometerAlt/>
//                 <span>Dashboard</span>


//             </NavLink>
//             <NavLink
//             to='/'
//             className="flex items-center space-x-4 text-white font-bold"
//             >
//                 <FaUsers/>
//                 <span>Employees</span>

//             </NavLink>
//             <NavLink
//             to='/'
//             className="flex items-center space-x-4 text-white font-bold"
//             >
//                 <FaBuilding/> 
//                 <span>Departments</span>
 
//             </NavLink>
//             <NavLink
//             to='/'
//             className="flex items-center space-x-4 text-white font-bold"
//             >
//                 <FaBuilding/> 
//                 <span>Leave</span>
 
//             </NavLink>
//             <NavLink
//             to='/'
//             className="flex items-center space-x-4 text-white font-bold"
//             >
//                 <FaMoneyBill/> 
//                 <span>Salary</span>
 
//             </NavLink>
//             <NavLink
//             to='/'
//             className="flex items-center space-x-4 text-white font-bold"
//             >
//                 <FaCog/> 
//                 <span>Settings</span>
 
//             </NavLink>
//         </nav>
      
//     </div>
     
//   )
// }


// export default AdminSidebar



import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaCog,
} from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', path: '/admin-dashboard', icon: <FaTachometerAlt /> },
  { name: 'Employees', path: '/admin-dashboard/employee', icon: <FaUsers /> },
  { name: 'Departments', path: '/admin-dashboard/departments', icon: <FaBuilding /> },
  { name: 'Leave', path: '/admin-dashboard/leave', icon: <FaBuilding /> },
  { name: 'Salary', path: '/admin-dashboard/salary', icon: <FaMoneyBill /> },
  { name: 'Settings', path: '/admin-dashboard/settings', icon: <FaCog /> },
];

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 h-screen text-white fixed">
      <div className="h-14 flex items-center justify-center text-2xl font-bold bg-teal-500">
        Employee MS
      </div>

      <nav className="flex flex-col gap-4 p-5">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'text-gray-300 hover:bg-gray-700'
              }`
            }
            end //to active only one sidebar item
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
