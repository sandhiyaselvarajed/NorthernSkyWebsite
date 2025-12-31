import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Add this import
import Homepage from "./pages/Homepage";
// import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Comingsoon from "./components/Comingsoon";

const App = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar here - outside Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/comingsoon" element={<Comingsoon />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/why" element={<WhyChooseUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;