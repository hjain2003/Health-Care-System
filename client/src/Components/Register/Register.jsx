import React, { useState } from 'react';
import './Register.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {

  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [signUpbtn,setSignUpBtn] = useState('SIGN UP');
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }


  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigateToLogin = ()=>{
    navigate('/login');
  }


  const registerData = async (e) => {
    setSignUpBtn('CREATING ACCOUNT...');
    e.preventDefault();
    
    try {
      const { name, email, password, cpassword } = user;
  
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword
        })
      });
  
      const data = await res.json();
  
      if (res.status === 422) {
        setSignUpBtn('SIGN UP');
        window.alert("Registration failed");
        console.log("Registration failed")
        console.log(res.status);
      }
      else if (res.status !== 422) {
        setSignUpBtn('SIGN UP');
        console.log("Registration successful");
        console.log(res.status);
        console.log(data);
        setIsRegister(true);
      }
    } catch (error) {
      setSignUpBtn('SIGN UP');
      console.error("An error occurred during registration:", error);
      // You can add additional error handling here, such as showing an error message to the user.
    }
  };
  return (
    <>
      <nav>
        <h1>Health Care Portal</h1>
        {isRegister && <span id="registration_sucess">Registration Successful. You may login now &nbsp;&nbsp;&nbsp;<button id="navlogin" onClick={navigateToLogin}>LOGIN</button></span>}
      </nav>
      <div className="full_page_register">
        <div className="register_box">
          <h2 align="center">REGISTER</h2>
          <label htmlFor="">Name</label>
          <input type="text" placeholder='Enter Name' name="name"  onChange={handleChange} />
          <br />
          <label htmlFor="">Email ID</label>
          <input type="email" placeholder='Enter email-id' name="email" onChange={handleChange} />
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
          <br />
          <label htmlFor="">Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Re-Enter password'
              name="cpassword"
              className="password_field" onChange={handleChange}
            />
            <button className="password-toggle-btn" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <br />
          <button className='register_btn' onClick={registerData}>{signUpbtn}</button>
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
