import React from 'react';
import './RecordsCard.css';

const RecordsCard = ({ date, time, diagnosis }) => {
  return (
    <div className='bookcard_container'>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date}
        </div>
        <div className='book-time'>
          Time: {time}
        </div>
        <div className='book-cancel'>
          Prescription
        </div>
      </div>
      <div className='bookcard-bottom'>
        Diagnosis: {diagnosis}
      </div>
    </div>
  );
}

export default RecordsCard;
