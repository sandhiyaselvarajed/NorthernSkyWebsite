import { process } from "../data/site";
import Img from "../lib/Img";
import { useReveal } from "../lib/useReveal";

export default function Process() {
  const ref = useReveal();
  return (
    <section id="process" className="section section--dark" ref={ref}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow eyebrow--light">How we work</p>
          <h2>Four stages. One team accountable for all of them.</h2>
        </div>
        <ol className="process">
          {process.map((step, i) => (
            <li className="process-step" key={step.title} data-reveal style={{ "--d": `${i * 110}ms` }}>
              <div className="process-media">
                <Img name={step.image} alt={step.title} sizes="(max-width: 640px) 40vw, 25vw" preferWidth={480} />
              </div>
              <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
