import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        const conn = mongoose.connect((process.env.DATABASE),{})
        if(conn){
            console.log(`db connection successfull`);
        }
        else{
            console.log("connection failed");
        }
    }catch(err){
        console.log(err);
    }
}