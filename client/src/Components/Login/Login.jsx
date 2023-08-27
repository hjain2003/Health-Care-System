import React from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
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
      <div className="full_page_login">
        <div className="login_box">
          <h2 align="center">LOGIN</h2>
          <label htmlFor="">Email ID</label>
          <input type="text" placeholder='Enter Email-id' name="email" />
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
          <br /><br />
          <button className='login_btn'>SIGN IN</button>
          <br />
          <span className="linkRegister">Already have an account ? <NavLink to='/register'>Register here!</NavLink></span>
        </div>
      </div >
    </>
  )
}

export default Login
