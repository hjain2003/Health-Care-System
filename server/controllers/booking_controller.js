import Booking from "../models/Booking.js";
import User from "../models/User.js";
import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});

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
            time: 'Not confirmed yet',
            remarks,
            bookedOrNot: 'No',
            user: user._id,
        });

        await booking.save();

        user.bookingCount += 1;
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

    // Filter out appointments with time set as "Cancelled"
    const bookingsWithUserName = bookings
      .filter(booking => booking.time !== 'Cancelled')
      .map(booking => ({
        _id: booking._id,
        date: booking.date,
        time: booking.time,
        remarks: booking.remarks,
        bookedOrNot: booking.bookedOrNot,
        user: booking.user.name, // Populate the name of the user who booked the appointment
      }));

    return res.status(200).json({ bookings: bookingsWithUserName });
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

export const cancelBookingByPatient = async (req, res) => {
    try {
      const user = req.rootUser;
      const bookingId = req.params.bookingId;
  
      // Find the booking by ID
      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      // Check if the logged-in user is the owner of the booking
      if (booking.user.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this booking' });
      }
      
      booking.canceledBy = 'patient';

      // Remove the booking from the User schema's bookings array
      await User.updateOne({ _id: user._id }, { $pull: { bookings: bookingId } });
      
      await booking.save();
      // Delete the booking from the Booking collection
      await Booking.findByIdAndDelete(bookingId);
  
      // Increase the cancelled booking count
      user.cancelledBookingCount += 1;
      await user.save();
  
      return res.status(200).json({ message: 'Booking deleted by patient successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  };

  
export const cancelBookingByDoctor = async (req, res) => {
  try {
    const user = req.rootUser;
    const bookingId = req.params.bookingId;

    // Find the booking by ID and populate the user's email
    const booking = await Booking.findById(bookingId).populate('user', 'email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the logged-in user is a doctor and if the booking is not already canceled by the patient
    if (user.role !== 'doctor' || booking.canceledBy === 'patient') {
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }

    // Set the canceledBy field to indicate it's canceled by the doctor
    booking.canceledBy = 'doctor';
    booking.time = 'Cancelled';
    await booking.save();

    // Send an email to the patient
    const recipientEmail = booking.user.email;

    if (!recipientEmail) {
      return res.status(400).json({ message: 'Booking user email not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'harshjainn2003@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'harshjainn2003@gmail.com',
      to: recipientEmail,
      subject: 'Booking Cancellation by Doctor',
      text: `Your booking for ${booking.date} has been cancelled by the doctor.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });

    return res.status(200).json({ message: 'Booking canceled by doctor successfully' });
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

        if (!time) {
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

// Import necessary modules and models at the top

export const checkBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Fetch the booking by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Extract the bookedOrNot status from the booking
    const bookedOrNot = booking.bookedOrNot;

    return res.status(200).json({ bookedOrNot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};
