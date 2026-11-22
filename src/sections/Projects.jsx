import { projects, trackRecord } from "../data/site";
import Img from "../lib/Img";
import { useReveal } from "../lib/useReveal";

function Card({ p }) {
  return (
    <li className="project-card">
      <div className={`project-media ${p.image ? "" : "project-media--plain"}`}>
        {p.image ? (
          <Img name={p.image} alt={`${p.client} project site`} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 20vw" preferWidth={480} />
        ) : (
          <span className="project-media-label" aria-hidden="true">{p.asset}</span>
        )}
        <span className={`badge badge--${p.status.toLowerCase()}`}>{p.status === "Ongoing" ? "On site now" : "Completed"}</span>
      </div>
      <div className="project-body">
        <p className="project-asset">{p.asset}</p>
        <h3>{p.client}</h3>
        <p className="project-scope">{p.scope}</p>
        <p className="project-loc">{p.location}</p>
      </div>
    </li>
  );
}

export default function Projects() {
  const ref = useReveal();
  const ongoing = projects.filter((p) => p.status === "Ongoing");
  const done = projects.filter((p) => p.status === "Completed");
  return (
    <section id="projects" className="section section--tint" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Projects</p>
          <h2>Proof on the ground.</h2>
          <p className="lead">{ongoing.length} projects on site right now, and {done.length + trackRecord.length}+ delivered for India&apos;s leading developers.</p>
        </div>
        <h3 className="group-title" data-reveal>On site now</h3>
        <ul className="project-grid">{ongoing.map((p) => <Card key={p.id} p={p} />)}</ul>
        <h3 className="group-title" data-reveal>Completed</h3>
        <ul className="project-grid">{done.map((p) => <Card key={p.id} p={p} />)}</ul>

        {trackRecord.length > 0 && (
          <details className="track">
            <summary>More track record ({trackRecord.length} earlier projects as sub-contractor)</summary>
            <p className="track-note">Packages delivered for main contractors on these clients&apos; sites. Not included in our headline figures.</p>
            <div className="track-scroll">
              <table>
                <thead>
                  <tr><th>Customer</th><th>Type</th><th>Location</th><th>Size</th><th>Scope</th></tr>
                </thead>
                <tbody>
                  {trackRecord.map((r, i) => (
                    <tr key={i}>
                      <td><strong>{r.customer}</strong>{r.via && <small>via {r.via}</small>}</td>
                      <td>{r.type}</td><td>{r.location}</td><td className="nowrap">{r.size}</td><td>{r.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        )}
      </div>
    </section>
  );
}
