import type { FC } from "react";

interface InicioProps {
  onNavigate: (id: string) => void;
}

const Inicio: FC<InicioProps> = ({ onNavigate }) => (
  <section id="inicio" className="relative w-full h-screen overflow-hidden">
    {/* ── Foto fondo a pantalla completa ── */}
    <img
      src="/font.png"
      alt="Café Shaya portada"
      className="absolute inset-0 w-full h-full object-cover object-[center_55%]"
    />
    <img
      src="/logo_sin_fondo.ico"
      alt="Café Shaya portada"
      style={{ perspective: "600px" }}
      className="hidden sm:block animate-logo-entrada absolute left-1/2 top-[6%] sm:top-[8.5%] w-[18%] sm:w-[12%] md:w-[8%] lg:w-[5%] xl:w-[4%] h-auto object-contain"
    />

    {/* ── Overlay suave ── */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(160deg,rgba(15,8,3,.40) 0%,rgba(15,8,3,.25) 45%,rgba(15,8,3,.55) 100%)",
      }}
    />

    {/* ── Contenido centrado ── */}
    <div className="relative z-[2] h-full flex flex-col items-center justify-center text-center px-5">
      {/* Eyebrow */}
      <p className="animate-fade-up-1 font-sans text-[11px] md:text-[9px] font-semibold tracking-[.32em] md:tracking-[.22em] uppercase text-[#E8C49A] mb-[18px]">
        &nbsp;Boyacá · Mujeres productoras
      </p>

      {/* Título */}
      <h1
        className="animate-fade-up-2 font-display font-bold leading-[1.06] text-[#FEFCF9] mb-5 tracking-[-0.015em] max-w-[1060px]"
        style={{ fontSize: "clamp(2.4rem, 5vw, 5rem)" }}
      >
        No es café <br />
        <em className="italic text-[#E8C49A]">comercial.</em>
        <br />
        Es café con origen real
      </h1>

      {/* Subtítulo */}
      <p className="animate-fade-up-3 font-sans text-base md:text-[14px] leading-[1.85] text-[rgba(254,252,249,.66)] max-w-[660px] mb-11 md:mb-8">
        Cultivado y procesado por mujeres que combinan conocimiento ancestral con un proceso cuidado. Notas dulces a panela, un toque cítrico y una
        taza limpia que puedes notar desde el primer sorbo.
      </p>

      {/* Botones */}
      <div className="animate-fade-up-4 flex gap-[14px] flex-wrap justify-center md:flex-col md:w-full md:max-w-[280px]">
        <button
          onClick={() => onNavigate("productos")}
          className="font-sans text-[13.5px] font-semibold text-white bg-[#C07B52] border-none rounded-full px-[34px] py-[14px] cursor-pointer shadow-[0_8px_28px_rgba(192,123,82,.45)] transition-transform duration-[250ms] hover:scale-[1.04] md:w-full"
        >
          Ver productos →
        </button>

        <button
          onClick={() => onNavigate("nosotros")}
          className="font-sans text-[13.5px] font-medium text-[rgba(254,252,249,.88)] bg-[rgba(254,252,249,.10)] border-[1.5px] border-[rgba(254,252,249,.32)] rounded-full px-[34px] py-[14px] cursor-pointer backdrop-blur-[6px] transition-all duration-300 hover:bg-[rgba(254,252,249,.18)] hover:border-[rgba(254,252,249,.55)] md:w-full"
        >
          Nuestra historia
        </button>
      </div>
    </div>

    {/* ── Flecha scroll ── */}
    <div
      className="animate-bounce-arr absolute bottom-[30px] left-1/2 flex flex-col items-center gap-[5px] cursor-pointer"
      onClick={() => onNavigate("productos")}
    >
      <span className="font-sans text-[9px] font-bold tracking-[.28em] uppercase text-[rgba(254,252,249,.38)]">
        scroll
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M7 2v10M2 8.5l5 5 5-5"
          stroke="rgba(254,252,249,.42)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </section>
);

export default Inicio;
