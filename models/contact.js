import mongoose from "mongoose";

const ContactSchema= mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type: String,
    required:true
  },
  phone:{
    type: String,
    required:true,
    unique: true
  },
  address:{
    type: String,
    required:true
  },
  postedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }
})

const ContactModel = mongoose.model("Contacts",ContactSchema);

export { ContactModel }