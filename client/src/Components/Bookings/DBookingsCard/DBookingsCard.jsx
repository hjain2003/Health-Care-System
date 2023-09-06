import React, { useState, useEffect } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, time, user, remarks, bookingId }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [cancelText, setCancelText] = useState('Cancel');
  const [confirmationTime, setConfirmationTime] = useState('');

  useEffect(() => {
    // Check if the time is neither "Not confirmed yet" nor "Cancelled"
    if (time !== "Not confirmed yet" && time !== "Cancelled") {
      setIsConfirmed(true);
    }
  }, [time]);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem('jwtoken');

      // Send a POST request with confirmation time only
      const response = await fetch(
        `http://localhost:5000/booking/confirmBooking/${bookingId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify({
            time: confirmationTime, // Use confirmationTime
          }),
        }
      );

      if (response.ok) {
        // Handle success (e.g., update UI)
        setIsConfirmed(true);
        closePopUp();
        
        // Reload the page to see the updated buttons
        window.location.reload();
      } else {
        window.alert("Empty fields!!");
        console.error('Failed to confirm booking');
      }
    } catch (error) {
      console.error('An error occurred while confirming booking:', error);
    }
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
        window.location.reload(); // Reload the page after cancellation
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
          {isConfirmed ? (
            <>
              <div className='book-accept book-update' onClick={openPopUp}>
                Update
              </div> &nbsp;&nbsp;&nbsp;
              <div className='book-upload' onClick={() => console.log("Upload clicked")}>
                Upload
              </div>&nbsp;&nbsp;&nbsp;
              <div className='book-cancel' onClick={handleCancel}>
                {cancelText}
              </div>
            </>
          ) : (
            <>
              <div className='book-accept' onClick={openPopUp}>
                Accept
              </div>
              <div className='book-cancel' onClick={handleCancel}>
                {cancelText}
              </div>
            </>
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
            Time:
            <input
              type='time'
              className='time'
              value={confirmationTime}
              onChange={(e) => setConfirmationTime(e.target.value)}
            />
            <button onClick={handleConfirm} className='confirm'>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBookingsCard;
