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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setIsDoctor(userRole === 'doctor');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwtoken');

    const fetchBookingsData = async () => {
      try {
        setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    fetchBookingsData();
  }, [isDoctor, navigate]);

  const filteredBookings = isDoctor
  ? bookingsData.filter((booking) =>
      booking.user && booking.user.name && booking.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : bookingsData;

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='search-button' disabled>
              Search
            </button>
          </div>
        )}

        {loading ? (
            <div className="loading-message">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="no-results-message">No bookings found...</div>
          ) : (
            filteredBookings.map((booking) => {
              // Check canceledBy field only for doctor's view
              if (isDoctor) {
                // Exclude bookings canceled by the doctor
                if (booking.canceledBy === 'doctor') {
                  return null;
                } else {
                  // For other cases (not canceled by doctor), show the booking
                  return (
                    <DBookingsCard
                      key={booking._id}
                      bookingId={booking._id}
                      date={booking.date}
                      timeSlot={booking.timeSlot}
                      user={booking.user ? booking.user.name : 'Unknown Patient'}
                      userId={booking.user ? booking.user._id : null}
                      remarks={booking.remarks}
                    />
                  );
                }
              } else {
                // For patient's view, show the booking
                return (
                  <BookingsCard
                    key={booking._id}
                    bookingId={booking._id}
                    date={booking.date}
                    timeSlot={booking.timeSlot}
                    remarks={booking.remarks}
                  />
                );
              }
            })
          )}
      </div>
    </div>
  );
};

export default Booking;
