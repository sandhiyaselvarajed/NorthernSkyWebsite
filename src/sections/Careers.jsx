import { careers } from "../data/site";
import { useReveal } from "../lib/useReveal";

export default function Careers() {
  const ref = useReveal();
  const subject = encodeURIComponent("Job application – [role]");
  return (
    <section id="careers" className="section" ref={ref}>
      <div className="container careers">
        <div data-reveal>
          <p className="eyebrow">Why join us</p>
          <h2>Build India&apos;s energy transition with us.</h2>
          <ul className="check-list">
            {careers.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
        <div className="careers-card" data-reveal>
          <h3 className="careers-sub">Open roles</h3>
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
