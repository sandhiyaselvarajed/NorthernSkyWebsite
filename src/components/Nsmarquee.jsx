import React from "react";
import "../index.css";
// import { icon } from "leaflet";
import solarIcon from "../assets/icons/solar-panel.svg";
import wtgfoundation from "../assets/icons/ferris-wheel.svg";
import building from "../assets/icons/building-2.svg";
import inventorstation from "../assets/icons/battery-charging.svg";
import roaddrains from "../assets/icons/road1.svg";
import boundarywall from "../assets/icons/brick-wall.svg";
import chainlinkfencing from "../assets/icons/audio-waveform.svg";
import solarplants from "../assets/icons/solar-panel.svg";
import auger from "../assets/icons/tractorimg.svg";


const Nsmarquee = () => {
  const items = [
    { text: "Solar I&C", icon: solarIcon },
    { text: "WTG Foundation",icon:wtgfoundation},
    { text: "RMC for Solar Plants",icon:solarplants},
    { text: "Control Building",icon:building },
    { text: "Invertor Station",icon:inventorstation  },
    { text: "Roads and Drains",icon:roaddrains },
    { text: "Chain link Fencing",icon:chainlinkfencing },
    { text: "Precast Boundary Wall",icon:boundarywall},
    { text: "AC & DC for Solar", icon:solarIcon},
    { text: "Auger and DTH Rental", icon:auger}]

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-5 overflow-hidden shadow-lg">
      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="marquee-item flex items-center">
              {items.map((item, idx) => (
                <div
                  key={`${i}-${idx}`}
                  className="marquee-tag mx-4 px-6 py-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="flex items-center text-gray-900 text-xl md:text-2xl font-semibold tracking-wide">
                    <img
                      src={item.icon}
                      alt={item.text}
                      className="p-2 w-6 h-6 mr-2 object-contain"
                    />
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nsmarquee;
