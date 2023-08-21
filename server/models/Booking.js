import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    remarks :{
        type: String,
    },
    bookedOrNot:{
        type: String,
    },
    user:[{
        type : mongoose.Types.ObjectId,
        ref: "User"
    }],
    stock:[{
        type : mongoose.Types.ObjectId,
        ref: "Stock"
    }],
    tokens : [
        {
            token:{
                type:String,
                required :true
            }
        }
    ],
});
  

export default model("Booking", bookingSchema);