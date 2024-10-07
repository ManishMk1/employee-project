import React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from 'sonner';
import Header from '../header';
import { apiClient } from '@/lib/api-client';
import { CREATE_EMPLOYEE } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';
function EmployeeDetails() {
    const navigate=useNavigate();
    const [gender, setGender] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [selectedCourse,setSelectedCourse]=useState("");
    const [designation, setDesignation] = useState("");
    const handleCheckboxChange = (course) => {
        setSelectedCourse(selectedCourse === course ? '' : course);
    };
    const validateEmail=(email)=>{
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    const validateMobileNumber=(number)=>{
        const regex = /^(?:\+?\d{1,3})?[-.\s]?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
        return regex.test(number);
    }
    const handleValidate=()=>{
        if(!firstName){
            toast.error("First Name is required")
            return;
        }
        if(!lastName){
            toast.error("Last Name is required")
            return;
        }
        if(!email||!validateEmail(email)){
            toast.error("Valid Email is required");
            return;
        }
        if(!mobileNo||!validateMobileNumber(mobileNo)){
            toast.error(" Valid Mobile No is required");
            return;
        }
        if(!designation){
            toast.error("Designation is required");
            return;
        }
        if(!gender){
            toast.error("Gender is required");
            return;
        }
        if(!selectedCourse){
            toast.error("Course is required")
            return;
        }
        return true;
    }
    const handleSubmit=async ()=>{
        try {
            if(handleValidate()){
                const response=await apiClient.post(CREATE_EMPLOYEE,{
                firstName:firstName,
                lastName:lastName,
                 email:email,
                 mobileNo:mobileNo,
                 designation:designation,
                 gender:gender,
                 course:selectedCourse,
                
     
                })
                if(response.status===201){
                    toast("Employee created Successfully");
                    return navigate("/employee-list");
                }
             }
        } catch (error) {
            console.log(error);
        }
        

    }
    return (
        <div className='h-[100vh] w-screen flex items-center justify-center'>
            <Header></Header>
            <div className='h-[80vh] w-[80vw] xl:w-[70vw] flex flex-col gap-5'>
                {/* heading */}
                <div className='flex flex-col '>
                    <div className=''>
                        <div className='font-semibold text-xl mb-2'>
                            Employee Create Form
                        </div>
                        <div>
                            Please fill out form below with the employee details
                        </div>
                    </div>
                </div>
                {/* name */}
                <div className='flex gap-10 '>
                    <div className='flex flex-col'>
                        <div className='text-lg'>
                            First Name
                        </div>
                        <div>
                            <Input type="text" className='focus:border-none' value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-lg'>
                            Last Name
                        </div>
                        <div>
                            <Input type="text" className='focus:border-none' value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                        </div>
                    </div>


                </div>
                {/* email */}
                <div className='flex flex-col'>
                    <div className='text-lg'>
                        Email Address *
                    </div>
                    <div>
                        <Input type="text"  value={email} className="w-[415px]" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>

                </div>
                {/* {mobileNO} */}
                <div className='flex flex-col'>
                    <div  className='text-lg'> 
                        Mobile No *
                    </div>
                    <div>
                        <Input type="text" className="w-[200px]" value={mobileNo} onChange={(e)=>{setMobileNo(e.target.value)}} />
                    </div>

                </div>
                {/* designation */}
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <div  className='text-lg'>
                            Designation
                        </div>

                        <select className='w-[20vw] h-[6vh] border-gray-200 border-1 border rounded-md' onChange={(e)=>{setDesignation(e.target.value) }}>
                            <option value="" selected disabled>Choose Designation</option>
                            <option value="HR"  className='text-lg'>HR</option>

                            <option value="Manager"  className='text-lg'>Manager</option>

                            <option value="Sales"  className='text-lg'>Sales</option>

                        </select>

                    </div>
                </div>
                {/* Gender */}
                <div className='flex flex-col'>
                    <div  className='text-lg'>
                        Gender
                    </div>
                    <div className='flex items-center gap-5'>
                        <label  className='text-lg'>
                            Male
                            <input
                                type="radio"
                                name="gender"
                                className='ml-2'
                                onClick={() => setGender('male')}
                                value="male"
                            />
                        </label>
                        <label  className='text-lg'>
                            Female
                            <input
                                type="radio"
                                name="gender"
                                className='ml-2'
                                onClick={() => setGender('female')}
                                value="female"
                            />
                        </label>
                    </div>


                </div>
                {/* Course */}
                <div className='flex flex-col'>
                    <div  className='text-lg'>
                        Course
                    </div>
                    <div className='flex gap-2'>
            <label htmlFor="mca"  className='text-lg'>MCA</label>
            <input 
                type="checkbox" 
                id="mca" 
                checked={selectedCourse === 'MCA'} 
                onChange={() => handleCheckboxChange('MCA')} 
            />

            <label htmlFor="bca" className='text-lg'>BCA</label>
            <input 
                type="checkbox" 
                id="bca" 
                checked={selectedCourse === 'BCA'} 
                onChange={() => handleCheckboxChange('BCA')} 
            />

            <label htmlFor="msc"  className='text-lg'>MSC</label>
            <input 
                type="checkbox" 
                id="msc" 
                checked={selectedCourse === 'MSC'} 
                onChange={() => handleCheckboxChange('MSC')} 
            />
        </div>
                </div>
                {/* Image Upload */}
                <div className='flex flex-col gap-2'>
                    <div  className='text-lg'>
                        Image Upload
                    </div>
                    <div>
                        <input type="file" />
                    </div>
                </div>
                <div>
                    <Button  className='text-lg w-[100px]' onClick={handleSubmit}>Submit</Button>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails