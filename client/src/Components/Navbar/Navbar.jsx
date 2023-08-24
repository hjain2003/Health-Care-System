import React, { useState } from 'react';
import './Navbar.css';
import { BsFillHouseFill, BsFillBookmarkStarFill, BsFillJournalBookmarkFill } from 'react-icons/bs'; 
import { CgShutterstock } from 'react-icons/cg'; 

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
        <div className='nel one'>
          <BsFillHouseFill className='sign'/>Dashboard
        </div>
        <div className='nel two'>
          <BsFillBookmarkStarFill className='sign'/>Bookings
        </div>
        <div className='nel three'>
          <BsFillJournalBookmarkFill className='sign'/>Past Records
        </div>
        <div className='nel four'>
          <CgShutterstock className='sign'/> Stocks
        </div>
      </div>
    </div>
  )
}

export default Navbar;
