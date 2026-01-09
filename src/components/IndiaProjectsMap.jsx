import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import locations from "./locations";
import "./IndiaProjectsMap.css";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Marker icon
L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Wider India bounds (west expanded for Gujarat)
const INDIA_BOUNDS = [
  [6.0, 66.0],   // south-west (expanded)
  [38.0, 99.0],  // north-east
];

// Detect mobile
const isMobile = window.innerWidth <= 576;

const IndiaProjectsMap = () => {
  return (
    <section className="map-section">
      <h2 className="map-heading">
        Our Successfully Completed Projects Across India
      </h2>

      <div className="map-container">
        <MapContainer
          center={[22.8, 71.5]}   // 🔥 center slightly shifted toward Gujarat
          zoom={isMobile ? 4 : 5}
          minZoom={isMobile ? 4 : 5}
          maxZoom={isMobile ? 6 : 6}
          maxBounds={INDIA_BOUNDS}
          maxBoundsViscosity={1}
          scrollWheelZoom={false}
          dragging={false}
          doubleClickZoom={false}
          touchZoom={false}
          zoomControl={false}
          className="leaflet-map"
        >
          <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />

          {locations.map((loc) => (
            <Marker key={loc.id} position={[loc.lat, loc.lng]}>
              <Popup>
                <strong>{loc.project}</strong>
                <br />
                {loc.name}
                <br />
                {loc.area}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
};

export default IndiaProjectsMap;
