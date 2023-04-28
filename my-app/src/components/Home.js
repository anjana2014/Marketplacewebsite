import React from "react";
import Navbar from "./Navbar";
import '../css/home.css';
import background from '../assets/images/student.jpg'


const Home = () => {
  const myStyle={
    backgroundImage: `url(${background})` ,
    height:'100vh',
    marginTop:'-70px',
    fontSize:'50px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
};
  return (
    <>
      
      <div className="home-content" style={{ overflow: 'hidden', height: '100%' }}>
        <div className="home-container">

          <div className="homeImage" style={myStyle}>
            <div className="text">Welcome to New shopping Experience</div>
          </div>

          {/* <div className="image-sliderfade fade">
            <img
              src="../assets/images/home2.jpg"
              style={imgStyle}
            />
            <div className="text">AS WE EVOLVE, OUR HOMES SHOULD TOO</div>
          </div>

          <div className="image-sliderfade fade">
            <img
              src="../assets/images/home3.jpg"
              style={imgStyle}
            />
            <div className="text">AS WE EVOLVE, OUR HOMES SHOULD TOO</div>
          </div> */}
        </div>

        {/* <div style={{ textAlign: "center" }}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div> */}
      </div>
    </>
  )
}

export default Home;