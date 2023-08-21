import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./dbconn/conn.js";
import userRouter from "./routes/user_routes.js";
import bookingRouter from "./routes/booking_routes.js";
import recordRouter from "./routes/record_routes.js";
import stockRouter from "./routes/stock_routes.js";


const app =  express();
dotenv.config({ path: './config.env' });

//db
connectDB();

//middlewares
app.use(express.json());
app.use('/user',userRouter);
app.use('/booking',bookingRouter);
app.use('/record',recordRouter);
app.use('/stock',stockRouter);

app.get('/', (req, res) => {
    res.send(`Hello world app`);
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server up and running  at ${PORT}`);
});