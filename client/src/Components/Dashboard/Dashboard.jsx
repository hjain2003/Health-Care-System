import React from 'react'
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import yoga from '../../assets/yoga.svg'
import { useEditContext } from '../../EditContext';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();
  const [userData,setUserData] = useState('');

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

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <div className="dashboard_container">
      <Navbar />

      <div className="dashboard_box">
        <dic className="dashboard_content">
          <h1>Hello {userData.name},</h1>
          <br />
          <span>Have a nice day and don't forget to take care of your health!</span>
          <br />
          <button id="book_app">Book an appointment</button>
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
  )
}

export default Dashboard
