import React from 'react'
import './Register.css';

const Register = () => {
  return (
    <>
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
            <input type="password" placeholder='Enter password' name="password" />
            <br />
            <label htmlFor="">Confirm Password</label>
            <input type="password" placeholder='Re-Enter password' name="cpassword" />
        </div>
    </div>
    </>
  )
}

export default Register
