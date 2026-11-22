import { whyUs, teamStats, fleet } from "../data/site";
import Img from "../lib/Img";
import { useReveal } from "../lib/useReveal";

export default function WhyUs() {
  const ref = useReveal();
  return (
    <section id="why" className="section" ref={ref}>
      <div className="container">
        <div className="why-top">
          <div data-reveal>
            <p className="eyebrow">Why Northern Sky</p>
            <h2>A lean team that controls its own site.</h2>
            <ul className="why-list">
              {whyUs.map((w) => (
                <li key={w.title}><h3>{w.title}</h3><p>{w.text}</p></li>
              ))}
            </ul>
          </div>
          <div className="why-media" data-reveal>
            <Img name="structures-mixer" alt="Self-loading concrete mixer working between solar structure rows on a Northern Sky site" sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </div>

        {(teamStats.length > 0 || fleet.length > 0) && (
          <div className="team-groups">
            {teamStats.length > 0 && (
              <div>
                <h4>Our people</h4>
                <div className="team-grid" style={{ "--cols": Math.min(teamStats.length, 3) }}>
                  {teamStats.map((t) => (
                    <div className="team-stat" key={t.label}><strong>{t.value}</strong><span>{t.label}</span></div>
                  ))}
                </div>
              </div>
            )}
            {fleet.length > 0 && (
              <div>
                <h4>Our own equipment</h4>
                <div className="team-grid" style={{ "--cols": Math.min(fleet.length, 4) }}>
                  {fleet.map((f) => (
                    <div className="team-stat team-stat--fleet" key={f.name}><strong>{f.count}</strong><span>{f.name}</span></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
