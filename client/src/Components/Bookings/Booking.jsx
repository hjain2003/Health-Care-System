import React, { useState } from 'react';
import './Booking.css';
import Navbar from '../Navbar/Navbar';
import BookingsCard from './BookingsCard/BookingsCard';
import DBookingsCard from './DBookingsCard/DBookingsCard';

const Booking = () => {
  const isDoctor = true;

  const bookingsData = [
    { id: 1, date: '12/08/23', time: '2.33pm', name: 'Harsh Jain', problem: 'Diarrhea' },
    { id: 2, date: '12/08/23', time: '2.33pm', name: 'Patient Name', problem: 'Some Problem' },
    // ...add more booking data as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookingsData);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = bookingsData.filter(booking =>
      booking.name.toLowerCase().includes(searchValue)
    );

    setFilteredBookings(filtered);
  };

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
              onChange={handleSearchChange}
            />
            <button className='search-button'>Search</button>
          </div>
        )}

        {filteredBookings.map(booking => (
          isDoctor ? (
            <DBookingsCard key={booking.id} date={booking.date} time={booking.time} name={booking.name} problem={booking.problem} />
          ) : (
            <BookingsCard key={booking.id} date={booking.date} time={booking.time} name={booking.name} problem={booking.problem} />
          )
        ))}

      </div>
    </div>
  );
}

export default Booking;
