import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config({path:"./config/.env"})

const connection =()=>{
  try{
    mongoose.connect(process.env.URI);
    console.log("database connected")
  }catch(err){
    console.log("error is" + err.message)
  }
}

connection()