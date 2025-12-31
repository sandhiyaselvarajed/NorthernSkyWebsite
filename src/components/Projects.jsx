import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaProjectDiagram,
  FaCog,
} from "react-icons/fa";
import "./Projects.css";

import img1 from "../assets/ns-site1.jpg";
import img2 from "../assets/solor9.jpeg";
import img3 from "../assets/site7.jpg";
import img4 from "../assets/ns-site2.jpg";
import img5 from "../assets/solorns2.jpg";
import img6 from "../assets/site4.jpg";
import img7 from "../assets/site6.jpg";
import img8 from "../assets/solor3.jpeg";
import img9 from "../assets/solor10.jpeg";
import img10 from "../assets/northersky5.jpg";

 
import irconLogo from "../assets/irconlogo.webp";
import swelectLogo from "../assets/swelect.webp";
import avaadaLogo from "../assets/avaadalogo.webp";
import renewLogo from "../assets/renewpoer.webp";
 
gsap.registerPlugin(ScrollTrigger);
 
const Projects = () => {
  const [selected, setSelected] = useState("current");
  const textRefs = useRef([]);
  const imageRefs = useRef([]);
 
  const currentProjects = [
    {
      companyLogo: irconLogo,
      title: "IRCON RENEWABLE POWER LTD",
      location: "Pavagada, Karnataka",
      project:
        "Supply & Erection of Chain Link Fencing for 500MW Solar PV Project",
      scope: [
        "Supply & Erection for 50KM Fencing",
        "Fabricated Structural steel with Galvanized finish",
        "Supply of Concertina coil",
        "Supply of GI barbed wire",
        "GI Mesh, Barbed Wire, Line Wire, Concertina Coil",
        "Marking, Drilling, Casting & Installation",
      ],
      machines: [img1, img2, img3],
    },
    {
      companyLogo: swelectLogo,
      title: "SWELECT ENERGY SYSTEMS LTD",
      location: "Mondipatti, Trichy",
      project: "Civil & DC Works for 5MW Solar Plant",
      scope: [
        "Main Control Building",
        "Transformer + Oil Soak Pit",
        "Precast Security Room & Internal Road",
        "Piling, MMS, Modules, DC Trench",
        "Supply & Erection Boundary Fencing",
        "Erection of Plant Gate Construction of Internal Road",
        "Construction of DC Trench",
        "Erection of Transformer",
        "Inverter and allied DC Cabling",
      ], 
      machines: [img4, img5, img6],
    },
  ];
 
  const pastProjects = [
    {
      companyLogo: avaadaLogo,
      title: "Avaada Clean Energy",
      location: "Gulbarga, Karnataka",
      capacity: "70 MW Solar Plant",
      scope: [
        "Construction of Piling",
        "Chain Link Fencing",
        "Erection of Mesh, Wire, Coil",
      ],
      machines: [img7, img8, img9],
    },
    {
      companyLogo: renewLogo,
      title: "Renew Power",
      location: "Gadag, Karnataka",
      capacity: "300 MW Wind Power Plant",
      scope: [
        "WTG Foundation Excavation",
        "PCC, RCC, Backfilling",
        "Anchor Flange Erection",
      ],
      machines: [img10, img2, img9],
    },
  ];
 
  const projects = selected === "current" ? currentProjects : pastProjects;
 
  useEffect(() => {
    textRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
 
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
          },
        }
      );
    });
  }, [selected]);
 
  return (
    <div className="projects-container container py-5">
      <div className="projects-toggle mb-5">
        <button
          onClick={() => setSelected("current")}
          className={`toggle-btn ${
            selected === "current" ? "current-active" : ""
          }`}
        >
          Current Projects
        </button>
        <button
          onClick={() => setSelected("past")}
          className={`toggle-btn ${
            selected === "past" ? "past-active" : ""
          }`}
        >
          Past Projects
        </button>
      </div>
 
      <div className="projects-grid">
        {projects.map((proj, i) => (
          <div key={i} className="project-row">

            <div
              className="project-text"
              ref={(el) => (textRefs.current[i] = el)}
            >
              <div className="company-header">
                <img
                  src={proj.companyLogo}
                  alt={proj.title}
                  className="company-logo"
                />
                <h3 className="company-title">{proj.title}</h3>
              </div>
 
              {proj.project && (
                <p>
                  <FaProjectDiagram className="icon" />{" "}
                  <strong className="p-3">Project:</strong> {proj.project}
                </p>
              )}
 
              <p>
                <FaMapMarkerAlt className="icon" />{" "}
                <strong className="p-3">Location:</strong> {proj.location}
              </p>
 
              {proj.capacity && (
                <p>
                  <FaCog className="icon" />{" "}
                  <strong>Capacity:</strong> {proj.capacity}
                </p>
              )}
 
              <h5>Scope of Work</h5>
 
              <div className="scope-list">
                {proj.scope.map((s, idx) => (
                  <p key={idx} className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">➤</span>
                    <span>{s}</span>
                  </p>
                ))}
              </div>
            </div>
            <div
              className="project-images"
              ref={(el) => (imageRefs.current[i] = el)}
            >
              {proj.machines.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Project ${idx}`}
                  className="carousel-img"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default Projects;
 