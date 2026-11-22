// Tiny page router (no extra packages). Each menu item is its own page with its own URL,
// e.g. northernskydevelopers.com/projects. scripts/postbuild.mjs writes a copy of the page
// for every route so links and refreshes work on GitHub Pages.
import { useEffect, useState } from "react";

export const ROUTES = {
  "/": "Northern Sky Developers LLP | Solar I&C, Transmission Lines & Renewable Civil Works",
  "/about": "About us | Northern Sky Developers LLP",
  "/services": "Services | Northern Sky Developers LLP",
  "/projects": "Projects | Northern Sky Developers LLP",
  "/locations": "Locations | Northern Sky Developers LLP",
  "/careers": "Careers | Northern Sky Developers LLP",
  "/contact": "Contact | Northern Sky Developers LLP",
  "/privacy": "Privacy notice | Northern Sky Developers LLP",
};

const listeners = new Set();
const normalize = (p) => (p.replace(/\/+$/, "") || "/").toLowerCase();

export function navigate(to) {
  if (normalize(to) !== normalize(location.pathname)) {
    history.pushState(null, "", to);
    listeners.forEach((f) => f());
  }
  window.scrollTo({ top: 0, behavior: "instant" });
}

export function usePath() {
  const [path, setPath] = useState(() => normalize(location.pathname));
  useEffect(() => {
    const update = () => setPath(normalize(location.pathname));
    listeners.add(update);
    window.addEventListener("popstate", update);
    return () => { listeners.delete(update); window.removeEventListener("popstate", update); };
  }, []);
  return path;
}

/** Internal link: changes page without reloading. */
export function Link({ to, onClick, children, ...rest }) {
  return (
    <a
      href={to}
      onClick={(e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        onClick?.(e);
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
