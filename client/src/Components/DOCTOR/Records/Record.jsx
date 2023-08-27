import React from 'react'
import './Record.css'
import DNavbar from '../Navbar/Navbar';
import DRecordsCard from './RecordsCard/RecordsCard';

const DRecord = () => {
  return (
    <div className='record-container'>
    <DNavbar />
    <div className='records-content'>
      <div className='record-header'>PAST RECORDS</div>
      <div className='search-bar'>
          <input type='text' placeholder='Search patients...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
      <DRecordsCard />
    </div>
    </div>
  )
}

export default DRecord
