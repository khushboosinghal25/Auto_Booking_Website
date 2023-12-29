import JWT from "jsonwebtoken"
import studentModel from "../models/studentModel.js"
import ProviderModel from "../models/ProviderModel.js"

export const requireSignIn = async(req,res,next)=>{
    try {
     const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
     req.user = decode;
     next();
    } catch (error) {
     console.log(error)
    }
 }

 //admin access

export const isAdmin = async (req,res,next)=>{
    try {
     const user = await studentModel.findById(req.user._id)
     if(user.role !== 2){
         return res.status(401).send({
             success:false,
             message:'UnAuthorized Access'
         })
     } else{
         next();
     }
    } catch (error) {
       console.log(error)
       res.status(401).send({
         success:false,
         error,
         message:'Error in admin middleware',
       })
    }
 }