import React, { useEffect, useState } from 'react';
import './Booking.css';
import Navbar from '../Navbar/Navbar';
import BookingsCard from './BookingsCard/BookingsCard';
import DBookingsCard from './DBookingsCard/DBookingsCard';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [isDoctor, setIsDoctor] = useState(true);
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setIsDoctor(userRole === 'doctor');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwtoken');

    const fetchBookingsData = async () => {
      try {
        const response = await fetch(
          isDoctor
            ? 'http://localhost:5000/booking/viewAllBookings'
            : 'http://localhost:5000/booking/viewMyBookings',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (isDoctor) {
            const doctorAppointments = data.bookings.filter(
              (booking) => booking.canceledBy !== 'doctor'
            );
            setBookingsData(doctorAppointments);
          } else {
            setBookingsData(data.bookings);
          }
        } else {
          console.error('Failed to fetch bookings data');
        }
      } catch (error) {
        console.error('An error occurred while fetching bookings data:', error);
        navigate('/login');
      }
    };

    fetchBookingsData();
  }, [isDoctor, navigate]);

  return (
    <div className='booking-container'>
      <Navbar />
      <div className='bookings-content'>
        <div className='booking-header'>YOUR BOOKINGS</div>

        {isDoctor && (
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search names...'
              className='stocks-search-input'
              disabled
            />
            <button className='search-button' disabled>
              Search
            </button>
          </div>
        )}

        {bookingsData.map((booking) => {
          if (isDoctor && booking.canceledBy === 'doctor') {
            return null;
          } else if (!isDoctor && booking.canceledBy === 'patient') {
            return null;
          } else {
            return isDoctor ? (
              <DBookingsCard
                key={booking._id}
                bookingId={booking._id}
                date={booking.date}
                timeSlot={booking.timeSlot}
                user={booking.user.name}
                userId ={booking.user._id}
                remarks={booking.remarks}
              />
            ) : (
              <BookingsCard
                key={booking._id}
                bookingId={booking._id}
                date={booking.date}
                timeSlot={booking.timeSlot}
                remarks={booking.remarks}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default Booking;
