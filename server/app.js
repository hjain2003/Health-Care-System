import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./dbconn/conn.js";

const app =  express();
dotenv.config({ path: './config.env' });

//db
connectDB();

//middlewares
app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server up and running  at ${PORT}`);
});