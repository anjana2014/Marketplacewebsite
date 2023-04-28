import React, { useEffect } from "react";
import Navbar from "./Navbar";
import '../css/manage-clubs.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const ManageClubs = () => {
  useEffect(() => {
    getClubs();
    getClubMembers();
  }, [])
  const [ClubsList, setClubsList] = useState([]);
   const [ClubMemberDetails, setClubMemberDetails] = useState([]);
  // const [userDetailsList, setUserDetailsList] = useState([]);
  const [addClubs, setAddClubs] = useState('');
  const [newClubdesc,setNewclubDesc]=useState('');
  const [joinClub,setJoinClub]=useState('');
  const [rleaveclub,setRleaveclub]=useState('');
  const [leaveClub, setLeaveClub] = useState('');
  const [delClub, setDelClub] = useState('');


  async function getClubs() {
    const config = {
      method: 'get',
      url: 'http://localhost:8000/getClubs.php'
    }

    let res = await axios(config)
    setClubsList(res.data);
  }

  async function getClubMembers() {
   const config = {
    method:'get',
    url:'http://localhost:8000/getclubmembers.php'
   }
  
    let res= await axios(config)
    setClubMemberDetails(res.data)
 }

 
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
  let currentuserId;
  if(currentUser){
    currentuserId = currentUser.userId
  }
  else{
    currentuserId = null;
  }

  function addClubForm(e) {
    let regex = /^[a-zA-Z ]*$/;
    if (addClubs.trim().match(regex)) {
      axios({
        method: 'post',
        url: 'http://localhost:8000/addClubs.php',
        headers: {
          'content-type': 'application/json'
        },
        data: { newclub: addClubs,newdesc:newClubdesc }
      })
        .then(result => {
          if (result.data === "success") {
            alert("Club " + addClubs + " is added successfully.");
            getClubs();
          }
          else {
            alert("Club " + addClubs + " already exists.");
            console.log(ClubMemberDetails)
          }
        })
        .catch(error => console.log(error));
    }
    else {
      alert("Only letters and spaces allowed in Club name");
    }
    setAddClubs('');
    setNewclubDesc('');
    e.preventDefault();
  }

  function joinClubForm(e) {
    
    
      axios({
        method: 'post',
        url: 'http://localhost:8000/joinclub.php',
        headers: {
          'content-type': 'application/json'
        },
        data: {
          joinClub: joinClub,  createdBy: currentUser.userId
        }
      })
        .then(result => {

          if (result.data === "success") {
            alert("club " + joinClub + " is added successfully.");
            getClubMembers();
          }
          else {
            alert("club " + joinClub + " alredy exists.");
            console.log()
          }
        })
        .catch(error => console.log(error));
    
    
    setJoinClub('');
    e.preventDefault();
  }

   function leaveclubForm(e) {
    axios({
        method: 'post',
      url: 'http://localhost:8000/leaveclub.php',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        leaveClub:leaveClub,userId:currentUser.userId,rleaveclub:rleaveclub
      }
    })
      .then(result => {

        if (result.data === "success") {
          alert(" you leaved the club  successfully.");
        }
        else if (result.data === "you are not part of any clubs") {
          alert("You are not part of any clubs");
        }
        else {
          alert("Something went wrong. Try again");
        }
      })
      .catch(error => console.log(error));
      setRleaveclub('');
      setLeaveClub('');
      getClubMembers();
    e.preventDefault();

  }
  function deleteclubForm(e) {
    axios({
      method: 'post',
      url: 'http://localhost:8000/deleteclub.php',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        delClub: delClub
      }
    })
      .then(result => {

        if (result.data === "success") {
          alert("Club " + delClub + " was deleted  successfully.");
          getClubs();
        }
        else {
          alert("Something went wrong. Try again");
        }
      })
      .catch(error => console.log(error));
    setDelClub('');
    e.preventDefault();
  }
  return (
    currentRole === "Admin" || currentRole === "Student" ?
      <>
       
        <div className="mgp-main-div">
          <div className="main-title">Manage clubs</div>
          <div className="mgp-content">
            <div className="mgp-sub-content">
              <div>
                <div className="mgp-sub-title">Add a new Club</div>
                <form className="mgp-ctm-form" onSubmit={addClubForm}>
                  <div className="mgp-box">
                    <div className="mgp-single-option">
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="add-plant" style={{ fontSize: "15px" }}>Name of new Club</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter club name"
                          autoComplete="nope"
                          required
                          name="add-plant"
                          id="add-plant"
                          value={addClubs}
                          onChange={e => setAddClubs(e.target.value)}
                        />
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="add-plant" style={{ fontSize: "15px" }}>Description of new Club</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter club Desc"
                          autoComplete="nope"
                          required
                          name="add-plant"
                          id="add-plant"
                          value={newClubdesc}
                          onChange={e => setNewclubDesc(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="submit-btn btn">
                          Add Club
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="mgp-sub-title">Delete a club</div>
                <form className="mgp-ctm-form" onSubmit={deleteclubForm}>
                  <div className="mgp-box">
                    <div className="mgp-single-option">
                      <div>
                        <label htmlFor="del-garden" style={{ fontSize: "15px" }}>Name of the club</label>
                      </div>
                      <div>
                        <select
                          name="del-garden"
                          id="del-garden"
                          title="select a garden"
                          required
                          value={delClub}
                          onChange={e => setDelClub(e.target.value)}
                        >
                          <option disabled value=''>
                            -- Select a club --
                          </option>
                          {ClubsList.map(i => <option value={i.clubName}>{i.clubName}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="button-div">
                      <div>
                        <button type="submit" className="delete-btn btn">
                          Delete Club
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="mgp-sub-title">Leave a Club</div>
                <form className="mgp-ctm-form" onSubmit={leaveclubForm}>
                  <div className="mgp-box">
                    <div className="mgp-single-option">
                      <div>
                        <label htmlFor="del-plant" style={{ fontSize: "15px" }}>Name of the club</label>
                        
                      </div>
                      <div>
                        <select
                          name="del-plant"
                          id="del-plant"
                          title="select a plant"
                          required
                          value={leaveClub}
                          onChange={e => setLeaveClub(e.target.value)}
                        >
                          <option disabled value=''>
                            -- Select a club --
                          </option>
                           {ClubsList.map(i => <option value={i.clubName}>{i.clubName}</option>)} 
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        <label htmlFor="add-plant" style={{ fontSize: "15px" }}>Reason to Leave Club</label>
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Enter Reason to leave the club"
                          autoComplete="nope"
                          required
                          name="add-plant"
                          id="add-plant"
                          value={rleaveclub}
                          onChange={e => setRleaveclub(e.target.value)}
                        />
                      </div>
                  
                    <div className="button-div">
                      <div>
                        <button type="submit" className="delete-btn btn">
                          Leave a Club
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div>
                <div className="mgp-sub-title">Join to new Club</div>
                <form className="mgp-ctm-form" onSubmit={joinClubForm}>
                  <div className="mgp-box">
                    
                    <div className="mgp-single-option">
                      <div>
                        <label htmlFor="add-garden-building" style={{ fontSize: "15px" }}>Select a Club </label>
                      </div>
                      <div>
                        <select
                          name="add-garden-building"
                          id="add-garden-building"
                          title="select a building"
                          required
                          value={joinClub}
                          onChange={e => setJoinClub(e.target.value)}
                        >
                          <option disabled value=''>
                            -- Select a Club --
                          </option>
                          {ClubsList.map(i => <option value={i.clubName}>{i.clubName}</option>)}
                        </select>
                      </div>
                    </div>
                   
                    <div className="button-div">
                      <div>
                        <button type="submit" className="submit-btn btn">
                          join Club
                        </button>
                      </div>
                    </div>
                  </div >
                </form >
              </div >
            </div >
            <div className="garden-table">
              <div style={{ textAlign: "left" }}>Club Details</div>
              <div className="table-div">
                <table className="styled-table" id="garden-table">
                  <thead>
                    <tr>
                      <td>Club Name</td>
                      <td>First Name</td>
                      <td>Last Name</td>
                      <td>Phone Number</td>
                      
                    </tr>
                  </thead>
                  <tbody>
                       
                        {ClubMemberDetails.length > 0 ? ClubMemberDetails.map(i =>
                      <tr>
                        <td>{i.clubName}</td>
                        <td>{i.firstName}</td>
                        <td>{i.lastName}</td>
                        <td>{i.phoneNumber}</td>
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no clubs. Please create new to view them here.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </div >
        </div >
      </>
      :
      <>
        <div style={{ marginTop: "200px" }}>

          You are not authorised to access this page. Please
          <Link to="/login" style={{ color: "red" }}> login </Link> with admin or manager role to view this page.
        </div>

      </>
  )
}
export default ManageClubs;