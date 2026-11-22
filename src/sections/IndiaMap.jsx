// Illustrated India map in brand colours. Outline: DataMeet India "india-composite"
// (official composite boundary), CC BY 4.0. Pins come from `locations` in site.js.
import { useState } from "react";
import outline from "../data/india-outline.json";

const project = (lng, lat) => [
  (lng - outline.minLon) * outline.cosLat0 * outline.scale,
  (outline.maxLat - lat) * outline.scale,
];

export default function IndiaMap({ locations, activeState, onPick }) {
  const [hover, setHover] = useState(null);
  const pins = locations.map((l) => ({ ...l, xy: project(l.lng, l.lat) }));
  const tip = hover && pins.find((p) => p.id === hover);
  // Crop to mainland + southern islands; keep the full official outline.
  const vb = `-10 -10 ${outline.w + 20} ${outline.h + 20}`;

  return (
    <figure className="india-map">
      <svg viewBox={vb} role="img" aria-label="Map of India showing Northern Sky offices and project locations">
        <defs>
          <linearGradient id="land" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eef6e4" />
            <stop offset="100%" stopColor="#dcebc8" />
          </linearGradient>
          <filter id="landShadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#012060" floodOpacity="0.12" />
          </filter>
        </defs>
        <path d={outline.path} fill="url(#land)" stroke="#012060" strokeOpacity="0.55" strokeWidth="2" strokeLinejoin="round" filter="url(#landShadow)" />

        {pins.filter((p) => !p.office).map((p) => {
          const on = hover === p.id || (activeState && p.area === activeState);
          return (
            <g
              key={p.id}
              className={`pin ${on ? "is-on" : ""}`}
              transform={`translate(${p.xy[0]} ${p.xy[1]})`}
              tabIndex={0}
              role="button"
              aria-label={`${p.name}, ${p.area}${p.note ? `: ${p.note}` : ""}`}
              onMouseEnter={() => setHover(p.id)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(p.id)}
              onBlur={() => setHover(null)}
              onClick={() => onPick?.(p.area)}
            >
              <circle className="pin-pulse" r="11" />
              <circle className="pin-dot" r="9" />
            </g>
          );
        })}

        {pins.filter((p) => p.office).map((p) => (
          <g
            key={p.id}
            className="office"
            transform={`translate(${p.xy[0]} ${p.xy[1]})`}
            tabIndex={0}
            role="button"
            aria-label={`${p.name} office`}
            onMouseEnter={() => setHover(p.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(p.id)}
            onBlur={() => setHover(null)}
          >
            <rect x="-9" y="-9" width="18" height="18" rx="4" transform="rotate(45)" />
          </g>
        ))}

        {tip && (
          <g className="map-tip" transform={`translate(${tip.xy[0]} ${tip.xy[1] - 22})`} pointerEvents="none">
            <TipBox name={tip.office ? `${tip.name.replace(/\s*\(.*\)/, "")} office` : tip.name} note={tip.office ? tip.area : tip.note || tip.area} />
          </g>
        )}
      </svg>
      <figcaption>
        <span><i className="key key-site" /> Project location</span>
        <span><i className="key key-office" /> Office</span>
        <small>
          Map outline: <a href="https://github.com/datameet/maps" target="_blank" rel="noopener noreferrer">DataMeet India</a> (CC BY 4.0). Not to scale.
        </small>
      </figcaption>
    </figure>
  );
}

function TipBox({ name, note }) {
  const w = Math.max(name.length, (note || "").length) * 13 + 36;
  return (
    <g>
      <rect x={-w / 2} y={-64} width={w} height={60} rx="12" fill="#012060" />
      <path d="M -10 -4 L 0 8 L 10 -4 Z" fill="#012060" />
      <text x="0" y="-38" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700">{name}</text>
      <text x="0" y="-14" textAnchor="middle" fill="#b9dd8f" fontSize="17">{note}</text>
    </g>
  );
}
