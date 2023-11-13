import React, { useState, useEffect } from 'react';
import './Record.css';
import Navbar from '../Navbar/Navbar';
import DRecordsCard from './DRecordsCard/DRecordsCard';

const Record = () => {
  const [isDoctor, setIsDoctor] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Check user role from localStorage
    const userRole = localStorage.getItem('role');
    setIsDoctor(userRole === 'doctor');

    // Fetch records based on user role
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('jwtoken');
        const response = await fetch(
          isDoctor
            ? 'http://localhost:5000/record/viewAllRecords'
            : 'http://localhost:5000/record/viewMyRecords',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data = await response.json();
          setRecords(data.records);
        } else {
          console.error('Failed to fetch records data');
        }
      } catch (error) {
        console.error('An error occurred while fetching records data:', error);
      }
    };

    fetchRecords();
  }, [isDoctor]);

  return (
    <div className='record-container'>
      <Navbar />
      <div className='records-content'>
        <div className='record-header'>PAST RECORDS</div>
        
        {/* Static Search Bar */}
        {isDoctor && (
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search names...'
              className='stocks-search-input'
              value='' 
              // onChange={handleSearchChange}  // Remove onChange handler
            />
            <button className='search-button'>Search</button>
          </div>
        )}
        
        {records.map(record => (
          isDoctor ? (
            <DRecordsCard key={record._id} date={record.date} disease={record.disease} name={record.user.name} prescription={record.prescription} />
          ) : (
            <DRecordsCard key={record._id} date={record.date} disease={record.disease} prescription={record.prescription} />
          )
        ))}
      </div>
    </div>
  );
}

export default Record;
