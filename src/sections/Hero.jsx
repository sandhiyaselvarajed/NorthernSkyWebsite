// Hero: a real Northern Sky site photo with the headline and key numbers.
// (The 3D plant now lives further down in "Inside a Northern Sky site".)
import { company, stats, heroImage, heroVideo } from "../data/site";
import { picture } from "../lib/images";
import Img from "../lib/Img";
import CountUp from "./CountUp";

export default function Hero() {
  return (
    <section id="top" className="hero hero--photo">
      <div className="hero-photo" aria-hidden="true">
        {heroVideo ? (
          <video
            src={`/videos/${heroVideo}`}
            poster={picture(heroImage, 1600).src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <Img name={heroImage} alt="" eager sizes="100vw" preferWidth={1600} />
        )}
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light">Solar · Wind · Battery storage · Since {company.founded}</p>
          <h1>{company.headline}</h1>
          <p className="hero-lead">{company.lead}</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">Discuss a project</a>
            <a href="#projects" className="btn btn-ghost">See our projects</a>
          </div>
        </div>
      </div>

      <div className="hero-stats">
        <div className="container hero-stats-grid">
          {stats.map((s) => (
            <div className="hero-stat" key={s.label}>
              <strong>
                {s.plain ? s.value : <CountUp to={s.value} />}
                <span className="sfx">{s.suffix}</span>
              </strong>
              <small>{s.label}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
