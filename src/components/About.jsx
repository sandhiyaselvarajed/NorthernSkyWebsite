import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {FaCheck } from "react-icons/fa";
// import { FiArrowUpRight } from "react-icons/fi";
import "./About.css";
import companyBg from "../assets/solor3.jpeg";
import solarImage1 from "../assets/solor10.jpeg";
import solarImage2 from "../assets/solor4.jpeg";
import solarImage3 from "../assets/solor1.jpeg";

// logos
import logo1 from "../assets/adanilogo.webp"
import logo2 from "../assets/avaadalogo.webp"
import logo3 from "../assets/ayanalogo.webp"
import logo4 from "../assets/fourthpartnerenerylogo.webp"
import logo5 from "../assets/swelect.webp"



const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const element = textRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.8) {
        element.classList.add("reveal-active");
      } else {
        element.classList.remove("reveal-active");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="about-section">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <div data-aos="fade-right">
              <p data-aos="zoom-in-down" className="about-subtitle">
                About Northern Sky
              </p>
              <h2 data-aos="flip-up" className="about-title">
                Empowering Renewable <br /> Energy Through <br /> Excellence
              </h2>

              <div 
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine" 
                className="about-main-image"
              >
                <img
                  src={solarImage1}
                  alt="Northern Sky renewable energy"
                  className="about-image"
                />
                <div className="hover-overlay"></div>
              </div>
            </div>
          </div>

          
          <div className="col-lg-6">
            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="about-image-wrapper">
                  <img
                    data-aos="fade-right"
                    data-aos-offset="500"
                    data-aos-easing="ease-in-sine"
                    src={solarImage2}
                    alt="Solar installation"
                    className="about-grid-image"
                  />
                  <div className="hover-overlay"></div>
                </div>
              </div>
              <div className="col-6">
                <div className="about-image-wrapper">
                  <img
                    data-aos="fade-right"
                    data-aos-offset="400"
                    data-aos-easing="ease-in-sine"
                    src={solarImage3}
                    alt="Wind energy"
                    className="about-grid-image"
                  />
                  <div className="hover-overlay"></div>
                </div>
              </div>
            </div>

            <p 
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="500" 
              className="about-text"
            >
              We are a premier renewable energy installation and commissioning service
              company, founded by a team of experts with extensive experience at
              leading multinational renewable energy firms.
            </p>

            <p 
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="500" 
              className="about-text-secondary"
            >
              Based in Erode, we bring over 6 years of proven excellence in serving
              top-tier clients in the renewable energy sector. Our commitment to
              on-time project completion and dedication to quality and safety sets us
              apart.
            </p>

            {/* <button
              data-aos="zoom-in"
              className="watch-story-btn"
            >
              <div className="watch-icon">
                <FaPlay size={14} />
              </div>
              <p className="watch-text">Watch Our Story</p>
            </button> */}

            <div data-aos="fade-up" data-aos-anchor-placement="top-center" className="milestones-section">
              <h5 className="milestones-title">Key Milestones</h5>
              <div>
                {[
                  "2019 – Built our foundation as a trusted solar sub-contractor.",
                  "2020 – Stepped up with complete turnkey fencing solutions",
                  "2022 – Expanded into wind foundation works, powering renewable growth.",
                  "2024 – Partnered with global MNCs for large-scale utility solar projects.",
                  "2025 – Advanced as an I&C contractor delivering end-to-end solar infrastructure."
                ].map((item, i) => (
                  <div key={i} className="milestone-item">
                    <FaCheck className="milestone-icon" />
                    <span className="milestone-text">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              data-aos="fade-up"
              data-aos-anchor-placement="top-center" 
              className="row g-3 align-items-center contact-section"
            >
            </div>
          </div>
        </div>

<div
  className="group-companies-section text-center"
  style={{ backgroundImage: `url(${companyBg})` }}
  data-aos="fade-up"
>
  <div className="group-companies-content">
    <h3 className="group-companies-title">Our Clients</h3>

    <div className="logo-marquee">
      <div className="logo-track">
        <img src={logo1} alt="Adani" />
        <img src={logo2} alt="Avada" />
        <img src={logo3} alt="Ayana" />
        <img src={logo4} alt="Fourth Partner" />
        <img src={logo5} alt="Swelect" />
{/* 
        {/* <img src={logo1} alt="Adani" />
        <img src={logo2} alt="Avada" />
        <img src={logo3} alt="Ayana" />
        <img src={logo4} alt="Fourth Partner" />
        <img src={logo5} alt="Swelect" /> */}

        <img src={logo1} alt="Adani" />
        <img src={logo2} alt="Avada" />
        <img src={logo3} alt="Ayana" />
        <img src={logo4} alt="Fourth Partner" />
        <img src={logo5} alt="Swelect" /> 
      </div>
    </div>
  </div>
</div>


      </div>
    </section>
  );
};

export default About;