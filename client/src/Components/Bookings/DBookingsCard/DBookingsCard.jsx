import React, { useState } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, time, name, problem }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [newDate, setNewDate] = useState(date); // Initialize with the existing date
  const [newTime, setNewTime] = useState(time); // Initialize with the existing time
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setNewTime(event.target.value);
  };

  const handleConfirm = () => {
    // Update the date and time values with the new ones
    setNewDate(newDate);
    setNewTime(newTime);

    setIsConfirmed(true); // Set confirmation state to true
    closePopUp();
  };

  return (
    <div className='bookcard_container'>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {newDate} {/* Display the updated date */}
        </div>
        <div className='book-time'>
          Time: {newTime} {/* Display the updated time */}
        </div>
        <div className='doc-booking-buttons'>
          {!isConfirmed ? (
            <>
              <div className='book-accept' onClick={openPopUp}>
                Accept
              </div>
              <div className='book-cancel'>
                Cancel
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
        {name}
        <div className='doc-bookcard-details'>
          Problem: {problem}
        </div>
      </div>
      
      {isPopUpOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <div className='booking-heading'>CONFIRM BOOKING</div>
            Date:
            <input type='date' value={newDate} onChange={handleDateChange} className='Date' />
            Time:
            <input type='time' value={newTime} onChange={handleTimeChange} className='time' />
            <button onClick={handleConfirm} className='confirm'>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DBookingsCard;
