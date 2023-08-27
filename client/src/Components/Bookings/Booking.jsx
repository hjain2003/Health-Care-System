import React from 'react';
import './Booking.css';
import Navbar from '../Navbar/Navbar';
import BookingsCard from './BookingsCard/BookingsCard';
import DBookingsCard from './DBookingsCard/DBookingsCard';

const Booking = () => {
  const isDoctor = true;

  return (
    <div className='booking-container'>
      <Navbar />
      <div className='bookings-content'>
        <div className='booking-header'>YOUR BOOKINGS</div>
        {isDoctor && (
        <>
        <div className='search-bar'>
          <input type='text' placeholder='Search names...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
        </>
      )}
        {!isDoctor && (
          <>
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          <BookingsCard />
          </>
        )}
        
        {/* Show DBookingsCard components only if the user is a doctor */}
        {isDoctor && (
          <>
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
            <DBookingsCard />
          </>
        )}
      </div>
    </div>
  );
}

export default Booking;
