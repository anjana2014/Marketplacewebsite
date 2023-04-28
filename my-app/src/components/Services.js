import React from "react";
import Navbar from "./Navbar";
import '../css/services.css'
import clublogo from '../assets/images/Clubs_LOGO.jpg'
import buyingimage from '../assets/images/buyingimage.jpg'
import sellingimage from '../assets/images/selling.jpg'
import businessimage from '../assets/images/business_center.png'
import students from '../assets/images/studentinteraction.jpg'
import queries from '../assets/images/questions.jpg'
const Services = () => {
  return (
    <>
      
      <div className="services">
        <div className="services-title">Services</div>
        <div className="contents">
          <div className="services-content-div">
            <div className="single-service">
              <div>
              <img
                src={clublogo}
                className="service-image"
                alt="Managing Business"
              />
              </div>
              <div className="service-title">Manage Clubs</div>
              <div className="service-desc">
              To join the clubs and to plan the activities.so that people can share their thoughts
              </div>
            </div>
            <div className="single-service">
              <div>
                <img
                   src={buyingimage}
                  className="service-image"
                  alt="Manage buildings"
                />
              </div>
              <div className="service-title">
              Buying Products
              </div>
              <div className="service-desc">
              Students can buy the products
              </div>
            </div>
            <div className="single-service">
              <div>
                <img
                   src={sellingimage}
                  className="service-image"
                  alt="Manage buildings"
                />
              </div>
              <div className="service-title">selling Products</div>
              <div className="service-desc">
                Students can sell the products
              </div>
            </div>
          </div>
          <div className="services-content-div">
            <div className="single-service">
              <div>
                <img
                  src={businessimage}
                  className="service-image"
                  alt="Manage buildings"
                />
              </div>
              <div className="service-title">Manage Business</div>
              <div className="service-desc">
                people can manage their business
              </div>
            </div>
            <div className="single-service">
              <div>
                <img
                  src={students}
                  className="service-image"
                  alt="Manage buildings"
                />
              </div>
              <div className="service-title">
              Exchange information between peers
              </div>
              <div className="service-desc">
              students can post the content.Exchange the ideas etc
              </div>
            </div>
            <div className="single-service">
              <div>
                <img
                  src={queries}
                  className="service-image"
                  alt="Manage buildings"
                />
              </div>
              <div className="service-title">Posting Queries</div>
              <div className="service-desc">
              Students can post their queries in the portal.And It will be answered by the Admins
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Services;