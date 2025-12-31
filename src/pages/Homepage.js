import React from 'react';
import Home from "../components/Home";
import Nsmarquess from "../components/Nsmarquee";
import About from '../components/About';
// import Contact from '../components/Contact'

const Homepage = () => {
    return (
        <>
            <Home />
            <Nsmarquess />
            <About/>
            {/* <Contact/> */}
        </>
    );
};

export default Homepage;