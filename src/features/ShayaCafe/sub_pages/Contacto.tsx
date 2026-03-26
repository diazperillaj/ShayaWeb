import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useReveal, useIsMobile } from "../hooks";

// ── Iconos SVG ─────────────────────────────────────────────────────
const IconIG: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IconWA: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const IconMail: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

// ── Tarjeta de contacto ────────────────────────────────────────────
interface ContactCardProps {
  href: string;
  icon: ReactNode;
  dot: string;
  label: string;
  value: string;
}

const ContactCard: FC<ContactCardProps> = ({ href, icon, dot, label, value }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="no-underline block"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className="flex items-center gap-[14px] px-[18px] py-[15px] rounded-[13px] transition-all duration-300"
        style={{
          background: hov ? "#fff" : "transparent",
          border: `1px solid ${hov ? "#D9C9B0" : "#E8DDD0"}`,
          transform: hov ? "translateX(4px)" : "translateX(0)",
        }}
      >
        <div
          className="w-10 h-10 rounded-[10px] text-white flex-shrink-0 flex items-center justify-center"
          style={{ background: dot }}
        >
          {icon}
        </div>
        <div>
          <p className="font-sans text-[10px] font-bold tracking-[.2em] uppercase text-[#B0A090] mb-[2px]">
            {label}
          </p>
          <p className="font-sans text-[14.5px] font-medium text-[#271409]">
            {value}
          </p>
        </div>
      </div>
    </a>
  );
};

// ── Sección Contacto ───────────────────────────────────────────────
const Contacto: FC = () => {
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();

  return (
    <section
      id="contacto"
      className="bg-[#F9F5EF]"
      style={{ padding: isMobile ? "72px 16px 60px" : "96px 24px 80px" }}
    >
      <div
        ref={ref}
        className={`max-w-[820px] mx-auto transition-[opacity,transform] duration-[900ms] ease-[ease] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Encabezado */}
        <div className="text-center mb-12">
          <p className="font-sans text-[10.5px] font-semibold tracking-[.3em] uppercase text-[#6B3F22] mb-[10px]">
            ✦ Hablemos
          </p>
          <h2
            className="font-display font-bold text-[#271409] leading-[1.1]"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)" }}
          >
            Encuéntranos{" "}
            <em className="italic text-[#C07B52]">donde estés</em>
          </h2>
          <p className="font-sans text-[15px] text-[#6B3F22] leading-[1.75] max-w-[380px] mx-auto mt-[14px]">
            Escríbenos o síguenos en redes. Estamos listos para atenderte.
          </p>
        </div>

        {/* Grid 2 × 1 en mobile, 2 × 2 en desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] md:gap-3 mb-[10px] md:mb-3">
          <ContactCard href="https://wa.me/573124639729"   icon={<IconWA />}   dot="#25D366"     label="WhatsApp"           value="+57 312 463 9729" />
          <ContactCard href="mailto:shayacafe@gmail.com"   icon={<IconMail />} dot="#C07B52"     label="Correo electrónico" value="shayacafe@gmail.com" />
        </div>

        {/* Instagram centrado */}
        <div className="flex justify-center">
          <div className="w-full md:w-[calc(50%-6px)]">
            <ContactCard
              href="https://instagram.com/shaya_cafe"
              icon={<IconIG />}
              dot="linear-gradient(135deg,#f58529,#dd2a7b,#8134af)"
              label="Instagram"
              value="@shaya_cafe"
            />
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-[#E8DDD0] my-11" />

        {/* Footer */}
        <div className="flex items-center justify-between flex-wrap gap-[10px] md:flex-col md:items-start md:gap-[6px]">
          <span className="font-display text-[20px] font-bold text-[#271409]">
            Shaya <span className="text-[#C07B52]">Café</span>
          </span>
          <span className="font-sans text-[12.5px] text-[#B0A090]">
            © 2026 Shaya Café · Hecho con ♥ en Colombia
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
