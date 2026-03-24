import type { FC } from "react";
import { useState, useEffect, useCallback } from "react";
import { useReveal, useIsMobile } from "../hooks";

const FOTOS = [
  "/Nosotros/foto1.jpg",
  "/Nosotros/foto2.png",
  "/Nosotros/foto3.jpg",
  "/Nosotros/foto4.png",
  "/Nosotros/foto5.png",
];

const Nosotros: FC = () => {
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = () => goTo(current === 0 ? FOTOS.length - 1 : current - 1);
  const next = () => goTo(current === FOTOS.length - 1 ? 0 : current + 1);

  // Auto-avance cada 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c === FOTOS.length - 1 ? 0 : c + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="nosotros"
      className="relative overflow-hidden bg-[#F0E9DC]"
      style={{ padding: isMobile ? "72px 16px" : "100px 24px" }}
    >
      {/* Blob decorativo */}
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[rgba(90,130,112,0.07)]" />

      <div
        ref={ref}
        className={`rev about-inner relative z-10 mx-auto flex max-w-[1080px] items-center gap-[72px] ${
          visible ? "on" : "off"
        } ${isMobile ? "flex-col" : ""}`}
      >
        {/* ── Foto ── */}
        <div className="about-photo-col relative shrink-0 basis-[44%]">
          <div className="relative overflow-hidden rounded-[20px]">
            {/* Imagen con fade */}
            <img
              src={FOTOS[current]}
              alt={`Proceso artesanal Shaya Café ${current + 1}`}
              className="block h-[460px] w-full object-cover transition-opacity duration-300"
              style={{ opacity: animating ? 0 : 1 }}
            />

            {/* Flechas */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[6px]">
              {FOTOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="h-[6px] rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "6px",
                    background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Badge flotante */}
          <div className="about-badge absolute -bottom-5 -right-5 rounded-2xl bg-[#C07B52] px-6 py-[18px] shadow-[0_12px_38px_rgba(192,123,82,0.28)]">
            <p className="font-[var(--display)] text-[34px] font-bold leading-none text-white">
              100%
            </p>
            <p className="mt-1 font-[var(--sans)] text-[10.5px] font-bold uppercase tracking-[0.15em] text-white/80">
              Origen colombiano
            </p>
          </div>
        </div>

        {/* ── Texto ── */}
        <div className="flex-1">
          <p className="mb-[14px] font-[var(--sans)] text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#5A8270]">
            ✦ Quiénes somos
          </p>

          <h2
            className="mb-[22px] font-[var(--display)] font-bold leading-[1.15] text-[#271409]"
            style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.7rem)" }}
          >
            Café con origen real,
            <br />
            <em className="italic text-[#C07B52]">hecho por mujeres en Boyacá</em>
          </h2>

          <p className="mb-4 font-[var(--sans)] text-[15px] leading-[1.88] text-[#6B3F22]">
            En <strong>Shaya Café</strong> trabajamos junto a mujeres del suroriente
            de Boyacá que cultivan y procesan el café con conocimiento ancestral y un
            compromiso real con la tierra.
          </p>

          <p className="mb-11 font-[var(--sans)] text-[15px] leading-[1.88] text-[#6B3F22]">
            No es café genérico. Es café con historia, con origen claro y con personas
            reales detrás de cada grano.
          </p>

          {/* Stats */}
          <div className="about-stats flex gap-11">
            {[
              ["4+", "Años de exp."],
              ["100%", "Café de origen"],
              ["3", "Presentaciones"],
            ].map(([n, l]) => (
              <div key={l}>
                <p className="font-[var(--display)] text-[32px] font-bold text-[#C07B52]">
                  {n}
                </p>
                <p className="mt-0.5 font-[var(--sans)] text-[11px] font-semibold uppercase tracking-[0.06em] text-[#B0A090]">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;