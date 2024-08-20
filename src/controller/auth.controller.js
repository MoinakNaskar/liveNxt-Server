
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
const generateAccessAndRefreshToken = async(userId ,res)=>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave : false})
        return {accessToken, refreshToken}

    }catch(err){
       res.json({"error" : err.message})    }}

      export const logoutUser = asyncHandler(
        async (req, res) =>{
            User.findByIdAndUpdate(
                req.user._id,{
                    $set : {
                        refreshToken: undefined
                    }
                },
                    {
                        new: true
                    }
            )
            const options = {
                httpOnly: true ,
                secure: true
    
            }
            return res
            .status(200)
            .clearCookie("accessToken" , options)
            .clearCookie("refreshToken",  options)
            .json(
                "User logged Out"
        )
    
        }
    )
export const createUser = asyncHandler(
    async(req,res) =>{
    const{name,email,password,latitude,longitude}= req.body;

try {
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg: "email is existing "})
        }
        const user = await User.create({
            email,
            password,
            name,
            location:{
                type:'Point',
                coordinates:[parseFloat(longitude),parseFloat(latitude)]
            }
        })
        const createdUser = await User.findById(user._id).select("-password")
        if(!createdUser){
            throw new ApiError(500,"something went wrong")
        }
        return res.status(200).json(
            createdUser
        );
   
     } catch (err) {
        return res.status(500).json({error: err.message})
        
     }
    }
)

export const loginUser = asyncHandler(
    async(req,res)=>{
        const {email , password,latitude,longitude} = req.body;
        if(!email){
            return res.status(400).json({"msg": "please enter email Id"})
        }
        const user = await User.findOne({email})
        console.log(user)
        if(!user){
            return res.status(400).json({msg: "no user with this email-id please create an account "})
        }
        const isPasswordCorrect =  await user.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.status(400).json({msg: "Wrong User Cradential"})
        }
        const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id,res);
        console.log(accessToken,refreshToken)
        const loginUser = await User.findByIdAndUpdate(user._id,{
            $set:{
                location:{
                    type:'Point',
                        coordinates:[parseFloat(longitude),parseFloat(latitude)]
                }
            }},{
                new:true
            }
        ).select(" -refreshToken")
        const options = {
            httpOnly : true ,
            secure : true
        }
        return res
    .status(200)
    .cookie("accessToken", accessToken , options)
    .cookie("refreshToken", refreshToken, options)
    .json({accessToken , refreshToken , ...loginUser._doc})



    }
)

export const getUser = asyncHandler(
    async(req,res)=>{
        let {longitude,latitude}=req.body
        let  updatedUser = await User.findByIdAndUpdate(req.user._id,{
            $set:{
                location:{
                    type:'Point',
                    coordinates:[parseFloat(longitude),parseFloat(latitude)]
                }
            }},{
                new:true
            })
            console.log(updatedUser)
        return res.status(200).json({...updatedUser._doc , accessToken :req.token});
    }
)
