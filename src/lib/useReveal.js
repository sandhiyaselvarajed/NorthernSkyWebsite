import { useEffect, useRef, useState } from "react";

/**
 * Adds .is-visible to elements with [data-reveal] inside the returned ref when they come into view.
 * Content must never stay hidden: besides IntersectionObserver there is a scroll check and a
 * safety timer, so a throttled tab, a fast jump or an old browser still shows everything.
 */
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = [...root.querySelectorAll("[data-reveal]")];
    const show = (el) => el.classList.add("is-visible");
    const check = () => {
      const h = window.innerHeight || document.documentElement.clientHeight || 800;
      els.forEach((el) => { if (el.getBoundingClientRect().top < h * 0.95) show(el); });
    };
    let io;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }),
        { rootMargin: "0px 0px -5% 0px", threshold: 0 }
      );
      els.forEach((el) => io.observe(el));
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    const failsafe = setTimeout(() => els.forEach(show), 4000);
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      clearTimeout(failsafe);
    };
  }, []);
  return ref;
}

/** True once the element has come near the viewport (for lazy-loading heavy parts). */
export function useNearViewport(margin = "300px") {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (!("IntersectionObserver" in window)) return setNear(true);
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [near, margin]);
  return [ref, near];
}

/** Whether the element is currently on screen (to pause animation when scrolled away). */
export function useOnScreen() {
  const ref = useRef(null);
  const [on, setOn] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
