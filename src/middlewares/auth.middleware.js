import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const verifyJWT = asyncHandler(
    async(req, res,next)=>{
try {
            const token = req.cookies?.accessToken || req.header("x-access-token")
            if(!token){
                return res.status(400).json(false)
            }

            const decodeToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET )
            
            const user = await User.findById(decodeToken?._id)
            if(!user){
                return res.status(400).json({"msg": "accessToken expired"})
    
            }
    
            req.user = user;
            req.token = token ;
            next()
} catch (error) {
    res.status(500).json({"msg": error.message})
}

    }
)