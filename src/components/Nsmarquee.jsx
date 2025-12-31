import React from "react";
import "../index.css";

const Nsmarquee = () => {
 const items = [
  { text: "Solar I&C"}, 
  { text: "WTG Foundation"}, 
  { text: "Control Building"},                 
  { text: "Invertor Station"},                
  { text: "Roads and Drains"},                 
  { text: "Chain link Fencing"},    
  { text: "Precast Boundary Wall"},                 
  { text: "AC & DC for Solar"},  
  { text: "RMC for Solar Plants"}, 
  { text: "Auger and DTH Rental"}, 
];


return (
<div className="relative bg-gradient-to-r from-blue-900 to-blue-700 py-5 overflow-hidden shadow-lg">
      <div className="relative">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="marquee-item flex items-center">
                {items.map((item, idx) => (
                  <div 
                    key={`${i}-${idx}`} 
                    className="marquee-tag mx-4 px-6 py-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                  <span className="text-gray-900 text-xl md:text-2xl font-semibold tracking-wide flex items-center">  
                        <span className="mr-2 text-2xl">{item.icon}</span>
                        {item.text}
                  </span>
              </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nsmarquee;