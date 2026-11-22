// ─────────────────────────────────────────────────────────────
// ALL WEBSITE CONTENT LIVES IN THIS FILE.
// To update projects, numbers, contact details or clients,
// edit only this file. The design picks the changes up automatically.
//
// Images: put the photo in photos-original/, run `npm run images`,
// then refer to it here by its file name without extension,
// e.g. "evolta-array" (lower-case, spaces become dashes).
//
// Source of facts: Northern_Sky_Profile 3.pptx wins any conflict; owner-supplied team/equipment
// figures are authoritative; NS_Profile_2025_V13 docx only fills gaps.
// ─────────────────────────────────────────────────────────────

export const company = {
  name: "Northern Sky",
  legalName: "Northern Sky Developers LLP",
  founded: 2019,
  headline: "Solar EPC and construction partner for utility-scale renewables.",
  lead: "Since 2019 our team has delivered solar installation & commissioning, transmission lines, wind turbine foundations, battery-storage civil works and 300+ km of fencing for Adani, Ayana, Avaada, ReNew, Swelect and more.",
  offices: ["Erode (head office)", "Karur", "Bengaluru"],
};

// Hero background photo (a name from content/photos, without extension).
export const heroImage = "array-wide";
// Optional background video for the hero: put an .mp4 in public/videos/ and write its name here,
// e.g. "site-drone.mp4". Leave empty to use the photo. The photo is still shown while the video loads.
export const heroVideo = "";

export const contact = {
  email: "contact@northernskydev.com",
  projectsEmail: "projects@northernskydev.com",
  phones: ["+91 94439 18260", "+91 78457 96145"],
  whatsapp: "917845796145", // confirmed: 78457 96145
  address: {
    street: "29/6, Rayapalayam Pudhur-1, Suriyampalayam, Chithode",
    city: "Erode",
    state: "Tamil Nadu",
    postalCode: "638102",
    country: "IN",
  },
  // Free key from https://web3forms.com (enter contact@northernskydev.com there).
  // Leave empty and the form falls back to opening the visitor's email app.
  web3formsKey: "",
};

// Registration details shown in the footer.
export const legal = {
  gstin: "33AAZFN2356F1Z0",
  udyam: "UDYAM-TN-07-0139007",
  dpiit: true, // DPIIT-recognised startup
};

// Add full profile URLs to show the links in the footer. Empty = hidden.
// Google: paste the Google Business Profile link here once it is approved.
export const social = { linkedin: "https://www.linkedin.com/company/northern-sky-dev-llp/", google: "" };

// Headline numbers count only work we contracted directly (not sub-contract packages).
// Agreed with the owner on 22 Nov 2026 — see claude/Website_Project_List.md in the project.
export const stats = [
  { value: 300, suffix: "+ km", label: "Fencing delivered" },
  { value: "72.5", plain: true, suffix: " MWp", label: "Solar installation & commissioning, 11 projects" },
  { value: 300, suffix: " MW", label: "Wind turbine foundations" },
  { value: 110, suffix: " kV", label: "Turnkey transmission line" },
  { value: 200, suffix: " MWh", label: "Battery-storage civil works" },
  { value: 400, suffix: " acres", label: "Land grading, plus 25+ km of roads" },
];

// ── WHAT WE DO ───────────────────────────────────────────────
// TODO: confirm how engineering is handled (in-house or with design partners).
export const epc = {
  title: "Solar EPC (turnkey)",
  text: "Engineering, procurement and construction for ground-mounted solar plants, under one contract and one point of accountability.",
  pillars: [
    { letter: "E", title: "Engineering", text: "Layout, design coordination and approvals" },
    { letter: "P", title: "Procurement", text: "Modules, inverters, structures, cables and balance of plant" },
    { letter: "C", title: "Construction", text: "Built, tested and commissioned by our own crews" },
  ],
  proof: "Backed by 72.5 MWp of solar installation & commissioning across 11 projects, delivered by our own crews.",
  image: "transformer-yard",
};

export const services = [
  { title: "Solar installation & commissioning", icon: "solar-panel", text: "Piling, structure and module erection, AC/DC works, testing and commissioning." },
  { title: "Transmission lines", icon: "tower", text: "11 kV to 220 kV lines, turnkey: survey, design, supply, erection, testing and commissioning." },
  { title: "Civil & site works", icon: "building-2", text: "Land grading, roads, drains, control buildings, inverter stations and switchyards." },
  { title: "Fencing & boundary walls", icon: "fence", text: "Chain-link fencing, barbed wire, precast walls and gates: supply and erection. 300+ km delivered." },
  { title: "Wind & battery storage civil", icon: "ferris-wheel", text: "Wind turbine foundations, storage yards, crane pads, access roads and BESS foundations." },
  { title: "Equipment hire", icon: "tractorimg", text: "Auger piling rigs and DTH drilling on hire, with trained operators." },
];

