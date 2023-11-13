import React, { useState, useEffect } from 'react';
import './Stock.css';
import Navbar from '../Navbar/Navbar';
import StockCard from './StockCard/StockCard';

const Stock = () => {
  const [addMedicineBox, setAddMedicineBox] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMedicine, setNewMedicine] = useState({
    medicine: '',
    price: '',
    quantity: '',
  });
  const[savingText, setSavingText] = useState('Save');


  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        // const token = localStorage.getItem('jwtoken');
        const response = await fetch(
          'http://localhost:5000/stock/viewStock',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMedicines(data.stocks);
        } else {
          console.error('Failed to fetch medicines data');
        }
      } catch (error) {
        console.error('An error occurred while fetching medicines data:', error);
      }
    };

    fetchMedicines();
  }, []);

  const handleMedicineSave =async()=>{
    setSavingText('...');
    try {
      // const token = localStorage.getItem('jwtoken');

      const response = await fetch(
        'http://localhost:5000/stock/addInfo',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
          body: JSON.stringify(newMedicine),
        }
      );

      if (response.ok) {
        setSavingText('Save');
        window.location.reload();
      } else {
        setSavingText('Save');
        console.error('Failed to add medicine');
      }

      // Close the add medicine box
    } catch (error) {
      setSavingText('Save');
      console.error('An error occurred while adding medicine:', error);
    }
  }

  const addMedicine = () => {
    if (addMedicineBox === false) {
      setAddMedicineBox(true);
    } else {
      setAddMedicineBox(false);
    }
  };

  const closeMedicineBox = () => {
    setAddMedicineBox(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleMedicineChange = (event) => {
    setNewMedicine({
      ...newMedicine,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className='stock-container'>
      {addMedicineBox && (
        <div className='addMedicineContainer'>
          <h1 align="center">ADD MEDICINE</h1>
          <br />
          <label htmlFor="">Medicine :</label>
          <input type="text" name="medicine" id="" onChange={handleMedicineChange}/>
          <br />
          <label htmlFor="">Price :</label>
          <input type="text" name="price" onChange={handleMedicineChange}/>
          <br />
          <label htmlFor="">Quantity(per unit) : </label>
          <input type="text" name="quantity" onChange={handleMedicineChange}/>
          <br/>
          <div className="buttons_add_medicine">
            <button id="submit_medicine" onClick={handleMedicineSave}>Save</button>&nbsp;&nbsp;&nbsp;
            <button id="cancel_medicine" onClick={closeMedicineBox}>Cancel</button>
          </div>
        </div>
      )}
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
          <button className='search-button'>Search</button>&nbsp;&nbsp;&nbsp;
          <button id="add_medicine" onClick={addMedicine}>Add</button>
        </div>

        {medicines.map(medicine => (
          <StockCard key={medicine._id} medicid={medicine._id} medicineName={medicine.medicine} initialPrice={medicine.price} initialQuantity={medicine.quantity} />
        ))}
      </div>
    </div>
  );
};

export default Stock;
