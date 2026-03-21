import { useState, useEffect, useRef } from "react";

// ── useIsMobile ────────────────────────────────────────────────────
// Devuelve true cuando el viewport es menor al breakpoint (default 768px)
export function useIsMobile(bp = 768): boolean {
  const [mobile, setMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < bp : false
  );
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < bp);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, [bp]);
  return mobile;
}

// ── useReveal ──────────────────────────────────────────────────────
// Observa un elemento y activa `visible` cuando entra en el viewport
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}
