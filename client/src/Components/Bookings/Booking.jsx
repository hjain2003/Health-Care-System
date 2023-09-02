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
  console.log(bookingsData);

  

  useEffect(() => {
    const token = localStorage.getItem('jwtoken');
  
    const fetchBookingsData = async () => {
      try {
        const response = await fetch(
          isDoctor ? 'http://localhost:5000/booking/viewAllBookings' : 'http://localhost:5000/booking/viewMyBookings',
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
          console.log('Data received:', data); // Add this console log
          setBookingsData(data.bookings);
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

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setIsDoctor(userRole === 'doctor');
  }, []);
  

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
              disabled // Disable the input field to make it non-functional
            />
            <button className='search-button' disabled>Search</button>
          </div>
        )}

        {bookingsData.map(booking => (
          isDoctor ? (
            <DBookingsCard key={booking._id} date={booking.date} time={booking.time} user={booking.user[0].name} remarks={booking.remarks} />
          ) : (
            <BookingsCard key={booking._id} date={booking.date} time={booking.time} remarks={booking.remarks} />
          )
        ))}
      </div>
    </div>
  );
}

export default Booking;
