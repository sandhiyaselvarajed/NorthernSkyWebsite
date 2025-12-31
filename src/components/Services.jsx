import React from "react";
import "./Services.css";
import { FaCheckCircle } from "react-icons/fa";

const services = [
  "Solar Power Project Concept to Commissioning",
  "Land Grading & Leveling",
  "Main Control Room Building / Inverter Shed / Switchyard",
  "Plant Fencing, Roads & Drains",
  "Installation & Commissioning",
  "Chain Link Fencing (In-house manufacturing)",
  "Fabricated Structural Steel (GI / Painted)",
  "Mesh, Barbed Wire, Line Wire, Razor Wire",
  "Precast Boundary Wall",
  "PEB Buildings",
  "WTG Civil Construction",
  "Liasoning Activities",
  "Temporary Roads for WTG",
  "WTG Foundation & Crane Pad",
  "Storage Yard Construction"
];

const Services = () => {
  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>

      <div className="services-grid">
        {services.map((item, index) => (
          <div className="service-card" key={index}>
            <FaCheckCircle className="service-icon" />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
