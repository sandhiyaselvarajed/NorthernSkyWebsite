import { careers } from "../data/site";
import Img from "../lib/Img";
import { useReveal } from "../lib/useReveal";

export default function Careers() {
  const ref = useReveal();
  const subject = encodeURIComponent("Job application – [role]");
  return (
    <section id="careers" className="section" ref={ref}>
      <div className="container careers">
        <div className="careers-media" data-reveal>
          <Img name="fencing-install" alt="Northern Sky site team installing fence posts" sizes="(max-width: 900px) 100vw, 40vw" />
        </div>
        <div data-reveal>
          <p className="eyebrow">Careers</p>
          <h2>Build India&apos;s energy transition with us.</h2>
          <ul className="check-list">
            {careers.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <h3 className="careers-sub">Roles we hire for</h3>
          <ul className="role-tags">
            {careers.roles.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <p className="careers-note">{careers.note} {careers.howToApply}</p>
          <a className="btn btn-dark" href={`mailto:${careers.email}?subject=${subject}`}>Send your CV</a>
        </div>
      </div>
    </section>
  );
}
