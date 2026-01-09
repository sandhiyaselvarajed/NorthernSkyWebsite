import React from "react";
import "./Projectcss.css"

const Projects = ({ name, client, capacity, status, image, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="img-box">
        <img src={image} alt={name} />
      </div>

      <div className="card-content">
        <h3>{name}</h3>
        {/* <p>{client}</p> */}
        <span>{capacity}</span>
        {/* <div className={`badge ${status.toLowerCase()}`}>{status}</div> */}
      </div>
    </div>
  );
};

export default Projects;
