import React from 'react';
import './BookingsCard.css';

const BookingsCard = ({ date, time, name, problem }) => {
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
          <div className='book-accept'>
            Accept
          </div>
          <div className='book-cancel'>
            Cancel
          </div>
        </div>
      </div>
      <div className='bookcard-bottom'>
        {name}
        <div className='doc-bookcard-details'>
          Problem: {problem}
        </div>
      </div>
    </div>
  );
}

export default BookingsCard;
