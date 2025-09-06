import axios from 'axios'

// const API=axios.create({
//     baseURL:'http://localhost:3000/api'
// })


const API = axios.create({
  baseURL: 'https://employee-ms-backend-six.vercel.app/api'
})
export default API;