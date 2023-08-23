import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

//patient will only write the date and the remarks
//after doctor accepts a patient's booking, a new window will pop up that will prompt the doctor to input a time. aFTER the doctor enters the time and presses OK, the booking card on the atient's side will show a confirmed status with the time given by the doctor.
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
});
  

export default model("Booking", bookingSchema);