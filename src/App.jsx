import { useEffect } from "react";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import WhatsAppButton from "./sections/WhatsAppButton";
import { usePath, ROUTES } from "./lib/router";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ProjectsPage from "./pages/ProjectsPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";
import LocationsPage from "./pages/LocationsPage";
import PrivacyPage from "./pages/PrivacyPage";

const PAGES = {
  "/": Home,
  "/about": AboutPage,
  "/services": ServicesPage,
  "/projects": ProjectsPage,
  "/locations": LocationsPage,
  "/careers": CareersPage,
  "/contact": ContactPage,
  "/privacy": PrivacyPage,
};

export default function App() {
  const path = usePath();
  const Page = PAGES[path] || Home;
  useEffect(() => { document.title = ROUTES[path] || ROUTES["/"]; }, [path]);
  return (
    <>
      <Navbar path={path} />
      <main id="main" key={path}>
        <Page />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
