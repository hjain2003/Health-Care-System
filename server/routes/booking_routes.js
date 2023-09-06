import express from 'express';
import { Authenticate } from '../middlewares/auth.js';
import { bookApp, cancelBookingByDoctor, cancelBookingByPatient, confirmBooking, seeAllBookings, seeMyBookings } from '../controllers/booking_controller.js';

const bookingRouter = express.Router();

bookingRouter.post('/book',Authenticate,bookApp);
bookingRouter.get('/viewMyBookings',Authenticate, seeMyBookings);
bookingRouter.get('/viewAllBookings',Authenticate, seeAllBookings);
bookingRouter.delete('/cancelBookingByPatient/:bookingId',Authenticate,cancelBookingByPatient);
bookingRouter.delete('/cancelBookingByDoctor/:bookingId',Authenticate,cancelBookingByDoctor);
bookingRouter.post('/confirmBooking/:bookingId', Authenticate, confirmBooking);


export default bookingRouter;