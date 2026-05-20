import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";
import footerBg from "../assets/northersky3.jpg"; 


import fb from "../assets/Social_media_logo/fb.jpg.png";
import linkedin from "../assets/Social_media_logo/linkedin.jpg.png";
import insta from "../assets/Social_media_logo/instagram.jpg.png"
import google from "../assets/Social_media_logo/google.jpg.png"


const Contact = () => {
  return (
    <section
      className="contact"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="contact-overlay">
        <div className="contact-container">
          <div className="contact-section fade-in">
            <h4>Contact Us</h4>
            <p>
              <FaEnvelope className="icon" />
              <a href="mailto:contact@northernskydev.com">contact@northernskydev.com</a>
            </p>
            <p>
              <FaPhoneAlt className="icon" />
              <a href="tel:+919443918260">+91 9443918260</a>, 
              <a href="tel:+917845796145"> +91 7845796145</a>
            </p>
          </div>

          <div className="contact-section fade-in delay">
            <h4>Office Address</h4>
            <p>
              <a> Northern Sky Developers LLP </a></p>
              <p>29/6, Suriyampalayam, Rayapalayam Pudhur-1, Veerappanchathiram, Erode-638102
            </p>
            {/* <h4>Registered Address</h4>
            <p>
              <FaMapMarkerAlt className="icon" />
              4/102, Ulaipali Nagar, Andankovil, Karur, Tamil Nadu 639002
            </p>
            <p>
              <FaMapMarkerAlt className="icon" />
              06, Sri Krishna Nilaya, Sri Sai Layout, KR Puram, Bengaluru 560049
            </p> */}
          </div>
        </div>

        <div className="contact-bottom fade-in">
          <p>Ready to discuss a renewable energy project scope?</p>
          <div className="bottom_footer d-flex flex-column flex-md-row align-items-center justify-content-between">
            <p>Thank you for choosing Norther Sky</p>
            <div className="style_social_icons">
                <img src={linkedin} alt="LinkedIn" className="linkedin-icon" />
                <img src={fb} alt="Facebook" className="fb-icon" />
                <img src={insta} alt="Instagram" className="insta-icon" />
                <img src={google} alt="Google" className="google-icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
