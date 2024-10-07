import mongoose from "mongoose";
const employeeSchema= mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
    },
    mobileNo:{
        type:String,
    },
    designation:{
        type:String,
    },
    gender:{
        type:String,
    },
    course:{
        type:String,
    },
    createDate:{
        type:String,
        default:Date.now(),
    },
    image:{
        type:String,
    }


})
const Employee=mongoose.model("Employees",employeeSchema);
export default Employee;