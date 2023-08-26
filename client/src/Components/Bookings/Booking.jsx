import React from 'react'
import './Booking.css'
import Navbar from '../Navbar/Navbar';

const Booking = () => {
  return (
    <div className='booking-container'>
    <Navbar />
    <div className='bookings-content'>
      <div className='booking-header'>YOUR BOOKINGS</div>
    </div>
    </div>
  )
}

export default Booking
