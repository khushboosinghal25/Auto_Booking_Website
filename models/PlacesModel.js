import mongoose from "mongoose";

const PlacesSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true,
    },
    slug:{
        type:String,
        lowercase:true
    }
},
{ timestamps: true })

export default mongoose.model("Place",PlacesSchema)