import PageHeader from "../sections/PageHeader";
import Highlights from "../sections/Highlights";
import Projects from "../sections/Projects";
import CtaBand from "../sections/CtaBand";

export default function ProjectsPage() {
  return (
    <>
      <PageHeader image="wtg-pour" eyebrow="Projects" title="Proven on utility-scale sites across India." lead="Solar installation & commissioning, transmission lines, wind foundations, BESS civil works, roads and 300+ km of fencing." />
      <Highlights title="Highlights from our sites." />
      <Projects />
      <CtaBand title="Have a similar project?" />
    </>
  );
}
