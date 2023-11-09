import mongoose, { model } from "mongoose";

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    timeSlot: {
        type: String,
    },
    remarks: {
        type: String,
    },
    bookedOrNot: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    canceledBy:{
        type:String
    }
});

export default model("Booking", bookingSchema);
