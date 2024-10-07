import User from "../Models/UserModel.js";
import jwt from 'jsonwebtoken'
import { compare } from "bcrypt";
import Employee from "../Models/EmployeeModel.js";
const maxAge=3*24*60*60*1000;
const createToken=(email,userId)=>{
    return jwt.sign({email,userId},process.env.JWT_KEY,{
        expiresIn:maxAge
    });
}
export const signup=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).send("Email and Password is Required");

        }
        const user = await User.create({email,password});
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(201).json({
            user:{
                id:user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                profileSetup:user.profileSetup
            }
        })


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).send("Email and Password is Required");

        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User with the given email not found");
        }
        const auth =await compare(password,user.password);
        if(!auth){
            return res.status(404).send("Password is Incorrect");
        }
        res.cookie("jwt",createToken(email,user.id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
    

        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                profileSetup:user.profileSetup,
                color:user.color
            }
        })


    }catch(error){
        console.log("<--Error at Login -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const getInfo=async(req,res)=>{
    try{
        const email=req.email;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).send("User with the given email not found");
        }
        
    
        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                profileSetup:user.profileSetup,
                color:user.color
            }
        })


    }catch(error){
        console.log("<--Error at get user -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const updateProfile=async(req,res)=>{
    try{
        const {firstName,lastName,color}=req.body;
        const userId=req.userId; 
        if(!firstName||!lastName){
            return res.status(400).send("FirstName, LastName and color is required");
        }
        console.log(firstName,lastName,color)
        const user = await User.findByIdAndUpdate(userId,{firstName,lastName,color,profileSetup:true},{new:true,runValidators:true});
        return res.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                profileSetup:user.profileSetup,
                color:user.color
            }
        })


    }catch(error){
        console.log("<--Error at get user -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const addProfileImage=async(req,res,next)=>{
    console.log("receive");
    if(!req.file){
        return res.status(400).send("File is required");
    }
    // const updatedUser=await User.findByIdAndUpdate(req.userId,{
    //     image:req.file.path
    // },{new:true,runValidators:true})
    // console.log(req.file.filename);
    // console.log(req.file.path);
    // return res.status(200).json({
    //     image:updatedUser.image,
    // })
    return res.send("HH");
}
export const removeProfileImage = async (req, res, next) => {
    try {
      // Find the user by ID
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      const publicId = user.image;
      
      // Function to extract the public ID from the Cloudinary URL
      const extractPublicId = (url) => {
        const regex = /\/v\d+\/(.+)\./; // Regex to match the public ID in the Cloudinary URL
        const match = url.match(regex);
        return match ? match[1] : null;
      };
  
      // Extract the public ID from the URL
      const cloudinaryPublicId = extractPublicId(publicId);
  
      if (!cloudinaryPublicId) {
        return res.status(400).json({ error: "Invalid image URL" });
      }
  
      // Attempt to delete the image from Cloudinary
      const result = await cloudinary.uploader.destroy(cloudinaryPublicId);
  
      if (result.result === 'ok') {
        // Image deletion was successful, now remove the image URL from MongoDB
        user.image = null; // Clear the image field
        await user.save(); // Save the updated user document

        
       return res.status(200).send("Profile image removed successfully.");
      } else {
        res.status(400).json({ error: 'Failed to delete image from Cloudinary' });
      }
    } catch (error) {
      console.error("Error deleting profile image:", error);
      res.status(500).json({ error: 'An error occurred while deleting the image' });
    }
  };

  export const createEmployee=async(req,res)=>{
    try{
        const {firstName,lastName,email,mobileNo,designation,gender,course,image}=req.body;
        console.log(req.body);
        if(!email){
            return res.status(400).send("Email is Required");

        }
        const prevEmp=await Employee.findOne({email});
        if(!prevEmp){
            const employee = await Employee.create({firstName,lastName,email,mobileNo,designation,gender,course,image});
           
            return res.status(201).send("Employee Successfully Created")
        }
        return res.status(400).send("Employee Already Exists");
       


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const getIndividualEmployee=async(req,res)=>{
    try{
        const {email}=req.body;
    

        console.log(req.body);
        if(!email){
            return res.status(400).send("Email is Required");

        }
        const prevEmp=await Employee.findOne({email});
       
        return res.status(200).json(prevEmp);
       


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const getAllEmployee=async(req,res)=>{
    try{
        

    
        const prevEmp=await Employee.find({});
       
        return res.status(200).json(prevEmp);
       


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const deleteEmployee=async(req,res)=>{
    try{
        const {email}=req.body;

        console.log(req.body);
        if(!email){
            return res.status(400).send("Email is Required");

        }
        const prevEmp=await Employee.deleteOne({email:email});
        const allEmployee=await Employee.find({});
       
        return res.status(200).json(allEmployee);
       


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const editEmployee=async(req,res)=>{
    try{
        const {firstName,lastName,email,mobileNo,designation,gender,course,image}=req.body;
        console.log(req.body);
       
            const employee = await Employee.findOne({email});
            const updateUser=await Employee.findByIdAndUpdate(employee.id,{
                firstName:firstName,
                lastName:lastName,
                mobileNo:mobileNo,
                designation:designation,
                gender:gender,
                course:course,
                image:image
            })
           console.log("hgasdasf")
        return res.status(200).send("Employee Details Updated Successfully");
       


    }catch(error){
        console.log("<--Error at Signup -->",error);
        return res.status(500).send("Internal Server Error");
    }
}
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            secure: true,
            sameSite: "None"
        });
        console.log("logutr")
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("<--Error at Logout -->", error);
        return res.status(500).send("Internal Server Error");
    }
};
