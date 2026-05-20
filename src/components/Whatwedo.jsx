import React, { useState } from "react";
import Projects from "./Projects";
import "./Whatwedo.css";

import swelect from "../assets/I and C/Pic_2.jpg";
import valente from "../assets/I and C/solor1.jpeg";
import adani from "../assets/site7.jpg";
import ayana1 from "../assets/fencing_solar/solarpanel3.png";
import avaada from "../assets/solorns2.jpg";
import ayana2 from "../assets/ns-site6.jpg";
import faben from "../assets/I and C/northersky9.jpg";
import Evolta from "../assets/I and C/Pic 3 1.jpg";
import Resolven from "../assets/fencing_solar/solarpanel5.png";
import Cleanmax from "../assets/solorns5.jpeg";

const projectVal = [
  { id: 8, name: "Evolta Energy", client: "Solar I&C, Internal Pathways, Fencing", capacity: "50+ MW", status: "Ongoing", image: Evolta },
  { id: 1, name: "Swelect Energy", client: "Solar I&C, Internal Pathways, Fencing", capacity: "25+ MW", status: "Ongoing", image: swelect },
  
  { id: 9, name: "Resolven", client: "Fencing, Roadworks, Infrastructure", capacity: "", status: "Ongoing", image: Resolven },
  { id: 2, name: "Valente Lifespace", client: "Fencing", capacity: "50KM+", status: "Ongoing", image: valente },
  { id: 10, name: "Cleanmax", client: "Fencing", capacity: "15+ KM", status: "Ongoing", image: Cleanmax },
  { id: 3, name: "Adani Green Energy", client: "Solar Civil & Fencing", capacity: "250 MW", status: "Completed", image: adani },
  { id: 4, name: "Ayana Renewables", client: "Solar Civil & Fencing", capacity: "362.5 MW", status: "Completed", image: ayana1 },
  { id: 5, name: "Avaada Energy", client: "Solar Civil & Fencing", capacity: "75 MW", status: "Completed", image: avaada },
  { id: 6, name: "Ayana Renewables", client: "Solar Civil & Fencing", capacity: "300 MW", status: "Completed", image: ayana2 },
  { id: 7, name: "Faben India", client: "WTG Foundation", capacity: "300 MW", status: "Completed", image: faben },
];

const Whatwedo = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const filteredProjects =
    filter === "All"
      ? projectVal
      : projectVal.filter((p) => p.status === filter);

  return (
    <section className="whatwedo-section">
      <div className="section-heading">
        <p className="section-eyebrow">Proof of work</p>
        <h2 className="section-title">Selected renewable energy projects.</h2>
        <p className="section-intro">
          Utility-scale delivery experience across respected energy clients and varied site scopes.
        </p>
      </div>

      <div className="filter-buttons" aria-label="Filter projects">
        {["All", "Completed", "Ongoing"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {filteredProjects.map((project) => (
          <Projects
            key={project.id}
            {...project}
            onClick={() => setSelected(project)}
          />
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <img src={selected.image} alt={selected.name} />
            <h3>{selected.name}</h3>
            <p><b>Client:</b> {selected.client}</p>
            <p><b>Capacity:</b> {selected.capacity}</p>
            <p className={`status ${selected.status.toLowerCase()}`}>
              {selected.status}
            </p>
            <button onClick={() => setSelected(null)} type="button">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Whatwedo;
