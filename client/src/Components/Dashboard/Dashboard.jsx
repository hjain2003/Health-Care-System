import React from 'react'
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import yoga from '../../assets/yoga.svg'
import { useEditContext } from '../../EditContext';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [box, setBox] = useState(false);
  const [date, setDate] = useState('');
  const [remarks, setRemarks] = useState('');
  const [cfmBooking, setcmfBooking] = useState('Confirm'); 
  const [doneMsg, setdoneMsg] = useState(false); //success box

  const token = localStorage.getItem('jwtoken');

  const callHomePage = async () => {
    try {
      const res = await fetch('http://localhost:5000/user/getUserData', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include'
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (res.status !== 200) {
        navigate('/login');
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/login');
    }
  };

  const handleBooking = async () => {
    setcmfBooking('...');
    try {
      const response = await fetch('http://localhost:5000/booking/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          date,
          remarks,
        }),
      });

      if (response.ok) {
        setcmfBooking('Confirm');
        setBox(false);
        console.log('Appointment booked successfully');
        setdoneMsg(true);
      } else {
        setcmfBooking('Confirm');
        window.alert('Empty fields!!');
        console.error('Failed to book appointment');
      }
    } catch (error) {
      setcmfBooking('Confirm');
      console.error('An error occurred while booking appointment:', error);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  const openBox = () => {
    if (box === false) {
      setBox(true);
    }
    else {
      setBox(false);
    }
  }

  const closeBookingBox = () => {
    setBox(false);
  }
  const closeCmfBox =()=>{
    setdoneMsg(false);
  }

  return (
    <>
      {box &&
        (
          <div className='booking_box'>
            <h1 align="center">BOOK AN APPOINTMENT</h1>
            <br />
            <label htmlFor="">Date : </label>
            <input type="date" name="date" onChange={(e) => setDate(e.target.value)} />
            <br />
            <label htmlFor="">Remarks :</label>
            <textarea type="text" name="remarks" rows={10} placeholder='Please mention your problem in brief' onChange={(e) => setRemarks(e.target.value)} />
            <br />
            <div className='booking_box_btns'>
              <button id="confirm_booking" onClick={handleBooking}>{cfmBooking}</button> &nbsp;&nbsp;&nbsp;
              <button id="cancel_booking" onClick={closeBookingBox}>Cancel</button>
            </div>
          </div>
        )
      }
      {doneMsg &&
        (
          <div className='booking_confirmation_box'>
            Booking Confirmed!
            <button id="close_cmf_box" onClick={closeCmfBox}>OK</button>
          </div>
        )
      }
      <div className="dashboard_container">
        <Navbar />

        <div className="dashboard_box">
          <dic className="dashboard_content">
            <h1>Hello {userData.name},</h1>
            <br />
            <span>Have a nice day and don't forget to take care of your health!</span>
            <br />
            <button id="book_app" onClick={openBox}>Book an appointment</button>
          </dic>
          <div className="img_container">
            <img src={yoga} alt="" />
          </div>
        </div>
        <div className="card_container">
          <div className="dash_card"><span align="center">No. of visitations <br /><br />{userData.bookingCount}</span></div>
          <div className="dash_card"><span align="center">Cancellations <br /><br /> {userData.cancelledBookingCount}</span></div>
        </div>

      </div>
    </>
  )
}

export default Dashboard
