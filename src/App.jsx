import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ClientStrip from "./sections/ClientStrip";
import Services from "./sections/Services";
import SiteScene from "./sections/SiteScene";
import Projects from "./sections/Projects";
import Process from "./sections/Process";
import WhyUs from "./sections/WhyUs";
import About from "./sections/About";
import Locations from "./sections/Locations";
import Careers from "./sections/Careers";
import Contact from "./sections/Contact";
import WhatsAppButton from "./sections/WhatsAppButton";

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <ClientStrip />
        <Services />
        <SiteScene />
        <Projects />
        <Process />
        <WhyUs />
        <About />
        <Locations />
        <Careers />
        <Contact />
      </main>
      <WhatsAppButton />
    </>
  );
}
