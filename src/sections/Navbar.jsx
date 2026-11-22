import { useEffect, useState } from "react";
import logoColor from "../assets/logo-ns.png";

const links = [
  ["What we do", "#services"],
  ["Projects", "#projects"],
  ["Locations", "#locations"],
  ["Why us", "#why"],
  ["Leadership", "#about"],
  ["Careers", "#careers"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`nav nav--onlight ${scrolled || open ? "nav--scrolled" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container nav-inner">
        <a href="#top" className="brand" onClick={close}>
          <img src={logoColor} alt="" width="30" height="40" />
          <span className="brand-text">
            <span className="brand-name">Northern Sky</span>
            <span className="brand-sub">Developers LLP</span>
          </span>
        </a>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
        <nav id="nav-menu" className={`nav-menu ${open ? "is-open" : ""}`} aria-label="Main">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <a href="#contact" className="btn btn-primary btn-sm" onClick={close}>Get in touch</a>
        </nav>
      </div>
    </header>
  );
}
