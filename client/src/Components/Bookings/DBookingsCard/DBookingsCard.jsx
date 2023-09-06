import React, { useState } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, time, user, remarks, bookingId }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelText,setCancelText] = useState('Cancel');
  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

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
        setIsConfirmed(false); // Reset confirmation state
      } else {
        setCancelText('Cancel');
        console.error('Failed to cancel booking');
      }
    } catch (error) {
      setCancelText('Cancel');
      console.error('An error occurred while canceling booking:', error);
    }
  };

  const handleConfirm = () => {
    setIsConfirmed(true); // Set confirmation state to true
    closePopUp();
  };

  return (
    <div className={`bookcard_container ${isConfirmed ? 'canceled' : ''}`}>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date} {/* Display the updated date */}
        </div>
        <div className='book-time'>
          Time: {time} {/* Display the updated time */}
        </div>
        <div className='doc-booking-buttons'>
          {!isConfirmed ? (
            <>
              <div className='book-accept' onClick={openPopUp}>
                Accept
              </div>
              <div className='book-cancel' onClick={handleCancel}>
                {cancelText}
              </div>
            </>
          ) : (
            <div className='book-accept book-update' onClick={openPopUp}>
              Update
            </div>
          )}
        </div>
      </div>
      <div className='bookcard-bottom'>
        {user}
        <div className='doc-bookcard-details'>
          Problem: {remarks}
        </div>
      </div>

      {isPopUpOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <div className='booking-heading'>CONFIRM BOOKING</div>
            Date:
            <input type='date' className='Date' />
            Time:
            <input type='time' className='time' />
            <button onClick={handleConfirm} className='confirm'>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBookingsCard;
