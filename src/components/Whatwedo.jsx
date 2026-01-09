import React, { useState } from "react";
import Projects from "./Projects";
import "./Whatwedo.css";

import swelect from "../assets/fencing_solar/fs21.jpg";
import valente from "../assets/fencing_solar/solarpanal1.png";
import adani from "../assets/site7.jpg";
import ayana1 from "../assets/fencing_solar/solarpanel3.png";
import avaada from "../assets/solorns2.jpg";
import ayana2 from "../assets/ns-site6.jpg";
import faben from "../assets/fencing_solar/solarpanel5.png";

const Whatwedo = () => {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const projectVal = [
    { id: 1, name: "Solar – Swelect", client: "Swelect Energy", capacity: "5 MW", status: "Ongoing", image: swelect },
    { id: 2, name: "Solar – Valente Lifespace", client: "Valente Pvt Ltd", capacity: "500 MW", status: "Ongoing", image: valente },
    { id: 3, name: "Solar – Adani Green Energy", client: "Adani", capacity: "250 MW", status: "Completed", image: adani },
    { id: 4, name: "Solar – Ayana Kadapa", client: "Ayana Renewables", capacity: "362.5 MW", status: "Completed", image: ayana1 },
    { id: 5, name: "Solar –Avaada Energy", client: "Avaada Group", capacity: "75 MW", status: "Completed", image: avaada },
    { id: 6, name: "Solar –Ayana Renewables", client: "Ayana", capacity: "300 MW", status: "Completed", image: ayana2 },
    { id: 7, name: "Solar –Faben India", client: "Faben India", capacity: "300 MW", status: "Completed", image: faben },
  ];

  const filteredProjects =
    filter === "All"
      ? projectVal
      : projectVal.filter((p) => p.status === filter);

  return (
    <section className="whatwedo-section">
      <h2 className="section-title">Our Projects</h2>

      <div className="filter-buttons">
        {["All", "Completed", "Ongoing"].map((item) => (
          <button
            key={item}
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
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
            <button onClick={() => setSelected(null)} className="text-center">Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Whatwedo;
