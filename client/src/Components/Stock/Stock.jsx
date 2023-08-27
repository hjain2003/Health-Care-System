import React, { useState } from 'react';
import './Stock.css';
import Navbar from '../Navbar/Navbar';
import StockCard from './StockCard/StockCard';

const Stock = () => {
  const stockData = [
    { id: 1, name: 'Pantop D', price: 20 , initialQuantity: 200 },
    { id: 2, name: 'Azithromycin', price: 20 , initialQuantity: 200 },
    { id: 3, name: 'FaceLin', price: 20 , initialQuantity: 200 },
    { id: 4, name: 'GluconD', price: 20 , initialQuantity: 200 },
    { id: 5, name: 'Eno', price: 20 , initialQuantity: 200 },
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStockData = stockData.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='stock-container'>
      <Navbar />
      <div className='stocks-content'>
        <div className='stock-header'>STOCKS</div>
        <div className='search-bar'>
          <input
            type='text'
            placeholder='Search stocks...'
            className='stocks-search-input'
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className='search-button'>Search</button>
        </div>
        
        {filteredStockData.map(medicine => (
          <StockCard key={medicine.id} medicineName={medicine.name} />
        ))}
      </div>
    </div>
  );
}

export default Stock;
