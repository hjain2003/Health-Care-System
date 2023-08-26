import React from 'react'
import './Dashboard.css';
import Navbar from '../Navbar/Navbar';

const Dashboard = () => {
  return (
    <div className="full_page_dashboard">
      <Navbar/>
      <div className="dashboard_content">
        <span className="pages">Pages</span>
      </div>
    </div>
  )
}

export default Dashboard
