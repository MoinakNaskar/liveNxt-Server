import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";



const userSchema = new Schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    email:{
        unique: true,
        required: true,
        type: String,
        trim: true,
        validate:{
            validator: (value)=>{
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message:"Please enter a valid email address"
        }
    },
    password:{
        required: true,
        type: String,
        validate:{
            validator: (value)=>{
                return value.length>6;
            },
            message:"Please enter a strong password"
        }
    },
    address:{
        type: String,
        default: '',
    },
    
    location:{
        type:{type:String,required:true},
        coordinates:[]

    },
    reraNumber:{type:Number},
    type:{
        type: String,
        default: 'user'
    },
    refreshToken :{
        type : String
    }
},{timestamps: true});
userSchema.index({location:'2dsphere'})
userSchema.pre("save", async function(next){
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10)
    next ()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName : this.userName,
        fullName : this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)