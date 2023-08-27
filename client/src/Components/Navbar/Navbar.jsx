import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link to="/" className='uwu'>
        <div className='nel' id="top-menu-item">
              <BsFillHouseFill className='sign' />Dashboard
            </div>
        </Link>

        <Link to="/booking" className='uwu'>
        <div className='nel'>
          <BsFillBookmarkStarFill className='sign' />Bookings
        </div>
        </Link>

        <Link to="/record" className='uwu'>
        <div className='nel'>
          <BsFillJournalBookmarkFill className='sign' />Past Records
        </div>
        </Link>

        <Link to="/stock" className='uwu'>
        <div className='nel'>
          <CgShutterstock className='sign' />Stocks
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
