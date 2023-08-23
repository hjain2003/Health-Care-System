import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { bookApp, seeAllBookings, seeMyBookings } from '../controllers/booking_controller.js';

const bookingRouter = express.Router();

bookingRouter.post('/book',Authenticate,bookApp);
bookingRouter.get('/viewMyBookings',Authenticate, seeMyBookings);
bookingRouter.get('/viewAllBookings',Authenticate, seeAllBookings);

export default bookingRouter;