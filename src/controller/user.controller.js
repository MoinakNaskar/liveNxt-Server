
import { Property } from "../models/property.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const GetSellingProperties = asyncHandler(
    async(req,res)=>{
        const {latitude,longitude}= req.body
        console.log(req.body)
        let properties;
         properties = await Property.aggregate([{
            
            
                $geoNear:{
                    near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance: 100000,
                    distanceField: "distanceCalculated",

                    spherical:true
                }},{
            $match:{$and:[{listingType:'Residential'},{lookingFor:'Sell'}]}},

            ])
            if(!properties){
                return res.status(500).json({message:"No Property found near your location"})
            }
        
        res.status(200).json(properties)
    }
)
export const GetRentProperties = asyncHandler(
    async(req,res)=>{
        let {latitude,longitude}= req.body
        const properties =   await Property.aggregate([{
            
            
            $geoNear:{
                near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                key:"location",
                maxDistance: parseFloat(1000)*1609,
                distanceField: "distanceCalculated",
              
                spherical:true
            }},{
        $match:{$and:[{listingType:'Residential'},{lookingFor:'Rent'}]}},

        ])
        console.log(properties)
        res.status(200).json(properties)
    }
)
export const GetCommercialProperties = asyncHandler(
    async(req,res)=>{
        let {latitude,longitude}= req.body
        const properties =  await Property.aggregate([{
            
            
            $geoNear:{
                near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                key:"location",
                maxDistance: parseFloat(1000)*1609,
                distanceField: "distanceCalculated",
              
                spherical:true
            }},{
        $match:{$and:[{listingType:'Commercial'},]}},

        ])
        console.log(properties)
        res.status(200).json(properties)
    }
)

