
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String , require:true},
    email : {type : String , require:true , unique:true},
    password: {type : String , require:true},
    verifyOtp: {type : String , require:true},
    verifyOtpExpiredAt: {type : Number , default:0},
    isAccountVerified: {type : Boolean, default:false},
    resetOtp: {type : String , default:''},
    resetOtpExpireAt: {type : Number , default:0},


})

const usermodel = mongoose.model("user" , userSchema)

export default usermodel