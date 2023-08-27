import React from 'react';
import './Stock.css';
import DNavbar from '../Navbar/Navbar';
import DStockCard from './StockCard/StockCard';

const DStock = () => {
  return (
    <div className='stock-container'>
      <DNavbar />
      <div className='stocks-content'>
        <div className='stock-header'>STOCKS</div>
        <div className='search-bar'>
          <input type='text' placeholder='Search stocks...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
        <DStockCard />
      </div>
    </div>
  );
}

export default DStock;
