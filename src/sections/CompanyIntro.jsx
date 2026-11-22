import { company, intro } from "../data/site";
import Img from "../lib/Img";
import { useReveal } from "../lib/useReveal";

export default function CompanyIntro() {
  const ref = useReveal();
  return (
    <section className="section" ref={ref}>
      <div className="container intro">
        <div data-reveal>
          <p className="eyebrow">Who we are</p>
          <h2>{intro.title}</h2>
          {intro.paragraphs.map((p) => <p className="intro-p" key={p.slice(0, 20)}>{p}</p>)}
          <ul className="intro-facts">
            <li><strong>{company.founded}</strong><span>Team executing since</span></li>
            <li><strong>Erode</strong><span>Head office, Chithode</span></li>
            <li><strong>Karur · Bengaluru</strong><span>Other offices</span></li>
          </ul>
        </div>
        <div className="intro-media" data-reveal>
          <Img name={intro.image} alt={intro.alt} sizes="(max-width: 900px) 100vw, 45vw" />
        </div>
      </div>
    </section>
  );
}
