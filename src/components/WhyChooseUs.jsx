import React from "react";
import "./WhyChooseUs.css";

import img5 from "../assets/fencing_solar/fs23.jpg";
import img1 from "../assets/fencing_solar/fs1.JPG";
import img3 from "../assets/fencing_solar/solarpanel6.png";
import img4 from "../assets/site5.jpg";
import img2 from "../assets/northersky6.jpg"
import img6 from "../assets/solorns1.jpg"

const WhyChooseUs = () => {
  const features = [
    "Experienced project teams for professional site coordination.",
    "Practical monitoring and controls for dependable progress.",
    "Cost-conscious execution from design support to handover."
  ];

  return (
    <section className="why-section">
      <div className="container">
        <div className="section-heading">
          <p className="section-eyebrow">Why Northern Sky</p>
          <h2 className="heading">A lean partner for serious renewable energy work.</h2>
          <p className="tagline">
            6+ years of renewable execution experience with a focus on quality, safety, and timelines.
          </p>
        </div>

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
    </section>
  );
};

export default WhyChooseUs;
