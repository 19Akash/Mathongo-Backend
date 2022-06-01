require('dotenv').config();
const express =require('express');
const app=express();
const cors=require('cors');
const {emailSender}=require('./emailSender')
var bodyParser  = require('body-parser');
const db =require('./db')
app.use(cors());
app.use(bodyParser.json());
db.db();
app.listen(1000,()=>{
    console.log("server is listening at 1000");
})



let user={};



let otp=0;
app.post('/signup',async(req,res)=>{
    otp=Math.floor(100000 + Math.random() * 900000);
    emailSender(otp);
    user=await db.User.findOne({'email':req.body.email});
    if(user)
    {
        res.json({
            messege:"user is already created"
        })
    }
    else{
        user=req.body;
        res.json({
            messege:"please verify otp"
        })
    }
   
})


app.post('/verify',async (req,res)=>{
    if(req.body.otp===otp)
    {
       const data = await db.User.create(user);
       res.json({
           data:data,
           messege:"User is created"
       })
    }
    else{
        res.json({
            messege:"User not created"
        })
    }
})



app.get('/login',async(req,res)=>{
    try{
        const user=await db.User.findOne({"email":req.body.email});
        if(user)
        {
            res.json({
                data:user,
                messege:"login successfull"
            })
        }
        else{
            res.json({
                messege:"User not register, please register"
            })
        }
    }
    catch(error){
        res.json({
            message:error.message
        })
    }
})






