import PageHeader from "../sections/PageHeader";
import Locations from "../sections/Locations";
import CtaBand from "../sections/CtaBand";

export default function LocationsPage() {
  return (
    <>
      <PageHeader image="virudhunagar-piling" eyebrow="Locations" title="Where we work." lead="Head office in Chithode, Erode, offices in Karur and Bengaluru, and crews mobilised to project sites across India." />
      <Locations />
      <CtaBand title="Have a site we should see?" />
    </>
  );
}
