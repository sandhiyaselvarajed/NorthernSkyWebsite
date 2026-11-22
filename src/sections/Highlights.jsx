// "Work highlights": LinkedIn-post style cards — a bold result, one real site photo, two lines of story.
import { highlights } from "../data/site";
import Img from "../lib/Img";
import { Link } from "../lib/router";
import { useReveal } from "../lib/useReveal";

export default function Highlights({ limit, title = "Recent work, in numbers.", showAll = false }) {
  const ref = useReveal();
  const list = limit ? highlights.slice(0, limit) : highlights;
  return (
    <section className="section" ref={ref}>
      <div className="container">
        <div className="section-head section-head--row" data-reveal>
          <div>
            <p className="eyebrow">Work highlights</p>
            <h2>{title}</h2>
          </div>
          {showAll && <Link to="/projects" className="text-link">See all projects →</Link>}
        </div>
        <ul className="highlight-grid">
          {list.map((h, i) => (
            <li className="highlight" key={h.title} data-reveal style={{ "--d": `${i * 80}ms` }}>
              <div className="highlight-media">
                <Img name={h.image} alt={h.alt} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" preferWidth={960} />
                <span className={`badge badge--${h.status.toLowerCase()}`}>{h.status === "Ongoing" ? "On site now" : "Completed"}</span>
              </div>
              <div className="highlight-body">
                <p className="highlight-tag">{h.tag} · {h.location}</p>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
