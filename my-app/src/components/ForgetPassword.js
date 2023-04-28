import React from "react";
import '../css/login.css';

import { Link } from "react-router-dom";

const ForgetPassword = () => {
 
  return (
    <>
      
      <div className="login-div">
  <div className="signin-box">
    <div className="signin-title">forgot Password</div>
    <form name="signup" action="#"  style={{display: "block"}}>
      <div className="pad-top">
        <input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="pad-top">
        <input
          type="password"
          placeholder="NewPassword"
          required
          name="Newpassword"
          id="password"
        />
      </div>
      <div className="pad-top">
        <input
          type="password"
          placeholder="RetypePassword"
          required
          name="Retypepassword"
          id="password"
        />
      </div>
      <div className="pad-top">
        <input
          type="submit"
          defaultValue="submit"
          name="sign-in"
          id="sign-in"
        />
      </div>
    </form>
  </div>
</div>

    </>
  )
}

export default ForgetPassword;
