import React from 'react'
import './Record.css'
import Navbar from '../Navbar/Navbar';
import RecordsCard from './RecordsCard/RecordsCard';
import DRecordsCard from './DRecordsCard/DRecordsCard';

const Record = () => {
  const isDoctor = true; 

  return (
    <div className='record-container'>
    <Navbar />
    <div className='records-content'>
      <div className='record-header'>PAST RECORDS</div>
      {isDoctor && (
        <>
        <div className='search-bar'>
          <input type='text' placeholder='Search names...' className='stocks-search-input' />
          <button className='search-button'>Search</button>
        </div>
        </>
      )}
      {!isDoctor && (
          <>
          <RecordsCard />
          </>
      )}
      {isDoctor && (
          <>
          <DRecordsCard />
          </>
      )}
    </div>
    </div>
  )
}

export default Record
