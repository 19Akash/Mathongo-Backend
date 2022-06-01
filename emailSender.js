require('dotenv').config();
const nodemailer=require('nodemailer');


const emailSender=(otp)=>{
let transport = nodemailer.createTransport({
    host:"smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
 });

 transport.verify((error,success)=>{
     if(error)
     {
         console.log(error);
     }
     else{
         console.log("Ready for message");
     }
 })

 const mailOptions = {
    from: 'akashsh215@gmail.com', 
    to: 'aksharma1998aksharma@gmail.com', 
    subject: 'Email OTP Veriication', 
    html: `<h2 style="color:#ff6600;">Hello People!, ${otp} Welcome to Bacancy!</h2>`
   
};


transport.sendMail(mailOptions, function(err, info) {
   if (err) {
     console.log(err)
   } else {
     console.log(info);
   }
});
console.log(otp);
}

module.exports={
    emailSender:emailSender,
}