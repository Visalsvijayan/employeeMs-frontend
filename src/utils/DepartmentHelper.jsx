import { useNavigate } from "react-router-dom"
import API from "../services/api"
import Swal from 'sweetalert2'

export const columns = (onDeleteDepartment) => [
  {
    name: 'S No',
    selector: (row) => row.sno
  },
  {
    name: 'Department',
    selector: (row) => row.dep_name
  },

  {
    name: 'Action',

    cell: (row) => (
      <DepartmentButton id={row.id} onDeleteDepartment={onDeleteDepartment} />
    ),
  }
]


export const DepartmentButton = ({ id, onDeleteDepartment }) => {
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await API.delete(`/department/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
          if (res.data.success) {

            onDeleteDepartment(id)

            Swal.fire({
              icon: 'success',
              title: 'Department Deleted successfully!',
              showConfirmButton: false,
              timer: 1500
            })


          }

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data?.message || 'Something went wrong!',
          });
        }
      }
    })





  }

  return (
    <div className="gap-2 flex">

      <button className="bg-green-600 px-4 py-1 border border-black text-white rounded-sm"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}>
        Edit

      </button>
      <button className="bg-red-600 px-4 py-1 border border-black text-white rounded-sm"
        onClick={() => handleDelete(id)}
      >Delete
      </button>
    </div>
  )
}

