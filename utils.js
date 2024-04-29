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

export const sendEmails = async(to,subject,message) =>{
    try {
        let transporter = nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.USER,
                pass:process.env.PASSWORD,
            },
        });

        //send emails

        let info = await transporter.sendMail({
            from: process.env.USER,
            to:to,
            subject:subject,
            text:message,
        });
        console.log("Mail sent successfully");
    } catch (error) {
        console.log("Mail not sent");
    }
}


export const sendNotificationEmail = async(userEmail,providerEmail,bookingDetails) =>{
    const subject = ' Your Upcoming Auto Ride Alert';
    const message = `You have a ride scheduled from ${bookingDetails.source} to ${bookingDetails.destination} at ${bookingDetails.time}. `;

    try {
        await sendEmails(userEmail,subject,message);

        await sendEmails(providerEmail,subject,message);
    } catch (error) {
        console.log('Error sending notification emails',error);
    }
}