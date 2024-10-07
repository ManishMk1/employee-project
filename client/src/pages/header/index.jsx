import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '@/store/userSlice';
import { Navigate } from 'react-router-dom';
import { LOGOUT } from '@/utils/constants';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
function Header() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
    const user=useSelector(state=>state.user.data);
    const handleLogout = async () => {
      try {
          await apiClient.post(LOGOUT, {}, { withCredentials: true });
          dispatch(updateUserDetails(null)); // Clear user details from state
          navigate("/login"); // Redirect to login page
          toast.success("Logged out successfully");
      } catch (error) {
         toast.error("Failed to log out");
      }
  };
  
  return (
    <div className='absolute top-0'>
        <div className='flex items-center justify-between  shadow-md w-[100vw] mt-2 text-lg '>
        <div className='ml-4'>
        <NavLink to="/dashboard"> Home</NavLink>
        </div>
        <div>
           <NavLink to="/employee-list">Employee List</NavLink>
        </div>
        <div>
        {`${user?.firstName} ${user?.lastName}`}
        </div>
        <div>
            <Button className="mr-8" onClick={handleLogout}>Logout</Button>
        </div>
        </div>
    </div>
  )
}

export default Header