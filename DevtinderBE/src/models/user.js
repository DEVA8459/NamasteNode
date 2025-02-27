const mongoose = require("mongoose");
var validator = require('validator'); 

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
    required:true,
    minLength:4 ,
    maxLength:50,
  },
  lastName: {
    type: String,
    
  },
  emailId: {
    type: String,
    lowercase:true,
    required:true,
    unique:true,
    trim:true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("invalid Email adrress : " + value)
      }
    }
  },
  password: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    min:18,

  },  
  gender: {
    type: String,
    validate(value){
      if(!["male","female" ,"other"].includes(value)){
        throw new Error("gender data not  valid")
      } 
    }
  },
  photoUrl:{
    type: String,
    default:"https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg",
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("invalid PHOTO urL : " + value)
      }
    }
  }, 
  about:{
    type: String ,
    default:"this is a default value"
  },
  skills:{
    type:[String] ,
  }

} ,{timestamps:true});

module.exports = mongoose.model("user", userschema);
