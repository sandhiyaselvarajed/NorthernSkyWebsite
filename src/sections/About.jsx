// Leadership + growth journey
import { leaders, milestones } from "../data/site";
import Img from "../lib/Img";
import { hasImage } from "../lib/images";
import { useReveal } from "../lib/useReveal";

const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

export default function About() {
  const ref = useReveal();
  const shown = leaders.filter((l) => !l.hidden);
  return (
    <section id="about" className="section section--tint" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Leadership</p>
          <h2>{shown.length > 1 ? "Founder-led, with field and systems experience." : "Founder-led, with deep field experience."}</h2>
        </div>
        <ul className={`leaders ${shown.length === 1 ? "leaders--single" : ""}`}>
          {shown.map((l) => (
            <li className="leader" key={l.name} data-reveal>
              <div className="leader-photo">
                {hasImage(l.photo) ? <Img name={l.photo} alt={l.name} sizes="120px" preferWidth={480} /> : <span aria-hidden="true">{initials(l.name)}</span>}
              </div>
              <div>
                <h3>{l.name}</h3>
                <p className="leader-role">{l.role} · {l.discipline}</p>
                <p>{l.bio}</p>
                <p className="leader-focus">{l.focus}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="journey" data-reveal>
          <h3 className="journey-title">Our journey</h3>
          <ol className="journey-track">
            {milestones.map((m) => (
              <li key={m.year} className="journey-item">
                <span className="journey-year">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
