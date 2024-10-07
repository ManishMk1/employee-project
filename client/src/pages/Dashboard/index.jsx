
import Header from '../header'
import { NavLink } from 'react-router-dom'
function Dashboard() {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
        
        
             <Header></Header>
            <div>
            <h3>
          Welcome to Control Panel
        </h3>
            </div>
             <div className='flex items-center justify-center w-[60vw] h-[60vh]'>
              
             <div className='flex gap-10'>
              <NavLink to="/employee-list">
              <div className='w-[20vw] h-[20vh] border border-1 shadow-lg rounded-xl flex items-center justify-center'>Employee List</div>
              </NavLink>
              <NavLink to="/create-employee">
              <div  className='w-[20vw] h-[20vh] border border-1 shadow-lg rounded-xl  flex items-center justify-center'>Create Employee</div>
              </NavLink>
             
             
             </div>
             </div>
             

             
    </div>
  
  )
}

export default Dashboard