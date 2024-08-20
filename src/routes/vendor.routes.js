import { Router}from "express";
import { verifyVendor } from "../middlewares/vendor.middleware.js";
import {  listNewCommercialProperty, listNewForSellProperty, listRentalProperty, } from "../controller/vendor.controller.js";


const router = Router()
router.route('/list-new-property-commercial').post(verifyVendor,listNewCommercialProperty)
router.route('/list-new-property-for-sell').post(verifyVendor,listNewForSellProperty)
router.route('/list-new-property-rental').post(verifyVendor,listRentalProperty)

export default router;
