 import React from 'react'
 import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
 
import AdminDashboard from './pages/AdminDashboard'
import Login from './pages/Login'
import EmployeeDashboard from './pages/EmployeeDashboard'
import RoleBasedRoutes from './utils/RoleBasedRoutes'
import PrivateRoute from './utils/PrivateRoute'
import AdminSummery from './components/dashboard/AdminSummery'
import DepartmentList from './components/department/DepartmentList'
import AddDepartment from './components/department/AddDepartment'
import EditDepartment from './components/department/EditDepartment'
import List from './components/employee/List'
import Add from './components/employee/Add'
import View from './components/employee/View'
import Edit from './components/employee/Edit'
import AddSalary from './components/salary/Add'
import ViewSalary from './components/salary/View'
import Summery from './components/EmployeeDashboard/Summery'
import ViewUser from './components/EmployeeDashboard/View'
import Leaves from './components/EmployeeDashboard/Leaves'
import AddLeave from './components/EmployeeDashboard/AddLeave'
import UserSalary from './components/EmployeeDashboard/Salary'
import Settings from './components/EmployeeDashboard/Settings'
import LeaveAdmin from './components/leave/Leave'
import LeaveDetails from './components/leave/LeaveDetails'
import { useAuth } from './context/AuthContext'
 const App = () => {
  const {user}= useAuth()
   return (
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' element={<Navigate to="/admin-dashboard"/>} > </Route> */}
           <Route
          path="/"
          element={
            user ? (
              user.role === "admin" ? (
                <Navigate to="/admin-dashboard" />
              ) : (
                <Navigate to="/employee-dashboard" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin-dashboard' element={
            <PrivateRoute>
              <RoleBasedRoutes requiredRole={['admin']}>
                <AdminDashboard/>
              </RoleBasedRoutes>
            </PrivateRoute>
           
           
            }>
              {/*children route to dynamically render with outlet*/}
              <Route index element={<AdminSummery/>}></Route>
              <Route path='/admin-dashboard/departments' element={<DepartmentList/>} ></Route>
              <Route path='/admin-dashboard/add-department' element={<AddDepartment/>} ></Route>
              <Route path='/admin-dashboard/department/:id' element={<EditDepartment/>}></Route>
              <Route path='/admin-dashboard/employee' element={<List/>} ></Route>
              <Route path='/admin-dashboard/add-employee'element={<Add/>} ></Route>
              <Route path='/admin-dashboard/employee/views/:id' element={<View/>}></Route>
              <Route path='/admin-dashboard/employee/edit/:id' element={<Edit/>}></Route>
              <Route path='/admin-dashboard/salary' element={<AddSalary/>}></Route>
              <Route path='/admin-dashboard/employee/salary/:id' element={<ViewSalary/>}></Route>
              <Route path='/admin-dashboard/leave' element={<LeaveAdmin/>}></Route>
              <Route path='/admin-dashboard/leave/:id' element={<LeaveDetails/>}></Route>
              <Route path='/admin-dashboard/employee/leave/:id' element={<Leaves/>}></Route>
              <Route path='/admin-dashboard/settings' element={<Settings/>}></Route>
              
          </Route>
          <Route 
            path='/employee-dashboard'
            element={
              <PrivateRoute>
                <RoleBasedRoutes requiredRole={['admin','employee']}>
                     <EmployeeDashboard/>
                </RoleBasedRoutes>
              </PrivateRoute>
           
            }>
              <Route index element={<Summery/>}></Route>
              <Route path='/employee-dashboard/user' element={<ViewUser/>}></Route>
              <Route path='/employee-dashboard/leave' element={<Leaves/>}></Route>
              <Route path='/employee-dashboard/add-leave' element={<AddLeave/>}></Route>
              <Route path='/employee-dashboard/salary'element={<UserSalary/>}></Route>
              <Route path='/employee-dashboard/settings'element={<Settings/>}></Route>
           </Route>
        </Routes>
      </BrowserRouter>

   )
 }
 
 export default App
 