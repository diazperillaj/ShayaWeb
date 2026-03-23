import type { FC } from "react";
import { useReveal, useIsMobile } from "../hooks";

const Nosotros: FC = () => {
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();

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
          <div className="overflow-hidden rounded-[20px]">
            <img
              src="/Microcentral/process.jpg"
              alt="Proceso artesanal Shaya Café"
              className="block h-[460px] w-full object-cover"
            />
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
            Pasión por el café,
            <br />
            <em className="italic text-[#C07B52]">desde las montañas</em>
            <br />
            hasta tu taza
          </h2>

          <p className="mb-4 font-[var(--sans)] text-[15px] leading-[1.88] text-[#6B3F22]">
            En{" "}
            <strong className="text-[#271409]">Shaya Café</strong>{" "}
            creemos que una buena taza de café va más allá del sabor: es un
            ritual, un momento de pausa, una conexión con la tierra colombiana
            que lo hace posible.
          </p>

          <p className="mb-11 font-[var(--sans)] text-[15px] leading-[1.88] text-[#6B3F22]">
            Seleccionamos granos en una de las mejores regiones cafeteras del
            país, con tostión artesanal que respeta el perfil único de cada
            variedad. Cada grano tiene una historia — nosotros te la contamos
            en cada sorbo.
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