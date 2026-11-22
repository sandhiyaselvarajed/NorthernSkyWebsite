import PageHeader from "../sections/PageHeader";
import Services from "../sections/Services";
import Process from "../sections/Process";
import SiteScene from "../sections/SiteScene";
import CtaBand from "../sections/CtaBand";

export default function ServicesPage() {
  return (
    <>
      <PageHeader image="tl-foundation-work" eyebrow="Services" title="One team from boundary fence to grid connection." lead="Take a single package or hand us the whole site. Civil, electrical, transmission and fencing scopes, coordinated by one accountable team." />
      <Services />
      <Process />
      <SiteScene />
      <CtaBand />
    </>
  );
}
