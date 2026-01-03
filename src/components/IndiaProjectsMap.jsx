import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import locations from "./locations";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const INDIA_BOUNDS = [
  [6.5, 68.0],
  [37.5, 97.5],
];

const IndiaProjectsMap = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <h2 style={{ textAlign: "center" }}>
        Projects Completed Across India
      </h2>

      <MapContainer
        center={[22.5, 82.8]}
        zoom={5}
        minZoom={4}
        maxZoom={7}
        maxBounds={INDIA_BOUNDS}
        maxBoundsViscosity={1.0}
        style={{ height: "100%", width: "100%" }}
      >
       <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"/>

        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{loc.project}</strong><br />
              {loc.name}<br />
              {loc.area}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default IndiaProjectsMap;
