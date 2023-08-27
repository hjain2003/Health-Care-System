import React, { useState } from 'react';
import './Record.css';
import Navbar from '../Navbar/Navbar';
import RecordsCard from './RecordsCard/RecordsCard';
import DRecordsCard from './DRecordsCard/DRecordsCard';

const Record = () => {
  const isDoctor = true; // Set this to true if the user is a doctor, otherwise set it to false

  const records = [
    { id: 1, date: '12/08/23', time: '2.33pm', diagnosis: 'IBS', name: 'Patient Name' },
    { id: 2, date: '12/08/23', time: '2.33pm', diagnosis: 'Diarrhea', name: 'Harsh Jain' },
    // ...add more records as needed
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRecords, setFilteredRecords] = useState(records);

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
            <DRecordsCard key={record.id} date={record.date} time={record.time} diagnosis={record.diagnosis} name={record.name} />
          ) : (
            <RecordsCard key={record.id} date={record.date} time={record.time} diagnosis={record.diagnosis} />
          )
        ))}
      </div>
    </div>
  );
}

export default Record;
