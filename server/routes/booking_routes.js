import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { bookApp, cancelBooking, confirmBooking, seeAllBookings, seeMyBookings } from '../controllers/booking_controller.js';

const bookingRouter = express.Router();

bookingRouter.post('/book',Authenticate,bookApp);
bookingRouter.get('/viewMyBookings',Authenticate, seeMyBookings);
bookingRouter.get('/viewAllBookings',Authenticate, seeAllBookings);
bookingRouter.delete('/cancelBooking/:bookingId',Authenticate,cancelBooking);
bookingRouter.put('/confirmBooking/:bookingId', Authenticate, confirmBooking);


export default bookingRouter;