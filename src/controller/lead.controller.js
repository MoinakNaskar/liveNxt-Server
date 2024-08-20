import { Lead } from "../models/lead.model.js";
import { Property } from "../models/property.model.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

export const generateLead = asyncHandler(
    async(req,res)=>{
        const propertyId = req.header("propertyId")
        const property = await Property.findById(propertyId);
        if(!property){
            return res.status(400).json({msg:"property not found"})
        }
        const lead = await Lead.aggregate([{
            $match:{"$and":[{property: new mongoose.Types.ObjectId(property._id)} , {clicked: new mongoose.Types.ObjectId(req.user._id)}]}
            
        }
        
    ]);console.log(lead)
        let newLead
        if(lead){
            newLead = await Lead.findByIdAndUpdate(
                lead._id,
                {
                    $set: {
                        property: new mongoose.Types.ObjectId(property._id),
                        clicked : new mongoose.Types.ObjectId(req.user._id),
                        clicked : new mongoose.Types.ObjectId(req.user._id)

                    }
                },
                {new: true}
                
            )
            return res.status(200).json(newLead)
        }
        newLead = await Lead.create({
            property: new mongoose.Types.ObjectId(property._id),
            clicked : new mongoose.Types.ObjectId(req.user._id)
        })
        console.log(newLead)
        if(!newLead){
            return req.status(500).json({message : "something went wrong"})
        }
        res.status(200).json(newLead)

    }
)

export const generateEnquired = asyncHandler(
    async(req,res)=>{
        const propertyId = req.header("propertyId")
        const property = await Property.findById(propertyId);
        if(!property){
            res.status(400).json({msg:'Video not found'})
        }
        const exLead = Lead.aggregate([
            {
                $match:{
                    "property":  new  mongoose.Types.ObjectId(property.__id)
                }
                
            },{
                $match:{
                    "clicked": new  mongoose.Types.ObjectId(req.user._id)
                }
            }
        ])
        let newLead
        if(exLead){
            newLead = await Lead.findByIdAndUpdate(
                exLead._id,
                {
                    $set: {
                        property: new mongoose.Types.ObjectId(property._id),
                        clicked : new mongoose.Types.ObjectId(req.user._id),
                        enquired : new mongoose.Types.ObjectId(req.user._id),

                    }
                },
                {new: true}
                
            )
            return res.status(200).json(newLead)
        }
        newLead = await Lead.create({
            property: new mongoose.Types.ObjectId(property._id),
            clicked : new mongoose.Types.ObjectId(req.user._id),
            enquired : new mongoose.Types.ObjectId(req.user._id)
        })
        if(!newLead){
            return req.status(500).json({message : "something went wrong"})
        }
        res.status(200).json(newLead)

    }
)