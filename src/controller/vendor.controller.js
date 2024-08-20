
import {  Property, } from "../models/property.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";





export const listNewCommercialProperty = asyncHandler(
    async(req,res)=>{
        const {name,address,description,price,locality,images,listingType,lookingFor,propertyType,buildUpArea,carpetArea,longitude,latitude}=req.body
        if(!(name&&address&&description&&price&&locality&&listingType&&lookingFor&&propertyType&&buildUpArea&&carpetArea&&longitude&&latitude)){
            return res.status(400).json({msg:"all fields are required"})
        }
        const commercialProperty = await Property.create({
            name,
            address,
            description,
            price,
            subscribers:[req.user._id],
            listingType,
            images: images,
            locality,
            lookingFor,
            propertyType,
            buildUpArea,
            carpetArea,
            location:{
                type:'Point',
                coordinates :[parseFloat(longitude),parseFloat(latitude)]
            }

        })
        const foundProperty =  await Property.findById(commercialProperty._id)
        return res.status(200).json(foundProperty)
    })

export const listNewForSellProperty = asyncHandler(
    async(req,res)=>{
        const {name,address,description,price,locality,images,listingType,lookingFor,propertyType,buildUpArea,carpetArea,longitude,latitude,BHK,bathroom,balcony,furnishedType,societyAmenities,flatFurnishing,coverParking,openParking,transactionType,constructionType,reraId}=req.body
        if(!(name&&address&&description&&price&&locality&&listingType&&lookingFor&&propertyType&&buildUpArea&&carpetArea&&longitude&&latitude&&BHK&&bathroom&&balcony&&furnishedType&&coverParking&&openParking&&transactionType&&constructionType)){
            return res.status(400).json({msg:"all fields are required"})
        }
        const forSellProperty = await Property.create({
            name,
            address,
            description,
            price,
            subscribers:[{id:req.user._id,reraId: reraId}],
            listingType,
            images: images,
            locality,
            lookingFor,
            propertyType,
            buildUpArea,
            carpetArea,
            location:{
                type:'Point',
                coordinates :[parseFloat(longitude),parseFloat(latitude)]
            },
            details:[{
                BHK,
                bathroom,
                balcony,
                furnishedType,
                societyAmenities,
                flatFurnishing,
                coverParking,
                openParking,
            
            }],
            transactionType,
            constructionType


        })
        console.log(forSellProperty);
        const foundProperty =  await Property.findById(forSellProperty._id)
        return res.status(200).json(foundProperty)
    })
    export const listRentalProperty = asyncHandler(
        async(req,res)=>{
            const {name,address,description,price,locality,images,listingType,lookingFor,propertyType,buildUpArea,carpetArea,longitude,latitude,BHK,bathroom,balcony,furnishedType,societyAmenities,flatFurnishing,coverParking,openParking,propertyAge}=req.body
            if(!(name&&address&&description&&price&&locality&&listingType&&lookingFor&&propertyType&&buildUpArea&&carpetArea&&longitude&&latitude&&BHK&&bathroom&&balcony&&furnishedType&&coverParking&&openParking&&propertyAge)){
                return res.status(400).json({msg:"all fields are required"})
            }
            const rentalProperty = await Property.create({
                name,
                address,
                description,
                price,
                subscribers:[{id:req.user._id}],
                listingType,
                images: images,
                locality,
                lookingFor,
                propertyType,
                buildUpArea,
                carpetArea,
                location:{
                    type:'Point',
                    coordinates :[parseFloat(longitude),parseFloat(latitude)]
                },
                details:[{
                    BHK,
                    bathroom,
                    balcony,
                    furnishedType,
                    societyAmenities,
                    flatFurnishing,
                    coverParking,
                    openParking,
                
                }],
                propertyAge
            })
            console.log(rentalProperty);
            const foundProperty =  await Property.findById(rentalProperty._id)
            return res.status(200).json(foundProperty)
        })
    

