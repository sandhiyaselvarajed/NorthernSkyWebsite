import { epc, services } from "../data/site";
import Img from "../lib/Img";
import { iconUrl } from "../lib/images";
import { useReveal } from "../lib/useReveal";

export default function Services() {
  const ref = useReveal();
  return (
    <section id="services" className="section" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">What we do</p>
          <h2>Full EPC, or the package you need.</h2>
          <p className="lead">Hand us the whole solar plant, or bring us in for a defined scope. The same crews and machines do the work.</p>
        </div>

        <article className="epc">
          <div className="epc-body">
            <span className="epc-tag">New · Turnkey</span>
            <h3>{epc.title}</h3>
            <p>{epc.text}</p>
            <ol className="epc-pillars">
              {epc.pillars.map((p) => (
                <li key={p.letter}>
                  <span className="epc-letter" aria-hidden="true">{p.letter}</span>
                  <div><strong>{p.title}</strong><span>{p.text}</span></div>
                </li>
              ))}
            </ol>
            <p className="epc-proof">{epc.proof}</p>
          </div>
          <div className="epc-media">
            <Img name={epc.image} alt="Transformer and switchgear yard on a solar plant built by Northern Sky" sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
        </article>

        <ul className="service-grid">
          {services.map((s, i) => (
            <li className="service" key={s.title} data-reveal style={{ "--d": `${i * 80}ms` }}>
              <img src={iconUrl(s.icon)} alt="" width="30" height="30" />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
