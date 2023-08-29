import React from 'react'
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';
import yoga from '../../assets/yoga.svg'

const Dashboard = () => {
  return (
    <div className="dashboard_container">
      <Navbar />

      <div className="dashboard_box">
        <dic className="dashboard_content">
          <h1>Hello Harsh Jain,</h1>
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
        <div className="dash_card"><span align="center">No. of visitations <br /><br />355</span></div>
        <div className="dash_card"><span align="center">Cancellations <br /><br /> 200</span></div>
      </div>

    </div>
  )
}

export default Dashboard
