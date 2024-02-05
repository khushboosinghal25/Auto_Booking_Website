import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"students",
        required:true
      },
      token:{
        type:String,
        required:true,
      }
    },
    { timestamps: true }
  );
  
  export default mongoose.model("tokens", tokenSchema);
  