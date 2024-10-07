import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Button } from './components/ui/button'
import Chat from './pages/chat'
import Profile from './pages/profile'
import Auth from './pages/auth'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from "sonner"
import { getUser } from './store/userSlice'
import EmployeeDetails from './pages/employee'
import EditEmployeeDetails from './pages/editEmployee'
import EmployeeList from './pages/EmployeeList'
import Dashboard from './pages/Dashboard'
function App() {
  const dispatch = useDispatch();

  const user = useSelector(state => state.user?.data)
  useEffect(() => {
    const getUserData = async () => {
      try{
        dispatch(getUser())
      }catch(error){
        console.log(error)
      }
  }
  
  if (!user) {
    getUserData(getUser());
  } 
  }, [user])
 

  // const PrivateRoute = ({ children }) => {
  //   const user = useSelector((state) => state.user.data)
  //   console.log("priveate")
  //   const isAuthenticated = !!user;
  //   return isAuthenticated ? children : <Navigate to="/auth" />
  // }
  // const AuthRoute = ({ children }) => {
  //   const user = useSelector((state) => state.user.data)
  //   console.log("authroute")
  //   const isAuthenticated = !!user;
  //   return isAuthenticated ? <Navigate to="/dashboard" /> : children
  // }


  return (
    <>
     <BrowserRouter>
     <Routes>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='/chat' element={<Chat />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='*' element={<Navigate to="/auth" />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/create-employee' element={<EmployeeDetails/>}/>
          <Route path='/edit-employee' element={<EditEmployeeDetails/>}/>
          <Route path='/employee-list' element={<EmployeeList/>}/>
     
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
