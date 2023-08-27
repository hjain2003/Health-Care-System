import React, { useState } from 'react';
import './StockCard.css';

const DStockCard = () => {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [newQuantity, setNewQuantity] = useState(200);
  const [currentQuantity, setCurrentQuantity] = useState(200);

  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };

  const handleDoneClick = () => {
    setCurrentQuantity(newQuantity);
    setIsUpdateClicked(false);
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value);
  };

  return (
    <div className='stockcard_container'>
      <div className='stockcard-top'>
        <div className='stock-date'>
          Medicine: Pantop D
        </div>
        <div className='scard-right'>
          <div className='stock-time'>
            Price: Rs22p/u
          </div>
          <div className='stock-time'>
            Quantity: {currentQuantity}
          </div>
          <div className='stock-cancel' onClick={handleUpdateClick}>
            Update
          </div>
        </div>
      </div>
      
      {isUpdateClicked && (
        <div className='bookcard-bottom'>
          Current Quantity: {currentQuantity}
          <div className='new'>
            New Quantity: &nbsp;
            <input
              type='number'
              className='stock-quant'
              value={newQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className='doc-booking-buttons'>
            <div className='stockconf book-accept' onClick={handleDoneClick}>
              DONE
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DStockCard;
