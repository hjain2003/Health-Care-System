import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import './Navbar.css';
import { BsFillHouseFill, BsFillBookmarkStarFill, BsFillJournalBookmarkFill } from 'react-icons/bs';
import { CgShutterstock } from 'react-icons/cg';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = async () => {
    const result = window.confirm('Are you sure you want to logout?');
    if (result) {
      try {
        const res = await fetch('http://localhost:5000/user/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) {
          const error = new Error(res.error);
          throw error;
        } else {
          navigate('/login');
          localStorage.removeItem('jwtoken');
          localStorage.removeItem('role');
        }
      } catch (err) {
        console.log(err);
      }
    }
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
          Medico &nbsp;&nbsp;<button id="logout_btn" onClick={handleLogout}>LOGOUT</button>
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
