import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { login, logout, resetPassword, signup, userDetails } from '../controllers/user_controller.js';

const userRouter = express.Router();

userRouter.post('/register',signup);
userRouter.post('/login',login);
userRouter.get('/getUserData',Authenticate,userDetails);
userRouter.get('/logout',logout);
userRouter.post('/resetPassword', resetPassword);
export default userRouter;