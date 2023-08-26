import React from 'react'
import './Booking.css'
import Navbar from '../Navbar/Navbar';
import BookingsCard from './BookingsCard/BookingsCard';

const Booking = () => {
  return (
    <div className='booking-container'>
    <Navbar />
    <div className='bookings-content'>
      <div className='booking-header'>YOUR BOOKINGS</div>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
      <BookingsCard/>
    </div>
    </div>
  )
}

export default Booking
