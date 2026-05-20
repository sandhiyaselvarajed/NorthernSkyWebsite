import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./About.css";

import companyBg from "../assets/solor3.jpeg";
import solarImage1 from "../assets/I and C/Pic1.jpg";
import solarImage2 from "../assets/fencing_solar/solarbg.png";
import solarImage3 from "../assets/northersky8.jpg";

import logo1 from "../assets/adanilogo.webp";
import logo2 from "../assets/avaadalogo.webp";
import logo3 from "../assets/Ayana.png";
import logo4 from "../assets/sprng.png";
// import logo5 from "../assets/swelect.webp";
import swelect from "../assets/New Clients/swelect.webp";
import logo6 from "../assets/irconlogo.webp";
import renewpoer from "../assets/renewpoer.webp";
import evolta from "../assets/New Clients/Evolta.png";
import resolven from "../assets/New Clients/Resolven.png";
import cleanmax from "../assets/New Clients/cleanmax.webp";

const milestones = [
  {
    year: "2019",
    bullets: [
      "Established Northern Sky",
      "Appointed as a trusted solar sub-contractor",
      "Delivered initial projects within committed timelines",
    ],
  },
  {
    year: "2020",
    bullets: [
      "Launched turnkey fencing solutions",
      "Executed the first large-scale fencing project",
      "Expanded supply capacity to support 10 km of fencing works",
    ],
  },
  {
    year: "2022",
    bullets: [
      "Diversified operations into wind turbine foundation works",
      "Strengthened civil engineering service offerings",
      "Implemented enhanced safety standards and procedures",
    ],
  },
  {
    year: "2024",
    bullets: [
      "Collaborated with leading global multinational companies",
      "Delivered large-scale utility solar projects",
      "Executed high-volume I&C (Installation & Commissioning) scopes",
    ],
  },
  {
    year: "2025",
    bullets: [
      "Progressed as a full-scope I&C contractor",
      "Delivered end-to-end solar infrastructure solutions",
      "Successfully commissioned projects up to 50 MW capacity",
    ],
  },
  {
    year: "2026",
    bullets: [
      "Expanded Parallel into multiple locations across India",
      "Became a preferred partner for utility-scale solar and wind projects",
      "Successfully commissioned projects up to 100 MW capacity",
    ],
  },
];

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

              <h3 data-aos="flip-up" className="about-title">
                Built for renewable project execution.
              </h3>

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
              Northern Sky is a renewable energy installation,
              commissioning, and civil infrastructure company founded
              by professionals with experience across leading multinational
              renewable energy firms.
            </p>

            <p
              data-aos="fade-left"
              data-aos-anchor="#example-anchor"
              data-aos-offset="500"
              data-aos-duration="500"
              className="about-text-secondary"
            >
              Based in <span className="erode">Erode</span>, Tamil Nadu,
              we bring 8+ years of proven site execution for top-tier clients.
              Our work is focused on reliable timelines, quality control,
              safety, and practical field coordination from start to handover.
            </p>

          </div>


          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            className="milestones-section steps steps--no-line"
          >
            <h5 className="about-subtitle1">Our Growth Journey</h5>

            <div className="steps-wrap">
              {[...milestones, ...milestones].map((m, i) => (
                <article
                  key={i}
                  className="step-card"
                >
                  <span
                    className="step-corner step-corner--primary"
                    aria-hidden="true"
                  />

                  <span
                    className="step-corner step-corner--overlay"
                    aria-hidden="true"
                  />

                  <header className="step-head">
                    <span className="step-year">{m.year}</span>
                  </header>

                  <div className="step-body">
                    <ul className="step-list">
                      {m.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            className="row g-3 align-items-center contact-section"
          ></div>
        </div>

        <div
          className="group-companies-section text-center"
          style={{ backgroundImage: `url(${companyBg})` }}
          data-aos="fade-up"
        >
          <div className="group-companies-content">

            <h3 className="group-companies-title">
              Our Clients
            </h3>

            {/* <div className="logo-marquee">
              <div className="logo-track">
                <img src={logo1} alt="Adani" />
                <img src={logo2} alt="Avada" />
                <img src={logo3} alt="Ayana" />
                <img src={logo4} alt="Fourth Partner" />
                <img src={swelect} alt="Swelect" />
                <img src={logo6} alt="irpl" />
                <img src={renewpoer} alt="renewpower" />
                <img src={evolta} alt="Evolta" />
                <img src={resolven} alt="Resolven" />
                <img src={cleanmax} alt="Cleanmax" />
              </div>
            </div> */}
            <div className="logo-grid">

                <div className="client-logo">
                  <img src={logo1} alt="Adani" />
                </div>

                <div className="client-logo">
                  <img src={logo2} alt="Avada" />
                </div>

                <div className="client-logo">
                  <img src={logo3} alt="Ayana" />
                </div>

                <div className="client-logo">
                  <img src={logo4} alt="Fourth Partner" />
                </div>

                <div className="client-logo">
                  <img src={swelect} alt="Swelect" />
                </div>

                <div className="client-logo">
                  <img src={logo6} alt="irpl" />
                </div>

                <div className="client-logo">
                  <img src={renewpoer} alt="renewpower" />
                </div>

                <div className="client-logo">
                  <img src={evolta} alt="Evolta" />
                </div>

                <div className="client-logo">
                  <img src={resolven} alt="Resolven" />
                </div>

                <div className="client-logo">
                  <img src={cleanmax} alt="Cleanmax" />
                </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
