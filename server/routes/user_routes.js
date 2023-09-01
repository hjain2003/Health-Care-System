import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { getBookingStatistics, login, logout, resetPassword, signup, userDetails } from '../controllers/user_controller.js';

const userRouter = express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.get('/getUserData',Authenticate,userDetails);
userRouter.get('/logout',logout);
userRouter.post('/resetPassword', resetPassword);
userRouter.get('/bookingStatistics', Authenticate, getBookingStatistics);
export default userRouter;