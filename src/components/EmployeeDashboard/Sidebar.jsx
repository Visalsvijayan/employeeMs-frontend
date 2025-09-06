 import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaCog,
  FaUmbrellaBeach 
} from 'react-icons/fa';

const menuItems = [
  { name: 'Dashboard', path: '/employee-dashboard', icon: <FaTachometerAlt /> },
  { name: 'My Profile', path: '/employee-dashboard/user', icon: <FaUsers /> },
 
  { name: 'Leave', path: '/employee-dashboard/leave', icon: <FaUmbrellaBeach /> },
  { name: 'Salary', path: '/employee-dashboard/salary', icon: <FaMoneyBill /> },
  { name: 'Settings', path: '/employee-dashboard/settings', icon: <FaCog /> },
];

const  Sidebar = () => {
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

export default Sidebar;