import mongoose,{Schema} from "mongoose";

const leadSchema = new Schema({
    property:{
        type: Schema.Types.ObjectId,

    }
,
    clicked:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },location:{

    }
},{
    timestamps: true
})

export const Lead = mongoose.model ("Lead", leadSchema)