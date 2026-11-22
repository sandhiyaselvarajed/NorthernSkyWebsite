// "Inside a Northern Sky site": the interactive 3D plant, loaded only when the
// visitor scrolls near it so it never slows down the first view of the page.
import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { useNearViewport, useOnScreen, useReveal, prefersReducedMotion } from "../lib/useReveal";
import Img from "../lib/Img";

const HeroScene = lazy(() => import("../three/HeroScene"));

const SCOPE = [
  "Chain-link fencing & gate",
  "Roads & storm-water drains",
  "Piling & module structures",
  "Inverter stations",
  "Control room",
  "Substation & battery storage",
  "Transmission line",
];

function canUse3D() {
  if (typeof window === "undefined" || navigator.connection?.saveData) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function SiteScene() {
  const reveal = useReveal();
  const [nearRef, near] = useNearViewport("400px");
  const [screenRef, onScreen] = useOnScreen();
  const [ok, setOk] = useState(false);
  const [ready, setReady] = useState(false);
  const [reduced] = useState(prefersReducedMotion);
  const onReady = useCallback(() => setReady(true), []);
  useEffect(() => { if (near) setOk(canUse3D()); }, [near]);
  const setRefs = (el) => { nearRef.current = el; screenRef.current = el; };

  return (
    <section id="site" className="section site-section" ref={reveal}>
      <div className="container">
        <div className="section-head" data-reveal>
          <p className="eyebrow">Inside a Northern Sky site</p>
          <h2>Everything a utility-scale plant needs, built by one team.</h2>
          <p className="lead">
            From the boundary fence to the substation, this is the scope we execute on site. Watch it build, then follow
            the power out to the grid.
          </p>
        </div>
        <div className={`site-frame ${ready ? "is-ready" : ""}`} ref={setRefs}>
          <div className="site-fallback" aria-hidden="true">
            <Img name="posts-wind" alt="" sizes="(max-width: 1200px) 100vw, 1200px" />
          </div>
          {ok && (
            <Suspense fallback={null}>
              <HeroScene active={onScreen} reduced={reduced} onReady={onReady} />
            </Suspense>
          )}
        </div>
        <ul className="scope-chips" data-reveal>
          {SCOPE.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
    </section>
  );
}
