import React, { useState } from 'react';
import './DRecordsCard.css';

const DRecordsCard = ({ date, time, diagnosis, name }) => {
  const [isPrescriptionPopUpOpen, setIsPrescriptionPopUpOpen] = useState(false);
  const [prescription, setPrescription] = useState('');

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
          Time: {time}
        </div>
        <div className='book-cancel' onClick={openPrescriptionPopUp}>
          Prescription
        </div>
      </div> 
      <div className='bookcard-bottom'>
        {name}
        <div className='doc-bookcard-details'>
          Diagnosis: {diagnosis}
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
}

export default DRecordsCard;
