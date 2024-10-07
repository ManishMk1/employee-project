import { useEffect } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from 'sonner'
function Chat() {
  const user=useSelector((state)=>state.user.data)
  console.log(user)
  const navigate=useNavigate();
  useEffect(()=>{
    console.log("hii")
    if(!user.profileSetup){
   
      toast("Please setup profile to continue..")
      navigate("/profile");
    }
  },[])
  return (
    <div>Chat</div>
  )
}

export default Chat