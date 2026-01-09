import React from "react";
import { Carousel } from "react-bootstrap";
import "./Home.css";

import img1 from "../assets/solor10.jpeg";
import img2 from "../assets/solor4.jpeg";
import img3 from "../assets/solor1.jpeg";
import img4 from "../assets/northersky5.jpg";
import img5 from "../assets/northersky1.jpg";
import img6 from "../assets/solorns5.jpeg";
import img7 from "../assets/ns-site1.jpg";
import img8 from "../assets/solorns1.jpg";
import img9 from "../assets/solorns3.jpg";
import img10 from "../assets/site5.jpg";
import img11 from "../assets/solor9.jpeg";
import img12 from "../assets/fencing_solar/solarpanal1.png"
// import img12 from "../assets/solor3.jpeg";  

const images = [img11,img11,img1,img9,img12,img2, img3, img4,img5,img11,img6,img7,img8,img10];

const Home = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "85vh",
        overflow: "hidden",
      }}
    >
      <Carousel
        fade
        controls={false}
        indicators={false}
        interval={3000}
        pause={false}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "85vh",
                filter: "brightness(0.65)",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div
        className="container-fluid h-100 d-flex align-items-center"
        style={{
          position: "relative",
          zIndex: 2,
        }}>
            <div className="row w-100">
            <div className="col-md-8 ps-5">
              <p className="animated-text mt-4">
                “Empowering Renewable Energy”
              </p>
              <p className="animated-text mb-4">
                “Tailored Civil Engineering Excellence for Sustainable Projects”
              </p>
            </div>
          </div>

          <div className="col-md-4 d-flex justify-content-md-end justify-content-center">
            {/* <h1>Hii everyone </h1> */}
             <div className="home-stats">
              <div className="home-stat-card">
                <h2>8+</h2>
                <p>Location Covered</p> 
              </div>
              <div className="home-stat-card">
                <h2>16+</h2>
                <p>Projects Completed</p>
              </div>
              <div className="home-stat-card">
                <h2>6+</h2>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Home;
