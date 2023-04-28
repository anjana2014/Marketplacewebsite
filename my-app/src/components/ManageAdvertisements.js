import '../css/manage-advertisements.css'
import axios from "axios";
import React, { useState, useEffect } from "react";

const ManageAdvertisements = () => {
  useEffect(() => {
    getPosts();
    }, [])
    const [PostsList, setPostsList] = useState([]);
    const [posts, setPosts] = useState();
    const [postdesc,setPostsdesc]=useState('');
    
  async function getPosts() {
      const config = {
        method: 'get',
        url: 'http://localhost:8000/getPosts.php'
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
          url: 'http://localhost:8000/manageadvertisements.php',
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

    function delPostsForm(postId,posttitle) {
        
        axios({
          method: 'post',
          url: 'http://localhost:8000/deleteposts.php',
          headers: {
            'content-type': 'application/json'
          },
          data: { postId : postId }
        })
          .then(result => {
            if (result.data === "success") {
              alert("Posts" + posttitle + " is added deleted");
              
            }
            else {
              alert("Posts " + posttitle + " already deleted.");
              
            }
          })
          .catch(error => console.log(error));
      
      
    }

  
  return (
    <>
<div className="mb-main-div">
  <div className="main-title">Manage Posts</div>
  <div className="mb-content-div">
    <div className="mb-sub-content">
      <div>
        <div className="sub-title">New Post</div>
        <form onSubmit={addPostsForm}>
          <div className="add-advertisement">
            <div className="mb-single-option">
              <div>
                <label htmlFor="add-adv-name" style={{ fontSize: 15 }}>
                  Name for new Post:
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Advertisement Title"
                  autoComplete="off"
                  required
                  name="add-adv-name"
                  id="add-adv-name"
                  value={posts}
                  onChange={e => setPosts(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-single-option">
              <div>
                <label htmlFor="add-adv-name" style={{ fontSize: 15 }}>
                  Enter Post description
                </label>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Advertisement Description"
                  autoComplete="off"
                  required
                  name="add-adv-name"
                  id="add-adv-name"
                  value={postdesc}
                  onChange={e => setPostsdesc(e.target.value)}
                />
              </div>
            </div>
            <div className="button-div">
              <div>
                <button type="post" className="mma-post-btn">
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="mb-content-div">
        <div className="mb-single-option">
          <div className="delete-advertisement">
            <div className="mb-sub-content">
              <div>
                <div className="sub-title">Delete an Posts</div>
                <div className="delete-adv-title" />
                <table className="styled-table" id="adv-table">
                  <thead>
                    <tr>
                      <td>Title</td>
                      <td>Description</td>
                      <td>Actions</td>
                    </tr>
                  </thead>
                  <tbody>
                  {PostsList.length > 0 ? PostsList.map((i,index)=>
                      <tr key={index}>
                        <td >{i.PostTitle}</td>
                        <td>{i.PostDesc}</td>
                      
                        
                        <td> <button type="buy" className="mma-buy-btn" onClick={() => delPostsForm(i.postId,i.PostTitle)} >Delete Post</button>
                          </td>
                        
                      </tr>
                    ) : <tr><td colSpan={5}>Sorry! There are no posts posted. Please create new to view them here.</td></tr>}
                 
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

export default ManageAdvertisements;