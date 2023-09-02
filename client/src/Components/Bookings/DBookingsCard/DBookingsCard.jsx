import React, { useState } from 'react';
import './DBookingsCard.css';

const DBookingsCard = ({ date, time, user, remarks }) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const openPopUp = () => {
    setIsPopUpOpen(true);
  };

  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleConfirm = () => {

    setIsConfirmed(true); // Set confirmation state to true
    closePopUp();
  };

  return (
    <div className='bookcard_container'>
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
}

export default DBookingsCard;
