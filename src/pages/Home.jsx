import Hero from "../sections/Hero";
import ClientStrip from "../sections/ClientStrip";
import Highlights from "../sections/Highlights";
import Services from "../sections/Services";
import CtaBand from "../sections/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientStrip />
      <Highlights limit={3} showAll />
      <div className="section--tint"><Services compact /></div>
      <CtaBand />
    </>
  );
}
