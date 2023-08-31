import React from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
        <nav>
          <h1>Health Care Portal</h1>
        </nav>
      <div className="full_page_register">
        <div className="register_box">
          <h2 align="center">REGISTER</h2>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Enter Name' name="name" />
          <br />
          <label htmlFor="">Email ID</label>
          <input type="email" placeholder='Enter email-id' name="email" />
          <br />
          <label htmlFor="">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              name="password"
              className="password_field"
            />
            <button className="password-toggle-btn" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <label htmlFor="">Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Re-Enter password'
              name="cpassword"
              className="password_field"
            />
            <button className="password-toggle-btn" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <button className='register_btn'>SIGN UP</button>
          <br />
          <span className="linkRegister">
            Already have an account ? <NavLink to='/login'>Login here!</NavLink>
          </span>
        </div>
      </div>
    </>
  );
}

export default Register;
