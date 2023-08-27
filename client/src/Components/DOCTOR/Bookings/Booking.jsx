import React from 'react'
import './Booking.css'
import DNavbar from '../Navbar/Navbar';
import DBookingsCard from './BookingsCard/BookingsCard';

const DBooking = () => {
  return (
    <div className='booking-container'>
    <DNavbar />
    <div className='bookings-content'>
    
      <div className='booking-header'>YOUR BOOKINGS</div>
      <div className='search-bar'>
          <input type='text' placeholder='Search stocks...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
      <DBookingsCard/>
    </div>
    </div>
  )
}

export default DBooking
