import mongoose, {Schema} from "mongoose";




const PropertySchema = new Schema({
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
    ref: "User"},reraId:{type: Number}}],
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
            type:String,
        },
        bathroom:{
            type:Number,
        },
        balcony:{
            type:Number,
        },
        furnishedType:{
            type:String,
        },
        societyAmenities:[{type:String}],
        flatFurnishing:[{type:String}],
        coverParking:{type:String},
        openParking:{type:String},


    }],
    transactionType:{type:String},
    constructionType:{type:String},
    propertyAge:{
        type:String
    }




},{timestamps: true});

PropertySchema.index({location:'2dsphere'})


export const Property = mongoose.model("Property", PropertySchema)