// ── HOW WE WORK ──────────────────────────────────────────────
export const process = [
  { title: "Mobilise", text: "Site setup, labour camp, storage yard, survey and grading.", image: "excavation" },
  { title: "Build", text: "Civil works, fencing, roads, drains and foundations.", image: "wtg-pour" },
  { title: "Install", text: "Structures, modules, inverters, transformers and cabling.", image: "structures-field" },
  { title: "Commission", text: "Testing, quality closure and handover.", image: "inverter-station" },
];

// ── PROJECTS ─────────────────────────────────────────────────
// Edit content/projects.csv and content/earlier-projects.csv (open in Excel).
// They are converted to projects.json automatically when the site starts or builds.
import projectData from "./projects.json";
export const projects = projectData.projects;
export const trackRecord = projectData.trackRecord;

export const clients = [
  { name: "Adani Green Energy", logo: "adani.webp" },
  { name: "Ayana Renewable Power", logo: "ayana.png" },
  { name: "Avaada", logo: "avaada.webp" },
  { name: "ReNew", logo: "renew.webp" },
  { name: "IRCON International", logo: "ircon.webp" },
  { name: "Swelect", logo: "swelect.webp" },
  { name: "Cleanmax", logo: "cleanmax.webp" },
  { name: "Sprng Energy", logo: "sprng.png" },
  // TODO: add logos for Hexa Climate, O2 Power, Aditya Birla Renewables, Fourth Partner if allowed
  { name: "Evolta Energy", logo: "evolta.png" },
  { name: "Resolven", logo: "resolven.png" },
];

// ── WHY US ───────────────────────────────────────────────────
export const whyUs = [
  { title: "Execution depth", text: "Repeat delivery on utility-scale solar, wind and battery-storage sites." },
  { title: "One team, linked scopes", text: "Civil, electrical, fencing and site works coordinated by one team." },
  { title: "Own machines, faster starts", text: "Our own piling rigs, concrete mixer and vehicles mean we mobilise without waiting on hire." },
  { title: "Trusted by leading developers", text: "Work for Adani, Ayana, Avaada, ReNew, Swelect, CleanMax, IRCON and others." },
];

export const teamStats = [
  { value: "16", label: "Permanent staff (6 office, 10 site)" },
  { value: "10", label: "Contract employees" },
  { value: "Own", label: "Labour team for site execution" },
];
// Supervisor/engineer bikes and cars intentionally left out.
export const fleet = [
  { name: "Auger piling rigs", count: 3 },
  { name: "Ajax self-loading concrete mixer", count: 1 },
  { name: "Eicher truck", count: 1 },
  { name: "Bolero pickup", count: 1 },
];

// ── LEADERSHIP ───────────────────────────────────────────────
// Founder photos: save a portrait in content/photos with exactly the file name below
// (e.g. founder-vinothkumar.jpg). It appears automatically; until then initials are shown.
export const leaders = [
  {
    name: "Vinothkumar S",
    photo: "founder-vinothkumar",
    role: "Founder & Director",
    discipline: "Civil Engineer",
    bio: "Site engineering and project planning at Larsen & Toubro, then procurement and subcontract leadership at Sterling & Wilson Renewable Energy, before founding Northern Sky.",
    focus: "Project execution · Commercial control · Delivery discipline",
  },
  {
    name: "Raja K",
    hidden: true, // hidden for now; set to false to show again
    photo: "founder-raja",
    role: "Co-Founder & Director",
    discipline: "Electrical Engineer",
    bio: "A decade in technology and consulting at Accenture, Deloitte, Indegene and Salesforce, bringing systems thinking to how Northern Sky plans, coordinates and scales.",
    focus: "Operating systems · Data visibility · Governance",
  },
];

// ── JOURNEY ──────────────────────────────────────────────────
export const milestones = [
  { year: "2019", text: "Founded in Erode as a solar sub-contractor" },
  { year: "2020", text: "Launched turnkey fencing: supply and erection" },
  { year: "2022", text: "Moved into wind turbine foundations" },
  { year: "2024", text: "Large utility-scale solar for global developers" },
  { year: "2025", text: "Solar installation & commissioning across Tamil Nadu; Northern Sky Developers LLP incorporated in December" },
  { year: "2026", text: "Turnkey 110 kV transmission line, battery-storage civil works, and solar I&C in Tamil Nadu and Madhya Pradesh" },
];

