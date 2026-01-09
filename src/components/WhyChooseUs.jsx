import React from "react";
import "./WhyChooseUs.css";

import img1 from "../assets/fencing_solar/fs23.jpg";
import img2 from "../assets/fencing_solar/fs1.JPG";
import img3 from "../assets/fencing_solar/solarpanel6.png";
import img4 from "../assets/site5.jpg";
import img5 from "../assets/fencing_solar/solarpanel5.png"
import img6 from "../assets/solorns1.jpg"

const WhyChooseUs = () => {
  const features = [
    "In-house experts driving professional project management.",
    "Advanced technology ensuring continuous monitoring.",
    "Cost-effective solutions from design to delivery."
  ];

  return (
    <div className="container py-5">

      <h2 className="heading">Why Choose Us</h2>
      <p className="tagline">
        POWERING THE FUTURE WITH 6+ YEARS OF RENEWABLE EXPERTISE
      </p>

      <div className="features-container">
        {features.map((item, index) => (
          <div key={index} className="feature-card">
            {item}
          </div>
        ))}
      </div>

      <div className="collage-wrapper">
        <div className="collage">
          <img src={img1} alt="Solar fencing" className="collage-img img-1" />
          <img src={img2} alt="Site work" className="collage-img img-2" />
          <img src={img3} alt="Solar panel" className="collage-img img-3" />
          <img src={img4} alt="Construction site" className="collage-img img-4" />
          <img src={img5} alt="Solar installation" className="collage-img img-5" />
          <img src={img6} alt="Solar fencing site" className="collage-img img-6" />
        </div>
      </div>

    </div>
  );
};

export default WhyChooseUs;
