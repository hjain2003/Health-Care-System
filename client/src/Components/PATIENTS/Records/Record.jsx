import React from 'react'
import './Record.css'
import Navbar from '../Navbar/Navbar';
import RecordsCard from './RecordsCard/RecordsCard';

const Record = () => {
  return (
    <div className='record-container'>
    <Navbar />
    <div className='records-content'>
      <div className='record-header'>PAST RECORDS</div>
      <RecordsCard />
    </div>
    </div>
  )
}

export default Record
