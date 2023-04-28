import React from "react";
import Navbar from "./Navbar";
import '../css/admin.css';
import { Link } from "react-router-dom";

const SchoolAdmin = () => {
  return (
    <>
      
      <div className="main-div">
        <div className="main-title">Hello SchoolAdmin!</div>
        <div className="admin-contents">
          <div className="admin-content-div">
            <Link to="/managestudents">
              <div className="admin-single-option">Manage Students</div>
            </Link>
            <Link to="/manageBusinessOwner">
              <div className="admin-single-option">Manage Business Owners</div>
            </Link>
            <Link to="/moderateclubs">
              <div className="admin-single-option">Moderate Clubs</div>
            </Link>
            <Link to="/moderateposts">
              <div className="admin-single-option">Moderate Posts</div>
            </Link>
            
          </div>
          <div className="admin-content-div">
            
           
            <Link to="/chat">
              <div className="admin-single-option">Chat</div>
            </Link>
           </div>
          
        </div>
      </div>
    </>
  )
}

export default SchoolAdmin;