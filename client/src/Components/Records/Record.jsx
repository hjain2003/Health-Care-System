import React, { useState, useEffect } from 'react';
import './Record.css';
import Navbar from '../Navbar/Navbar';
import RecordsCard from './RecordsCard/RecordsCard';
import DRecordsCard from './DRecordsCard/DRecordsCard';

const Record = () => {
  const [isDoctor, setIsDoctor] = useState(false);
  const [records, setRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);

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

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = records.filter(record =>
      record.name.toLowerCase().includes(searchValue)
    );

    setFilteredRecords(filtered);
  };

  return (
    <div className='record-container'>
      <Navbar />
      <div className='records-content'>
        <div className='record-header'>PAST RECORDS</div>
        {isDoctor && (
          <div className='search-bar'>
            <input
              type='text'
              placeholder='Search names...'
              className='stocks-search-input'
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className='search-button'>Search</button>
          </div>
        )}
        
        {filteredRecords.map(record => (
          isDoctor ? (
            <DRecordsCard key={record._id} date={record.date} disease={record.disease} name={record.user.name} prescription={record.prescription} />
          ) : (
            <RecordsCard key={record._id} date={record.date} disease={record.disease} />
          )
        ))}
      </div>
    </div>
  );
}

export default Record;
