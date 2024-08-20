import { Router}from "express";
import { createUser, getUser, loginUser, logoutUser } from "../controller/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


import { GetCommercialProperties, GetRentProperties, GetSellingProperties } from "../controller/user.controller.js";
import { generateEnquired, generateLead,  } from "../controller/lead.controller.js";


const router = Router()

router.route('/create-user').post(createUser)
router.route('/login').post(loginUser)
router.route('/createLead').get(verifyJWT,generateLead)
router.route('/createEnquired').get(verifyJWT,generateEnquired)
router.route('/logout').get(verifyJWT,logoutUser)

router.route('/getUser').post(verifyJWT,getUser)
router.route('/getSell').post(verifyJWT,GetSellingProperties);
router.route('/getRent').post(verifyJWT,GetRentProperties);
router.route('/getCommercial').post(verifyJWT,GetCommercialProperties)

export default router 

