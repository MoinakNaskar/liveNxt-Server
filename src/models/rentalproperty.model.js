import mongoose, {Schema} from "mongoose";




const RentalPropertySchema = new Schema({
    name:{
        required: true,
        type: String,
        trim: true
    },
    description:{
        required: true,
        type: String,
    },


    address:{
        type: String,
        required: true
    },
    locality:{
        type: String,
        required: true
    },
 listingType:{
        type: String,
        required: true,
    },
lookingFor:{
    type: String,
        required: true,
},
subscribers:[  {id:{type: Schema.Types.ObjectId,
    ref: "User"}}],
    price:{
        type:Number,
        required: true
    },
    images:[
        {
            type: String,
            default: ''

        }
    ],
    builder:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    propertyType:{
        type: String,
        required: true,
    },
    buildUpArea:{
        type: Number,
        required: true,
    },
    carpetArea:{
        type: Number,
        required: true,
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]

    },
    details:[{
        BHK:{
            type:String,required:true
        },
        bathroom:{
            type:Number,required:true
        },
        balcony:{
            type:Number,required:true
        },
        furnishedType:{
            type:String,required:true
        },
        societyAmenities:[{type:String,required:true}],
        flatFurnishing:[{type:String,required:true}],
        coverParking:{type:String,required:true},
        openParking:{type:String,required:true},


    }],
propertyAge:{
    type:String,required:true
}




},{timestamps: true});



export const RentalProperty= mongoose.model("RentalProperty", RentalPropertySchema)