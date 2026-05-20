import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
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
import img12 from "../assets/fencing_solar/solarpanal1.png";

const images = [img11, img1, img9, img12, img2, img3, img4, img5, img6, img7, img8, img10];

const Home = () => {
  return (
    <section className="home-root">
      <Carousel
        fade
        controls={false}
        indicators={false}
        interval={3500}
        pause={false}
        className="home-carousel"
      >
        {images.map((img, index) => (
          <Carousel.Item key={index}>
            <div className="home-bg" style={{ backgroundImage: `url(${img})` }} />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="home-overlay" />

      <div className="home-content container">
        <div className="home-copy">
          <p className="home-eyebrow">Renewable energy construction partner</p>
          <h1>Execution-ready solar and wind civil infrastructure.</h1>
          <p className="home-lead">
            Northern Sky delivers installation, commissioning, fencing, civil works,
            roads, drains, control buildings, WTG foundations, and site-ready
            infrastructure for renewable energy projects.
          </p>

          <div className="home-actions">
            <Link to="/contact" className="home-btn home-btn-primary">Start a project</Link>
            <Link to="/projects" className="home-btn home-btn-secondary">View work</Link>
          </div>
        </div>

        <aside className="home-proof" aria-label="Northern Sky proof points">
          <div className="home-proof-label">Proven delivery</div>
          <div className="home-stats">
            <div className="home-stat-card">
              <h2>500+ MW</h2>
              <p>Solar PV project experience</p>
            </div>
            <div className="home-stat-card">
              <h2>150+ MW</h2>
              <p>Wind WTG foundation service</p>
            </div>
            <div className="home-stat-card">
              <h2>100+ KM</h2>
              <p>Single location fencing service</p>
            </div>
            <div className="home-stat-card">
              <h2>10+</h2>
              <p>Years of renewable expertise</p>
            </div>
          </div>
          <p className="home-note">
            Trusted by renewable energy teams for time-bound execution, quality,
            and safety on utility-scale sites.
          </p>
        </aside>
      </div>
    </section>
  );
};

export default Home;
