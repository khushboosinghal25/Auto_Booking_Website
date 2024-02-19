import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    providerId: {
      type: String,
      required: true,
    },
    providerInfo: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    userInfo: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rated:{
      type:Boolean,
      default:false,
    },
    rating:{
      type:Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("bookings", bookingSchema);
