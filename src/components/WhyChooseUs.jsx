import React from "react";
import img from "../assets/northersky6.jpg"

const WhyChooseUs = () => {
  const features = [
    "In-house experts driving professional project management.",
    "Advanced technology ensuring continuous monitoring.",
    "Cost-effective solutions from design to delivery."
  ];

  // const machineries = [
  //   "Self Loading Concrete Mixer",
  //   "Auger Drilling Machine",
  //   "Tipper",
  //   "JCB",
  //   "Excavator Loader",
  //   "Vibratory Roller",
  //   "M60 Batching Plant",
  //   "CP45 Batching Plant",
  //   "Static Pump 1200",
  //   "Boom Pump",
  //   "Transit Mixer"
  // ];

  return (
    <div className="container py-5">
      <style>{`
        .heading {
          color: #002060;
          font-size: 3rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .tagline {
          font-size: 22px;
          font-weight: 400;
          color: #92D050;
          text-align: center;
          font-family:"roboto"
          margin-bottom: 10rem;
        }

        .features-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .feature-card {
          background: linear-gradient(135deg, #92D050 0%, #002060  100%);
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          color: white;
          font-size: 1.1rem;
          transform: translateY(0);
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease forwards;
          opacity: 0;
        }

        .feature-card:nth-child(1) {
          animation-delay: 0.1s;
        }

        .feature-card:nth-child(2) {
          animation-delay: 0.3s;
        }

        .feature-card:nth-child(3) {
          animation-delay: 0.5s;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        .machinery-section {
          margin-top: 4rem;
          position: relative;
        }

        .machinery-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #002060;
          text-align: center;
          margin-bottom: 2rem;
        }

        .machinery-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 20px;
          margin-bottom: 2rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .machinery-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          list-style: none;
          padding: 0;
        }

        .machinery-item {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          padding: 1.2rem;
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          font-size: 1.4rem;
          font-weight: 500;
          color: #002060;
          transition: all 0.3s ease;
          animation: slideInLeft 0.6s ease forwards;
          opacity: 0;
        }

        .machinery-item:nth-child(1) { animation-delay: 0.1s; }
        .machinery-item:nth-child(2) { animation-delay: 0.2s; }
        .machinery-item:nth-child(3) { animation-delay: 0.3s; }
        .machinery-item:nth-child(4) { animation-delay: 0.4s; }
        .machinery-item:nth-child(5) { animation-delay: 0.5s; }
        .machinery-item:nth-child(6) { animation-delay: 0.6s; }
        .machinery-item:nth-child(7) { animation-delay: 0.7s; }
        .machinery-item:nth-child(8) { animation-delay: 0.8s; }
        .machinery-item:nth-child(9) { animation-delay: 0.9s; }
        .machinery-item:nth-child(10) { animation-delay: 1s; }
        .machinery-item:nth-child(11) { animation-delay: 1.1s; }

        .machinery-item:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.25);
          border-color: #667eea;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .heading {
            font-size: 2rem;
          }

          .tagline {
            font-size:10px;
            padding:20px;
            font-weigth:20;

          }

          .features-container {
            grid-template-columns: 1fr;
          }

          .machinery-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <h2 className="heading">Why Choose Us</h2>

      <p className="tagline">"POWERING THE FUTURE WITH 6+ YEARS OF RENEWABLE EXPERTISE"</p>

      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature-card">
            {feature}
          </div>
        ))}
      </div>

      <div className="machinery-section">
        {/* <h3 className="machinery-title">Machineries</h3> */}
        
        <img 
          src={img}
          alt="Construction Machinery" 
          className="machinery-image"
        />

        {/* <ul className="machinery-list">
          {machineries.map((item, index) => (
            <li key={index} className="machinery-item">
              {item}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default WhyChooseUs;