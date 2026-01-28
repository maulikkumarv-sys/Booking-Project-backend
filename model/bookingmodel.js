const mongoose = require("mongoose")

const bookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    email:{
       type:String,
        required: true,
        unique: true,
      lowercase: true

    },
    phone:{
      type:String,
       required: true
    },
    date: {
      type: String,
      required: true
    },
    startTime: {
      type: String, 
      required: true
    },
    endTime: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled","done"],
      default: "pending"
    },
  },
  { timestamps: true }
)

const bookingmodel = mongoose.model("booking", bookingSchema)
module.exports=bookingmodel
