import { contact } from "../data/site";
import { Link } from "../lib/router";

export default function CtaBand({ title = "Planning a solar, wind or BESS project?", text = "Tell us the site, capacity and scope. We'll get back within one working day." }) {
  return (
    <section className="cta-band">
      <div className="container cta-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <Link to="/contact" className="btn btn-primary">Discuss a project</Link>
          <a className="btn btn-ghost" href={`tel:${contact.phones[0].replace(/\s/g, "")}`}>Call {contact.phones[0]}</a>
        </div>
      </div>
    </section>
  );
}
