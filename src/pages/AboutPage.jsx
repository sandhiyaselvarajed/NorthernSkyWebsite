import PageHeader from "../sections/PageHeader";
import CompanyIntro from "../sections/CompanyIntro";
import About from "../sections/About";
import WhyUs from "../sections/WhyUs";
import CtaBand from "../sections/CtaBand";

export default function AboutPage() {
  return (
    <>
      <PageHeader image="swelect-array" eyebrow="About us" title="Execution partner for utility-scale renewables." lead="Solar, transmission, wind and battery-storage site works across five states, delivered by our own crews and machines since 2019." />
      <CompanyIntro />
      <About />
      <WhyUs />
      <CtaBand />
    </>
  );
}
