import React from 'react';
import './BookingsCard.css';

const BookingsCard = ({ date, time, remarks }) => {
  return (
    <div className='bookcard_container'>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date}
        </div>
        <div className='book-time'>
          Time: {time}
        </div>
        <div className='doc-booking-buttons'>
          {/* <div className='book-accept'>
            Accept
          </div> */}
          <div className='book-cancel'>
            Cancel
          </div>
        </div>
      </div>
      <div className='bookcard-bottom'>
        <div className='doc-bookcard-details'>
          Problem: {remarks}
        </div>
      </div>
    </div>
  );
}

export default BookingsCard;
