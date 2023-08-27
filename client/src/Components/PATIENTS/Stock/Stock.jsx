import React from 'react';
import './Stock.css';
import Navbar from '../Navbar/Navbar';
import StockCard from './StockCard/StockCard';

const Stock = () => {
  return (
    <div className='stock-container'>
      <Navbar />
      <div className='stocks-content'>
        <div className='stock-header'>STOCKS</div>
        <div className='search-bar'>
          <input type='text' placeholder='Search stocks...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
      </div>
    </div>
  );
}

export default Stock;
