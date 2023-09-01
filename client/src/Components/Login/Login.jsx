import React, { useContext, useState } from 'react'
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useEditContext } from '../../EditContext';

const Login = () => {
  const navigate = useNavigate();
  const [loadingMsg, setLoadingMsg] = useState('LOGIN');
  const {userData, setUserData} = useEditContext();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
 
  const loginUser = async (e) => {
    e.preventDefault();
    setLoadingMsg('LOGGING IN ...');

    const { email, password } = user;

    try {
      const res = await fetch('http://localhost:5000/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 400) {
        setLoadingMsg('LOGIN');
        window.alert('Login failed !');
      } else {
        setUserData(data);
        setLoadingMsg('LOGIN');
        localStorage.setItem('jwtoken', data.token);
        navigate('/');
      }
    } catch (error) {
      // console.error('An error occurred:', error);
      setLoadingMsg('LOGIN');
    }
  };

  return (
    <>
      <nav>
          <h1>Health Care Portal</h1>
        </nav>
      <div className="full_page_login">
        <div className="login_box">
          <h2 align="center">LOGIN</h2>
          <label htmlFor="">Email ID</label>
          <input type="text" placeholder='Enter Email-id' name="email" className='input-log' onChange={handleChange}/>
          <br />
          <label htmlFor="">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Enter password'
              name="password"
              className="password_field" onChange={handleChange}
            />
            <button className="password-toggle-btn" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br /><br />
          <button className='login_btn' onClick={loginUser}>{loadingMsg}</button>
          <br />
          <span className="linkRegister">Already have an account ? <NavLink to='/register'>Register here!</NavLink></span>
        </div>
      </div >
    </>
  )
}

export default Login
