import { contact, company, social, legal, services, mapsUrl } from "../data/site";
import { Link } from "../lib/router";
import logo from "../assets/logo-ns.png";
import SocialIcons from "./SocialIcons";

const COMPANY = [["About", "/about"], ["Projects", "/projects"], ["Locations", "/locations"], ["Careers", "/careers"], ["Contact", "/contact"]];

export default function Footer() {
  const a = contact.address;
  return (
    <footer className="footer">
      <div className="container footer-top">
        <div className="footer-col footer-col--brand">
          <Link to="/" className="footer-brand" aria-label="Northern Sky Developers LLP, home">
            <img src={logo} alt="" width="28" height="36" />
            <span className="brand-text">
              <span className="brand-name">Northern Sky</span>
              <span className="brand-sub">Developers LLP</span>
            </span>
          </Link>
          <p className="footer-about">Solar installation & commissioning, transmission lines and renewable civil works across India.</p>
          <address className="footer-address">
            {a.street}, {a.city} {a.postalCode}, {a.state}
            <br /><a href={social.google || mapsUrl} target="_blank" rel="noopener noreferrer">View on map</a>
          </address>
        </div>

        <nav className="footer-col" aria-label="Services">
          <h4>Services</h4>
          <ul>{services.slice(0, 5).map((s) => <li key={s.title}><Link to="/services">{s.title}</Link></li>)}</ul>
        </nav>

        <nav className="footer-col" aria-label="Company">
          <h4>Company</h4>
          <ul>{COMPANY.map(([l, to]) => <li key={to}><Link to={to}>{l}</Link></li>)}</ul>
        </nav>

        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            {contact.phones.map((p) => <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`}>{p}</a></li>)}
            <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          </ul>
          <SocialIcons />
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {company.legalName}<span className="footer-sep" aria-hidden="true">·</span><Link to="/privacy" className="footer-privacy">Privacy notice</Link></p>
          <p className="footer-reg">GSTIN {legal.gstin}<span aria-hidden="true">·</span>Udyam {legal.udyam}{legal.dpiit && <><span aria-hidden="true">·</span>DPIIT-recognised startup</>}</p>
        </div>
      </div>
    </footer>
  );
}
