import React from "react";
import { Link } from "react-router-dom";
import LogoNS from "../assets/LogoNS.png";
import "./Navbar.css"

const Navbar = () => {
  const closeMobileMenu = () => {
    const navbar = document.getElementById("navbarNav");
    if (navbar && navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top  custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/" onClick={closeMobileMenu}>
          <img
            src={LogoNS}
            alt="logo"
            width="32"
            height="32"
            className="d-inline-block align-top brand-logo"
          />
          <span className="brand-title">Northern Sky</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ourpurpose" onClick={closeMobileMenu}>
                Our Purpose
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/location" onClick={closeMobileMenu}>
                Location
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/services" onClick={closeMobileMenu}>
                Services
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/projects" onClick={closeMobileMenu}>
                What We Do
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/why" onClick={closeMobileMenu}>
                Why Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={closeMobileMenu}>
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
