import React, { useState } from 'react';
import './BookingsCard.css';

const BookingsCard = ({ date, timeSlot, remarks, bookingId }) => {
  const [isCanceled, setIsCanceled] = useState(false);
  const [cancelValue,setCancelValue] = useState('Cancel');

  const handleCancel = async () => {
    setCancelValue('...');
    try {
      const token = localStorage.getItem('jwtoken');

      const response = await fetch(
        `http://localhost:5000/booking/cancelBookingByPatient/${bookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        }
      );

      if (response.ok) {
        setCancelValue('Cancel');
        window.location.reload();
        setIsCanceled(true);
      } else {
        setCancelValue('Cancel');
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      setCancelValue('Cancel');
      console.error('An error occurred while canceling booking:', error);
    }
  };

  return (
    <div className={`bookcard_container ${isCanceled ? 'canceled' : ''}`}>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date}
        </div>
        <div className='book-time'>
          Time: {timeSlot}
        </div>
        <div className='doc-booking-buttons'>
          {!isCanceled && (
            <div className='book-cancel' onClick={handleCancel}>
              {cancelValue}
            </div>
          )}
        </div>
      </div>
      <div className='bookcard-bottom'>
        <div className='doc-bookcard-details'>
          Problem: {remarks}
        </div>
      </div>
    </div>
  );
};

export default BookingsCard;
