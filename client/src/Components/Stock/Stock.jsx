import React, { useState } from 'react';
import './Stock.css';
import Navbar from '../Navbar/Navbar';
import StockCard from './StockCard/StockCard';

const Stock = () => {

  const [addMedicineBox,setAddMedicineBox] = useState(false);

  const addMedicine = ()=>{
    if(addMedicineBox === false){
      setAddMedicineBox(true);
    }
    else{
      setAddMedicineBox(false);
    }
  }

  const closeMedicineBox =()=>{
    setAddMedicineBox(false);
  }

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
      {addMedicineBox && (
        <div className='addMedicineContainer'>
          <h1 align="center">ADD MEDICINE</h1>
          <br />
          <label htmlFor="">Medcine :</label>
          <input type="text" name="medicine" id="" />
          <br />
          <label htmlFor="">Price :</label>
          <input type="text" name="price" />
          <br />
          <label htmlFor="">Quantity(per unit) : </label>
          <input type="text" name="quantity" />
          <br/>
          <div className="buttons_add_medicine">
              <button id="submit_medicine">Save</button>&nbsp;&nbsp;&nbsp;
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
        
        {filteredStockData.map(medicine => (
          <StockCard key={medicine.id} medicineName={medicine.name} />
        ))}
      </div>
    </div>
  );
}

export default Stock;
