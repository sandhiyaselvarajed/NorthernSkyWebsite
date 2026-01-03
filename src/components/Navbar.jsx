
import React from "react";
import { Link } from "react-router-dom";
import LogoNS from "../assets/LogoNS.png";
// import { FaBluetooth } from "react-icons/fa";

const navbarStyles = {
  navbar: {
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease",
  },
  
  navLink: {
    color: "black",
    fontWeight: 400,
    fontSize: "clamp(0.5rem, 2vw, 1.1rem)",
    lineHeight: 1.2,
    textDecoration: "none",
    padding: "clamp(0.25rem, 0.6vw, 0.45rem) clamp(0.5rem, 1vw, 0.7rem)",
    borderRadius: "0.25rem",
    whiteSpace: "nowrap",
    fontFamily:"segoui UI",
  },
  navLinkHover: {
    color: "#9bc96aff",
  },
  // contactBtn: {
  //   backgroundColor: "#92D050",
  //   borderRadius: "5px",
  //   color: "black",
  //   fontWeight: 400,
  //   fontSize: "clamp(0.95rem, 2.2vw, 1.15rem)",
  //   lineHeight: 1.2,
  //   padding: "clamp(0.5rem, 1.1vw, 0.7rem) clamp(0.75rem, 1.4vw, 0.95rem)",
  //   marginLeft: "clamp(0.4rem, 2vw, 2rem)",
  //   display: "inline-flex",
  //   alignItems: "center",
  //   whiteSpace: "nowrap",
  //   textDecoration: "none",
  // },

  logo: {
    height: "clamp(2.625rem, 7vw, 4.5rem)",
    // marginRight: "clamp(0.1rem, 1vw, 0.1rem)",
    marginright:50,
    display: "flex",
    flexDirection: "left",
  },
  brandTitle: {
    fontSize: "clamp(1.1rem, 3vw, 1.6rem)",
    fontWeight: "bold",
    fontFamily: "Georgia",
    lineHeight: 1.15,
    margin: 0,
    color:"#002060",
    // color:"#00063d"
  },
  brand: {  
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    gap: "clamp(0.3rem, 1vw, 0.2rem)",
  },
  navList: {
    display: "flex",
    alignItems: "center",
    gap: "clamp(0.2rem, 0.8vw, 0.6rem)",
    margin: 0,
    padding: 0,
    listStyle: "none",
  },

  container: {
    paddingLeft: 0,
    paddingRight: 0,
  },

  toggler: {
    border: "1px solid #ccc",
    padding: "0.35rem",
  },
};

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navbarStyles.navbar}>
      <div className="container" style={navbarStyles.container}>
        <Link className="navbar-brand" to="/" style={navbarStyles.brand}>
          <img
            src={LogoNS}
            alt="logo"
            style={navbarStyles.logo}
          />
          <span style={navbarStyles.brandTitle}>Northern Sky</span>
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={navbarStyles.toggler}
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto" style={navbarStyles.navList}>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={navbarStyles.navLink}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ourpurpose" style={navbarStyles.navLink}>
                Our Purpose
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/location" style={navbarStyles.navLink}>
                Location
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/comingsoon" style={navbarStyles.navLink}>
                What We Do
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/sites" style={navbarStyles.navLink}>
                Location
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/why" style={navbarStyles.navLink}>
                Why Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" style={navbarStyles.navLink}>
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
