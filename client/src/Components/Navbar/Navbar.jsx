import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink
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
        <NavLink to="/" activeClassName="active" className='uwu'> 
          <div className='nel' id="top-menu-item">
            <BsFillHouseFill className='sign' />Dashboard
          </div>
        </NavLink>

        <NavLink to="/booking" activeClassName="active" className='uwu'> 
          <div className='nel'>
            <BsFillBookmarkStarFill className='sign' />Bookings
          </div>
        </NavLink>

        <NavLink to="/record" activeClassName="active" className='uwu'> 
          <div className='nel'>
            <BsFillJournalBookmarkFill className='sign' />Past Records
          </div>
        </NavLink>

        <NavLink to="/stock" activeClassName="active" className='uwu'> 
          <div className='nel'>
            <CgShutterstock className='sign' />Stocks
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
