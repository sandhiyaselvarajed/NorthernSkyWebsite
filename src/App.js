import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Missionvision from "./components/Missionvision"
import IndiaProjectsMap from "./components/IndiaProjectsMap";
import Services from "./components/Services";
import Projects from "./components/Projects";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
// import Comingsoon from "./components/Comingsoon";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/comingsoon" element={<Comingsoon />} /> */}
        <Route path="/ourpurpose" element={<Missionvision/>}/>
        <Route path="location" element={<IndiaProjectsMap/>}/>
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/why" element={<WhyChooseUs />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
