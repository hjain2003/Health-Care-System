import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { BsFillHouseFill, BsFillBookmarkStarFill, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { CgShutterstock } from 'react-icons/cg';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate(); // Hook to handle navigation

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setShowMenu(false); // Close the menu after navigation
  };

  return (
    <div className='container'>
      <div className='hamm'>
        <div className='hamburger' onClick={toggleMenu}>
          <div className={`line ${showMenu ? 'active' : ''}`}></div>
          <div className={`line ${showMenu ? 'active' : ''}`}></div>
          <div className={`line ${showMenu ? 'active' : ''}`}></div>
        </div>
        <div className='heading'>
          Medico
        </div>
      </div>
      <div className={`menu ${showMenu ? 'show' : ''}`}>
        <div className='nel' id="top-menu-item" onClick={() => handleNavigation('/')}>
          <BsFillHouseFill className='sign' />Dashboard
        </div>
        <div className='nel' onClick={() => handleNavigation('/booking')}>
          <BsFillBookmarkStarFill className='sign' />Bookings
        </div>
        <div className='nel' onClick={() => handleNavigation('/record')}>
          <BsFillJournalBookmarkFill className='sign' />Past Records
        </div>
        <div className='nel' onClick={() => handleNavigation('/stock')}>
          <CgShutterstock className='sign' /> Stocks
        </div>
      </div>
    </div>
  );
};

export default Navbar;
