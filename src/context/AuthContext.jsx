// import React, { createContext,useContext,useEffect,useState } from 'react'
// import API from '../services/api'
 
// const userContext=createContext()
// const AuthContext = ({children}) => {
//     const [user,setUser]=useState(null)
//     const [loading, setLoading] = useState(true) // New state
    
//     useEffect(()=>{
//       const verifyUser=async()=>{
//         try {
//           const token=localStorage.getItem('token')
//           if(token){
//             const response=await API.get('/auth/verify',{
//               headers:{
//                 "authorization":`Bearer ${token}`
//               }
//             })
//             if(response.data.success){
//               setUser(response.data.user)
//             }
//         }else{
//            setUser(null)
//            setLoading(false)
//         }
//         } catch (error) {
//           if(error.response&&error.response.data.error){
//              setUser(null)
//               localStorage.removeItem('token')
//           }
//         } finally {
//           setLoading(false) 
//         }

//       } 
//       verifyUser()
//     },[])
    
//     const login=(user)=>{
//       setUser(user)
//     }
//     const logout=()=>{
//       setUser(null)
//       localStorage.removeItem('token')
//     }
//   return (
//     <userContext.Provider value={{user,login,logout,loading}}>
//       {!loading&&children}
       
//     </userContext.Provider>
//   )
// }
// export const useAuth=()=>useContext(userContext)
// export default AuthContext






import React, { createContext, useContext, useEffect, useState } from 'react'
import API from '../services/api'

const userContext = createContext()

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await API.get('/auth/verify', {
            headers: {
              authorization: `Bearer ${token}`,
            },
          })
          if (response.data.success) {
            setUser(response.data.user)
          } else {
            setUser(null)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    verifyUser()
  }, [])

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <userContext.Provider value={{ user, login, logout, loading }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p> {/* ⬅️ You can replace with spinner */}
        </div>
      ) : (
        children
      )}
    </userContext.Provider>
  )
}

export const useAuth = () => useContext(userContext)
export default AuthContext


 