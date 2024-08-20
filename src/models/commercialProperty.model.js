import mongoose, {Schema} from "mongoose";
const CommercialPropertySchema = new Schema({
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
subscribers:[        {type: Schema.Types.ObjectId,
    ref: "User"}],
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




},{timestamps: true});


export const CommercialProperty = mongoose.model("CommercialProperty", CommercialPropertySchema)