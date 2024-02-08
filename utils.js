import dotenv from "dotenv"
dotenv.config();
import nodemailer from "nodemailer"
export const verifmail = async(email,link)=>{
    try{
        let transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.USER,
                pass:process.env.PASSWORD,
            }
        })
        //send email 
        let info = await transporter.sendMail({
            from:process.env.USER,
            to:email,
            subject:"Account Verification",
            text:"Welcome",
            html:`
            <div>
            <a href=${link}>Click here to activate your account</a>
            </div>
            `
        })
        console.log("mail send successfully");

    }catch(error){
        console.log(error,"mail failed to send")
    }
}
export const sendEmail = async(to,message) =>{
   try {
    let transporter = nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:process.env.USER,
            pass:process.env.PASSWORD,
        }
    })
    //send email 
    let info = await transporter.sendMail({
        from:process.env.USER,
        to:to,
        subject:"Account Blocked Alert",
        text:message,
       
    })
    console.log("mail send successfully");
   } catch (error) {
    console.log(error,"mail not send")
   }
}