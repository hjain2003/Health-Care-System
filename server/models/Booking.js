import mongoose, { model } from "mongoose";

const bookingSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    time: {
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
});

export default model("Booking", bookingSchema);
