import React from 'react';
import Home from "../components/Home";
import Nsmarquess from "../components/Nsmarquee";
import About from '../components/About';
import Services from '../components/Services';
import Whatwedo from '../components/Whatwedo';
import WhyChooseUs from '../components/WhyChooseUs';
import Contact from '../components/Contact';

const Homepage = () => {
    return (
        <>
            <Home />
            <Nsmarquess />
            <About/>
            <Services />
            <Whatwedo />
            <WhyChooseUs />
            <Contact/>
        </>
    );
};

export default Homepage;
