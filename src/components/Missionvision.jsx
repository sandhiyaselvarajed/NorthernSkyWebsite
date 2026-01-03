import React from "react";
import "./MissionVision.css";

const Missionvision = () => {
  return (
    <div className="mission-vision-container">
      {/* <h2 className="section-title text-center">Mission & Vision</h2> */}

      <div className="mv-wrapper">
        <div className="mv-card vision">
          <h3>Our Vision</h3>
          <p>
            To exceed client expectations by providing premium construction
            materials and services while embracing innovation and sustainability.
          </p>

          <p>
            We aim to build lasting relationships founded on trust and integrity,
            contributing to a safer and more sustainable future by ensuring that
            our projects leave a positive and lasting impact on communities and
            ecosystems worldwide.
          </p>

          <blockquote>
            “We strive to be at the forefront of the renewable energy revolution,
            providing solutions for a better future.”
          </blockquote>
        </div>

        <div className="mv-card mission">
          <h3>Our Mission</h3>
          <ul className="list-type">
            <li>
              To become the ultimate provider of complete renewable energy
              services, establishing a distinguished global presence.
            </li>
            <li>
              Advancing our business through a customer-focused approach and
              executing projects with industry-leading standards of quality,
              cost efficiency, and timeliness.
            </li>
            <li>
              Delivering projects with exemplary quality, cost-efficiency, and
              timeliness, ensuring precision and excellence from the outset.
            </li>
            <li>
              Integrating pioneering concepts while rigorously complying with
              Health, Safety, and Environmental standards.
            </li>
            <li>
              Providing unparalleled materials and services of the highest
              caliber.
            </li>
            <li>
              To achieve the highest level of excellence in everything we do.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Missionvision;
