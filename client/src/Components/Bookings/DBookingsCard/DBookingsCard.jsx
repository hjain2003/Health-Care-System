import React, { useState } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, timeSlot, user, remarks, bookingId }) => {
  const [cancelText, setCancelText] = useState('Cancel');

  const handleCancel = async () => {
    setCancelText('...');
    try {
      const token = localStorage.getItem('jwtoken');

      const response = await fetch(
        `http://localhost:5000/booking/cancelBookingByDoctor/${bookingId}`,
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
        setCancelText('Cancel');
        window.location.reload();
        // Handle successful cancellation if needed
        // For example, show a success message
      } else {
        setCancelText('Cancel');
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      setCancelText('Cancel');
      console.error('An error occurred while canceling booking:', error);
    }
  };

  return (
    <div className='bookcard_container'>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date}
        </div>
        <div className='book-time'>
          Time Slot: {timeSlot}
        </div>
        <div className='doc-booking-buttons'>
          <div className='book-upload' onClick={() => console.log("Upload clicked")}>
            Upload
          </div>
          &nbsp;&nbsp;
          <div className='book-cancel' onClick={handleCancel}>
            {cancelText}
          </div>
        </div>
      </div>
      <div className='bookcard-bottom'>
        {user}
        <div className='doc-bookcard-details'>
          Problem: {remarks}
        </div>
      </div>
    </div>
  );
};

export default DBookingsCard;
