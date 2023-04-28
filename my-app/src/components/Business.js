import React from "react";
import '../css/Student.css';
import { Link } from "react-router-dom";

const Student = () => {
  let currentUser;
  if (window.sessionStorage.getItem("userDetails")) {
    currentUser = JSON.parse(window.sessionStorage.getItem("userDetails"));
  }
  let currentRole;
  if (currentUser) {
    currentRole = currentUser.role
  }
  else {
    currentRole = null;
  }
  return (
    currentRole === "BusinessOwner" ?
    <>
      
      <div className="resident-home">
      <div className="resident-title">Hello {currentUser.firstName}! You are a {currentRole}.</div>
        <div className="contents">
          <div className="rv-content-div">
            <Link to="/manageBusiness">
              <div className="rv-single-option">Manage Business</div>
            </Link>
           
            <Link to="/manageBusinessAdvertisements">
              <div className="rv-single-option">Manage Advertisements</div>
            </Link>
            <Link to="/chat">
              <div className="rv-single-option">Chat</div>
            </Link>
          </div>
          
           
          </div>
        </div>
      
  
     </>
     :
     <>
       <div style={{ marginTop: "200px" }}>

         You are not authorised to access this page. Please
         <Link to="/login" style={{ color: "red" }}> login </Link> as Business Owner role to view this page.
       </div>
     </>
  )
};
export default Student;