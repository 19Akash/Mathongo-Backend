require('dotenv').config();
const mongoose = require('mongoose');

 const Db= ()=>{
    const connectionParam ={
        useNewUrlParser:true,
        useUnifiedTopology:true
    }
    mongoose.connect(process.env.DB,connectionParam)
    .then((db)=>{
       console.log("db conected")
    })
    .catch((err)=>{
        console.log(err)
    })
}

const userScema=mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    

})
const User = mongoose.model("user",userScema);

module.exports={
      db:Db,
      User:User
  }