import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password :{
        type: String,
    },
    cpassword :{
        type: String
    },
    phone:{
        type: String
    },
    role:{
        type: String
    },
    bookings:[{
        type : mongoose.Types.ObjectId,
        ref: "Booking"
    }],
    records:[{
        type : mongoose.Types.ObjectId,
        ref: "Record"
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


userSchema.methods.generateAuthToken = async function() {
    try {
      let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
        expiresIn: '30d'
      });
      this.tokens = this.tokens.concat({ token: token });
      
      if (this.tokens.length > 5) {
        this.tokens = this.tokens.slice(-5);
      }
      
      await this.save();
      return token;
    } catch (err) {
      console.log(err);
    }
  }
  

export default model("User", userSchema);
//users