import React, { useState } from 'react';
import './DRecordsCard.css';

const DRecordsCard = ({ date, time, diagnosis, name, prescription }) => {
const DRecordsCard = ({ date, disease, name }) => {
  const [isPrescriptionPopUpOpen, setIsPrescriptionPopUpOpen] = useState(false);

  const openPrescriptionPopUp = () => {
    setIsPrescriptionPopUpOpen(true);
  };

  const closePrescriptionPopUp = () => {
    setIsPrescriptionPopUpOpen(false);
  };

  return (
    <div className='bookcard_container'>
      <div className='bookcard-top'>
        <div className='book-date'>
          Date: {date}
        </div>
        {/* <div className='book-time'>
          Time: {time}
        </div> */}
        <div className='book-cancel' onClick={openPrescriptionPopUp}>
          Prescription
        </div>
      </div> 
      <div className='bookcard-bottom'>
        {name}
        <div className='doc-bookcard-details'>
          Diagnosis: {disease}
        </div>
      </div>

      {isPrescriptionPopUpOpen && (
        <div className='popup'>
          <div className='popup-content'>
            <h2>PRESCRIPTION DETAILS</h2>
            <p>{prescription}</p>
            <div className='popup-buttons'>
              <button onClick={closePrescriptionPopUp} className='can'>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DRecordsCard;