// ── LOCATIONS (map pins) ─────────────────────────────────────
export const locations = [
  { id: "erode", name: "Erode", area: "Tamil Nadu", note: "Head office", lat: 11.341, lng: 77.717, office: true },
  { id: "karur", name: "Karur", area: "Tamil Nadu", note: "Office", lat: 10.96, lng: 78.077, office: true },
  { id: "blr", name: "Bengaluru", area: "Karnataka", note: "Office", lat: 12.972, lng: 77.594, office: true },
  { id: "pavagada", name: "Pavagada", area: "Karnataka", note: "IRCON / Valente: 50+ km fencing; Ayana: 15 km fencing", lat: 14.031, lng: 77.264 },
  { id: "ramanathapuram", name: "Ramanathapuram", area: "Tamil Nadu", note: "Heft Energy: 110 kV transmission line", lat: 9.371, lng: 78.83 },
  { id: "thoothukudi", name: "Thoothukudi", area: "Tamil Nadu", note: "Zetwerk: land grading and roads", lat: 8.764, lng: 78.135 },
  { id: "gadag", name: "Gadag", area: "Karnataka", note: "ReNew / Faben: 300 MW wind", lat: 15.43, lng: 75.63 },
  { id: "mandsaur", name: "Mandsaur", area: "Madhya Pradesh", note: "Hexa Climate: 200 MWh BESS", lat: 24.07, lng: 75.07 },
  { id: "kalaburagi", name: "Kalaburagi", area: "Karnataka", note: "Avaada: piling, ICR & substation", lat: 17.32, lng: 76.84 },
  { id: "virudhunagar", name: "Virudhunagar", area: "Tamil Nadu", note: "Evolta: 13.5 MWp I&C", lat: 9.585, lng: 77.958 },
  { id: "trichy", name: "Tiruchirappalli", area: "Tamil Nadu", note: "Resolven: roads and fencing", lat: 10.79, lng: 78.705 },
  { id: "dindigul", name: "Sengurichi, Dindigul", area: "Tamil Nadu", lat: 10.366, lng: 77.971 },
  { id: "jammalamadugu", name: "Jammalamadugu", area: "Andhra Pradesh", note: "Ayana, Adani, Sprng Energy", lat: 14.852, lng: 78.226 },
  { id: "surendranagar", name: "Surendranagar", area: "Gujarat", lat: 22.728, lng: 71.637 },
  { id: "agar", name: "Agar", area: "Madhya Pradesh", note: "O2 Power: 200 MW", lat: 23.711, lng: 76.016 },
  { id: "ottapidaram", name: "Ottapidaram", area: "Tamil Nadu", note: "Fourth Partner I&C, KUG 220 kV line", lat: 8.913, lng: 78.02 },
  { id: "yadgir", name: "Yadgir", area: "Karnataka", note: "Avaada 50 MW", lat: 16.77, lng: 77.138 },
  { id: "jagaluru", name: "Jagaluru", area: "Karnataka", note: "CleanMax: 15+ km fencing", lat: 14.52, lng: 76.34 },
  { id: "sivakasi", name: "Sivakasi", area: "Tamil Nadu", note: "Swelect", lat: 9.449, lng: 77.798 },
  { id: "chhattisgarh", name: "Chhattisgarh", area: "Chhattisgarh", note: "Aditya Birla: 38 MWp I&C", lat: 21.25, lng: 81.63 },
  { id: "bhuj", name: "Bhuj", area: "Gujarat", lat: 23.242, lng: 69.667 },
];

// ── CAREERS ──────────────────────────────────────────────────
export const careers = {
  email: "contact@northernskydev.com",
  points: [
    "Work on utility-scale solar, wind and battery-storage sites across India",
    "Learn from leadership trained at L&T and Sterling & Wilson",
    "Grow with a company moving into full solar EPC",
  ],
  // Current openings (Nov 2026 hiring posts). Update this list as roles are filled.
  roles: ["Solar Project Manager", "Electrical Engineer", "Civil Engineer", "Procurement Engineer", "Site Administrator", "Accounts Executive", "Accounts Manager"],
  howToApply: "Email your CV with the role name in the subject line.",
  note: "Site roles involve living at project locations, which change as projects move.",
};
