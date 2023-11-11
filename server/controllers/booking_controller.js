import Booking from "../models/Booking.js";
import User from "../models/User.js";
import nodemailer from "nodemailer"
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});

export const bookApp = async (req, res) => {
  try {
      const { date, timeSlot, remarks } = req.body;
      const user = req.rootUser;

      if (!date || !timeSlot || !remarks) {
          return res.status(422).json({ error: "Please select a date and time slot" });
      }

      if (user.role !== 'patient') {
          return res.status(403).json({ error: "You are not authorized to book appointments" });
      }

      const existingAppointment = await Booking.findOne({
          user: user._id,
          bookedOrNot: 'Yes',
      });

      if (existingAppointment) {
          return res.status(400).json({ error: "You already have a confirmed appointment" });
      }

      const existingBookings = await Booking.find({
          date,
          timeSlot,
          bookedOrNot: 'Yes',
      });

      if (existingBookings.length >= 2) {
          return res.status(400).json({ error: "This time slot is already fully booked" });
      }

      const booking = new Booking({
          date,
          timeSlot,
          remarks,
          bookedOrNot: 'Yes',
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

    const bookingsWithUserName = bookings
      .filter(booking => booking.time !== 'Cancelled')
      .map(booking => ({
        _id: booking._id,
        date: booking.date,
        timeSlot: booking.timeSlot,
        remarks: booking.remarks,
        bookedOrNot: booking.bookedOrNot,
        user: booking.user.name,
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

      const booking = await Booking.findById(bookingId);
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (booking.user.toString() !== user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this booking' });
      }
      
      booking.canceledBy = 'patient';

      await User.updateOne({ _id: user._id }, { $pull: { bookings: bookingId } });
      
      await booking.save();
   
      await Booking.findByIdAndDelete(bookingId);
  
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

    const booking = await Booking.findById(bookingId).populate('user', 'email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (user.role !== 'doctor' || booking.canceledBy === 'patient') {
      return res.status(403).json({ message: 'You are not authorized to cancel this booking' });
    }

    booking.canceledBy = 'doctor';
    booking.timeSlot = 'Cancelled';
    await booking.save();

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



// export const confirmBooking = async (req, res) => {
//     try {
//         const bookingId = req.params.bookingId;
//         const { time } = req.body; // Time input from the doctor
//         const user = req.rootUser;

//         if (user.role !== 'doctor') {
//             return res.status(403).json({ error: "You are not authorized to book appointments" });
//         }

//         if (!time) {
//             return res.status(422).json({ error: "empty fields!" });
//         }

//         const booking = await Booking.findById(bookingId).populate('user','email');

//         if (!booking) {
//             return res.status(404).json({ message: 'Booking not found' });
//         }

//         booking.bookedOrNot = time;
//         booking.time = time;
//         await booking.save();

//         const recipientEmail = booking.user.email;

//         if (!recipientEmail) {
//           return res.status(400).json({ message: 'Booking user email not found' });
//         }

//         // Send an email to the patient
//         const transporter = nodemailer.createTransport({
//             service: 'Gmail',
//             auth: {
//                 user: 'harshjainn2003@gmail.com', 
//                 pass: process.env.EMAIL_PASS, 
//             },
//         });

//         const mailOptions = {
//             from: 'harshjainn2003@gmail.com',
//             to: recipientEmail,
//             subject: 'Appointment Confirmation',
//             text: `Your appointment is confirmed for ${time} on ${booking.date}`,
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ error: 'An error occurred while sending an email' });
//             } else {
//                 console.log('Email sent:', info.response);
//                 return res.status(200).json({ message: 'Booking confirmed successfully' });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'An error occurred' });
//     }
// };


// export const checkBookingStatus = async (req, res) => {
//   try {
//     const bookingId = req.params.bookingId;

//     const booking = await Booking.findById(bookingId);

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     const bookedOrNot = booking.bookedOrNot;

//     return res.status(200).json({ bookedOrNot });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred' });
//   }
// };
