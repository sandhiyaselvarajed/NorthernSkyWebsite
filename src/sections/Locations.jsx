// Where we work: illustrated India map + state list. No map service, no API key.
import { useState } from "react";
import { locations, company } from "../data/site";
import { useReveal } from "../lib/useReveal";
import IndiaMap from "./IndiaMap";

export default function Locations() {
  const ref = useReveal();
  const [active, setActive] = useState(null);
  const sites = locations.filter((l) => !l.office);
  const byState = sites.reduce((acc, l) => {
    (acc[l.area] ||= []).push(l);
    return acc;
  }, {});
  const states = Object.entries(byState).sort((a, b) => b[1].length - a[1].length);

  return (
    <section id="locations" className="section" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Where we work</p>
          <h2>{sites.length} project locations across {states.length} states.</h2>
          <p className="lead">Offices in {company.offices.map((o) => o.replace(/\s*\(.*\)/, "")).join(", ")}, with crews mobilised wherever our clients build.</p>
        </div>
        <div className="where">
          <IndiaMap locations={locations} activeState={active} onPick={setActive} />
          <ul className="state-list">
            {states.map(([state, list]) => (
              <li
                key={state}
                className={`state-row ${active === state ? "is-active" : ""}`}
                onMouseEnter={() => setActive(state)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="state-head">
                  <h3>{state}</h3>
                  <span className="state-count">{list.length}</span>
                </div>
                <p className="state-sites-inline">
                  {list.map((l) => l.name).join(" · ")}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
