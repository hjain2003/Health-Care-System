import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const bookApp = async (req, res) => {
    try {
        const { date, remarks } = req.body;
        const user = req.rootUser;

        if (!date || !remarks) {
            return res.status(422).json({ error: "empty fields!" });
        }

        // Create a new booking
        const booking = new Booking({
            date,
            remarks,
            bookedOrNot: 'No',
            user: user._id,
        });

        await booking.save();

        user.bookings.push(booking._id);
        await user.save();

        return res.status(201).json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

export const seeAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user', 'name');

        if (!bookings) {
            return res.status(404).json({ message: 'No bookings found' });
        }

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

export const seeMyBookings = async (req, res) => {
    try {
        const user = req.rootUser;

        const bookings = await Booking.find({ user: user._id });

        if (!bookings) {
            return res.status(404).json({ message: 'No bookings found for this user' });
        }

        return res.status(200).json({ bookings });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const user = req.rootUser; 
        const bookingId = req.params.bookingId; 

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        if (booking.user.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
        }

        user.bookings.pull(booking._id);
        await user.save();

        await Booking.findByIdAndDelete(bookingId);

        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};