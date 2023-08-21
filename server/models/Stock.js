import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const stockSchema = new mongoose.Schema({
    medicine: {
        type: String,
    },
    price: {
        type: String,
    },
    quantity :{
        type: Number,
    },
});
  

export default model("Stock", stockSchema);