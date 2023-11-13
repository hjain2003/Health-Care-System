import React, { useState } from 'react';
import './StockCard.css';

const StockCard = ({ medicid, medicineName, initialPrice, initialQuantity }) => {
  const [isUpdateClicked, setIsUpdateClicked] = useState(false);
  const [newQuantity, setNewQuantity] = useState(initialQuantity);
  const [newPrice, setNewPrice] = useState(initialPrice);
  const [currentQuantity, setCurrentQuantity] = useState(initialQuantity);
  const [currentPrice, setCurrentPrice] = useState(initialPrice);

  const handleUpdateClick = () => {
    setIsUpdateClicked(true);
  };

  const handleDoneClick = async () => {
    try {
      const response = await fetch(`http://localhost:5000/stock/editCount/${medicid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newCount:  newQuantity, newPrice }),
      });

      if (response.ok) {
        const data = await response.json();
        // setCurrentQuantity(data.quantity);
        // setCurrentPrice(data.price);
        window.location.reload();
        setIsUpdateClicked(false);
      } else {
        console.error('Failed to update medicine count');
      }
    } catch (error) {
      console.error('An error occurred while updating medicine count:', error);
    }
  };

  const handleQuantityChange = (event) => {
    setNewQuantity(event.target.value);
  };

  const handlePriceChange = (event) => {
    setNewPrice(event.target.value);
  };

  return (
    <div className='stockcard_container'>
      <div className='stockcard-top'>
        <div className='stock-date'>
          Medicine: {medicineName}
        </div>
        <div className='scard-right'>
          <div className='stock-time'>
            Price: {currentPrice}/unit
          </div>
          <div className='stock-time'>
            Quantity: {currentQuantity}
          </div>
          <div className='stock-cancel neww' onClick={handleUpdateClick}>
            Update
          </div>
        </div>
      </div>

      {isUpdateClicked && (
        <div className='stockk bookcard-bottom'>
          <div className='new'>
            New Quantity: &nbsp;
            <input
              type='number'
              className='stock-quant'
              value={newQuantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className='new'>
            New Price: &nbsp;
            <input
              type='number'
              className='stock-quant'
              value={newPrice}
              onChange={handlePriceChange}
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
};

export default StockCard;
