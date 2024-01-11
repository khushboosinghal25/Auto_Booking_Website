import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    autonumber: {
      type: String,
      required: true,
    },

    availabilityTime: {
      type: String,
    },

    capacity: {
      type: Number,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },

    role: {
      type: Number,
      default: 2,
    },

    license: {
      data: Buffer,
      contentType: String,
    
    },

    notification:{
      type:Array,
      default:[],
   },
   seennotification:{
      type:Array,
      default:[],
   },
  },
  { timestamps: true }
);

export default mongoose.model("providers", providerSchema);
