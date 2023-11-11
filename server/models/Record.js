import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const recordSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    disease:{
        type:String,
    },
    prescription :{
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
});
  

export default model("Record", recordSchema);