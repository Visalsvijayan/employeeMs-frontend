 import Employee from "../../../server/models/employee";
import API from "../services/api"
import { Navigate, useNavigate } from "react-router-dom";
  

//  get the department in the add employee form
  const fetchDepartment = async () => {
  try {
    const response = await API.get('/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data?.success) {
       
      return response.data.data;

    } else {
      console.error('Failed to fetch department:', response.data?.message || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.error('Error fetching department:', error.message);
    return null;
  }
};



//get the employee detals in Edit employee page




// List the employees

 const columns = [
    {
      name: 'S No',
      selector: (row, index) => index + 1,
      width: '70px',
    },
    {
      name: 'Image',
      cell: row => (
        <img
          src={`${ import.meta.env.VITE_API_BASE_URL}/uploads/${row.image}`}  
          alt="Employee"
          className="w-10 h-10 rounded-full object-cover"
        />
      ),
      width: '90px',
      
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      
    },
    {
      name: 'DOB',
      selector: row => new Date(row.dob).toLocaleDateString(),
      sortable: true,
       
    },
    {
      name: 'Department',
      selector: row => row.department || 'N/A',
      sortable: true,
       
    },
    {
      name: 'Action',
      cell: row => (
        <EmployeeButton id={row.id} />
      ),
      center:true
    },
  ]


  const EmployeeButton=({id})=>{
    const navigate=useNavigate()
    return(
      <div className="flex gap-2">
          <button   
          onClick={()=>navigate(`/admin-dashboard/employee/views/${id}`)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            View
          </button>
          <button   className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
            onClick={()=>navigate(`/admin-dashboard/employee/edit/${id}`)}
          >
            Edit
          </button>
          <button   className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
          onClick={()=>navigate(`/admin-dashboard/employee/salary/${id}`)}
          >
            Salary
            
          </button>
          <button  
            onClick={()=>navigate(`/admin-dashboard/employee/leave/${id}`)}
           className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
           >
            Leave
          </button>
        </div>
    )
  }
  export {
    fetchDepartment,
     
    columns
  }
