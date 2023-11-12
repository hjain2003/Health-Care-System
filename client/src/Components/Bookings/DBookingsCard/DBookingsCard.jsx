import React, { useState } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, timeSlot, user, remarks, bookingId }) => {
  const [cancelText, setCancelText] = useState('Cancel');
  const [isPrescriptionPopUpOpen, setIsPrescriptionPopUpOpen] = useState(false);
  const [prescription, setPrescription] = useState('');

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


  const openPrescriptionPopUp = () => {
    setIsPrescriptionPopUpOpen(true);
  };

  const closePrescriptionPopUp = () => {
    setIsPrescriptionPopUpOpen(false);
  };

  const handlePrescriptionChange = (event) => {
    setPrescription(event.target.value);
  };

  const handlePrescriptionSubmit = () => {
    // Here you can perform actions with the prescription data
    console.log('Prescription submitted:', prescription);

    // Close the pop-up after submission
    closePrescriptionPopUp();
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
          <div className='book-upload' onClick={openPrescriptionPopUp}>
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

      {isPrescriptionPopUpOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>FILL PRESCRIPTION</h2>
            <textarea
              placeholder='Enter prescription details...'
              value={prescription}
              onChange={handlePrescriptionChange}
              className='prescription-content'
            />
            <div className='popup-buttons'>
              <button onClick={handlePrescriptionSubmit} className='sub'>Submit</button>
              <button onClick={closePrescriptionPopUp} className='can'>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DBookingsCard;
