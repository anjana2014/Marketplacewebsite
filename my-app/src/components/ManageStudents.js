import React, { useState, useEffect } from "react";
import '../css/manage-student-schoolAdmin.css';
import axios from "axios";
import { Link } from "react-router-dom";

const ManageStudents = () => {
  useEffect(() => {
    getPosts();
    }, [])
    const [PostsList, setPostsList] = useState([]);
    const [posts, setPosts] = useState();
    const [postdesc,setPostsdesc]=useState('');
    
  async function getPosts() {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/managestudents.php'
      }
  
      let res = await axios(config)
      setPostsList(res.data);
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

    function addPostsForm(e) {
      let regex = /^[a-zA-Z ]*$/;
      if (posts.trim().match(regex)) {
        axios({
          method: 'post',
          url: 'http://localhost:8000/manageBusinessAdvertisments.php',
          headers: {
            'content-type': 'application/json'
          },
          data: { posts: posts,postdesc:postdesc,createdBy:currentUser.userId }
        })
          .then(result => {
            if (result.data === "success") {
              alert("Posts" + posts + " is added successfully.");
              
            }
            else {
              alert("Posts " + posts + " already exists.");
              
            }
          })
          .catch(error => console.log(error));
      }
      else {
        alert("Only letters and spaces allowed in Club name");
      }
      setPosts('');
      setPostsdesc('');
      e.preventDefault();
    }

    function delPostsForm(userId,firstName) {
        
        axios({
          method: 'post',
          url: 'http://localhost:8000/deletestudents.php',
          headers: {
            'content-type': 'application/json'
          },
          data: { userId : userId }
        })
          .then(result => {
            if (result.data === "success") {
              alert("student" + firstName + " is deleted");
              
            }
            else {
              alert("student " + firstName + " already deleted.");
              
            }
          })
          .catch(error => console.log(error));
      
      
    }

  
  return (
 
    <>
<div className="mb-main-div">
  <div className="main-title">Manage Students</div>
  <div className="mb-content-div">
    <div className="mb-sub-content">
      <div className="mb-content-div">
        <div className="mb-single-option">
          <div className="delete-advertisement">
            <div className="mb-sub-content">
              <div>
                <div className="sub-title">Delete an Student</div>
                <div className="delete-adv-title" />
                <table className="styled-table" id="adv-table">
                  <thead>
                    <tr>
                      <td>firstName</td>
                      <td>LastName</td>
                      <td>Email</td>
                      <td>phoneNumber</td>
                      <td>Registered Date</td>
                      <td>Action</td>
                    </tr>
                  </thead>
                  <tbody>
                  {PostsList.length > 0 ? PostsList.map((i,index)=>
                      <tr key={index}>
                        <td >{i.firstName}</td>
                        <td>{i.lastName}</td>
                        <td>{i.email}</td>
                        <td>{i.phoneNumber}</td>
                        <td>{i.registered}</td>
                      
                        
                        <td> <button type="buy" className="mma-buy-btn" onClick={() => delPostsForm(i.userId,i.firstName)} >Delete Student</button>
                          </td>
                        
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no Students. Please create new to view them here.</td></tr>}
                 
                  </tbody>
                </table>
              </div>
            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            

    </>
  )
}

export default ManageStudents;