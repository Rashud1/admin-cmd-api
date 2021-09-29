import mongoose from "mongoose";
//fname,lname,dob,email,phone,password address,gender, role,



const UserSchema = mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: "active",
    },
        
        lname: {
        type: String,
        required: true,
        default: "",
        max: 20,
    },
        dob: {
        type: Date,
        default: "",
        max: 20,
    },
        email: {
        type: String,
        required: true,
        default: "",
        max: 50,
        unique: true,
        index: 1,
    },
        isEmailConfirmed: {
        type: Boolean,
        required: true,
        default: false,
    },
        phone: {
        type: String,
        required: true,
        default: "",
        max: 15,
    },
        password: {
        type: String,
        required: true,
        default: "",
        min: 8,
        
    }, 
        address: {
        type: String,
        max: 100,
    }, 
        gender: {
        type: String,
    }, 
        role: {
        type: String,
        required: true,
        default: "user",
    },
    refreshJWT:{
        type: String,
        
        default: "",

    }
},
  {
timestamp: true,
  }
);
const user = mongoose.model("User", UserSchema); 

export default user;