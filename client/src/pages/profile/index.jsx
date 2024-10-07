
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { IoArrowBack } from 'react-icons/io5'
import { FaTrash, FaPlus } from "react-icons/fa"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { getColor } from "@/lib/utils";
import { Input } from "@/components/ui/input"
import { colors } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { updateUserDetails } from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
function Profile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.data);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false);
  const email = useSelector((state) => state.user.data?.email)
  const [selectedColor, setSelectedColor] = useState(user?.color ? user.color : 0);
  const dispatch = useDispatch();
  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
  }, [user])
  const validateProfile = () => {
    if (!firstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!lastName) {
      toast.error("Last Name is required")
      return false;
    }
    return true;
  }
  const handleNavigate = () => {
    console.log(user);
    if (user.profileSetup) {
      return navigate("/dashboard")
    } else {
      toast.error("Please Setup Profile to continue ..")
    }
  }
  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE, { firstName, lastName, color: selectedColor }, { withCredentials: true })
        console.log(response)
        if (response.status === 200) {
          console.log(response)
          dispatch(updateUserDetails(response.data.user));
          return navigate("/dashboard")
        }


      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div className="bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max ">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white text-opacity-90" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? <AvatarImage src={image} alt="profile" className="object-cover w-full h-full bg-black" />
                : <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)}`}>
                  {firstName
                    ? firstName.split("").shift()
                    : user?.email.split("").shift()}
                </div>
              }
            </Avatar>
            {
              hovered && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer">
                  {
                    image ? <FaTrash className="text-white text-3xl cursor-pointer" /> : <FaPlus className="text-white text-3xl cursor-pointer" />
                  }
                </div>
              )
            }
            {/* {input} */}

          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={user?.email} className="rounded-lg p-6 bg-[#2c2e3b] border-none">

              </Input>
            </div>
            <div className="w-full">
              <Input placeholder="First Name" type="email" value={firstName}
                onChange={(e) => setFirstName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none">

              </Input>
            </div>
            <div className="w-full">
              <Input placeholder="Last Name" type="email" value={lastName}
                onChange={(e) => setLastName(e.target.value)} className="rounded-lg p-6 bg-[#2c2e3b] border-none">

              </Input>
            </div>
            <div className="w-full flex gap-5">
              {
                colors.map((color, index) => (
                  <div key={index} className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline-white outline-1 outline" : ""}`} onClick={() => setSelectedColor(index)}></div>
                ))
              }

            </div>
          </div>
        </div>
        <div className="w-full">
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={saveChanges}>
            Save Changes
          </Button>
        </div>
      </div>


    </div>

  )
}

export default Profile