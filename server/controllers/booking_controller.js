import Booking from "../models/Booking.js";
import User from "../models/User.js";

export const bookApp = async (req, res) => {
    try {
        const { date, remarks } = req.body;
        const user = req.rootUser;

        if (!date || !remarks) {
            return res.status(422).json({ error: "empty fields!" });
        }

        if (user.role !== 'patient') {
            return res.status(403).json({ error: "You are not authorized to book appointments" });
        }

        // Create a new booking
        const booking = new Booking({
            date,
            time:'Not confirmed yet',
            remarks,
            bookedOrNot: 'No',
            user: user._id,
        });

        await booking.save();

        user.bookingCount+=1;
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
        const user = req.rootUser;
        if (user.role !== 'doctor') {
            return res.status(403).json({ error: "You are not authorized to see all appointments" });
        }

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

        // Remove the booking from the User schema's bookings array
        await User.updateOne({ _id: user._id }, { $pull: { bookings: bookingId } });

        // Delete the booking from the Booking collection
        await Booking.findByIdAndDelete(bookingId);

        user.cancelledBookingCount += 1; // Increment the canceled appointment count
        await user.save();

        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};

export const confirmBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { time } = req.body; // Time input from the doctor
        const user = req.rootUser;

        if (user.role !== 'doctor') {
            return res.status(403).json({ error: "You are not authorized to book appointments" });
        }

        if(!time){
            return res.status(422).json({ error: "empty fields!" });
        }

        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        booking.bookedOrNot = time; 
        booking.time = time; 
        await booking.save();

        return res.status(200).json({ message: 'Booking confirmed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
};