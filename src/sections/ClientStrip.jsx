import { clients } from "../data/site";
import { logoUrl } from "../lib/images";

// Full-colour client logos on clean tiles. Clients without a logo file show their name as text.
export default function ClientStrip() {
  return (
    <section className="client-strip" aria-label="Clients">
      <div className="container">
        <p className="client-strip-title">Trusted by India&apos;s leading renewable developers</p>
        <ul className="client-grid">
          {clients.map((c) => (
            <li key={c.name} className="client-tile" title={c.name}>
              {c.logo ? <img src={logoUrl(c.logo)} alt={c.name} loading="lazy" /> : <span>{c.name}</span>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
