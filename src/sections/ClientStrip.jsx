import { clients } from "../data/site";
import { logoUrl } from "../lib/images";

export default function ClientStrip() {
  return (
    <section className="client-strip" aria-label="Clients">
      <div className="container client-strip-inner">
        <p>Trusted by</p>
        <ul>
          {clients.map((c) => (
            <li key={c.name}><img src={logoUrl(c.logo)} alt={c.name} loading="lazy" /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
