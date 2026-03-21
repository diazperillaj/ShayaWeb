import { useState } from "react";
import type { FC, ReactNode } from "react";
import { useReveal, useIsMobile } from "../hooks";

// ── Iconos SVG ─────────────────────────────────────────────────────
const IconIG: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IconFB: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const IconTK: FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
      style={{ textDecoration: "none" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        style={{
          display: "flex", alignItems: "center", gap: 14,
          padding: "15px 18px", borderRadius: 13,
          background: hov ? "#fff" : "transparent",
          border: `1px solid ${hov ? "#D9C9B0" : "#E8DDD0"}`,
          transform: hov ? "translateX(4px)" : "translateX(0)",
          transition: "all .3s ease",
        }}
      >
        <div
          style={{
            width: 40, height: 40, borderRadius: 10,
            background: dot, color: "#fff", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {icon}
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 10, fontWeight: 700,
              letterSpacing: ".2em", textTransform: "uppercase",
              color: "#B0A090", marginBottom: 2,
            }}
          >
            {label}
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: 14.5, fontWeight: 500, color: "#271409" }}>
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
      style={{
        background: "#F9F5EF",
        padding: isMobile ? "72px 16px 60px" : "96px 24px 80px",
      }}
    >
      <div
        ref={ref}
        className={`rev ${visible ? "on" : "off"}`}
        style={{ maxWidth: 820, margin: "0 auto" }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 600,
              letterSpacing: ".3em", textTransform: "uppercase",
              color: "#6B3F22", marginBottom: 10,
            }}
          >
            ✦ Hablemos
          </p>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
              fontWeight: 700, color: "#271409", lineHeight: 1.1,
            }}
          >
            Encuéntranos{" "}
            <em style={{ fontStyle: "italic", color: "#C07B52" }}>donde estés</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 15, color: "#6B3F22",
              lineHeight: 1.75, maxWidth: 380, margin: "14px auto 0",
            }}
          >
            Escríbenos o síguenos en redes. Estamos listos para atenderte.
          </p>
        </div>

        {/* Grid 2 × 2 */}
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <ContactCard href="https://wa.me/573001234567"       icon={<IconWA />}   dot="#25D366"     label="WhatsApp"           value="+57 300 123 4567" />
          <ContactCard href="mailto:info@shayacafe.co"         icon={<IconMail />} dot="#C07B52"     label="Correo electrónico" value="info@shayacafe.co" />
          <ContactCard href="https://instagram.com/shayacafe" icon={<IconIG />}   dot="linear-gradient(135deg,#f58529,#dd2a7b,#8134af)" label="Instagram" value="@shayacafe" />
          <ContactCard href="https://facebook.com/shayacafe"  icon={<IconFB />}   dot="#1877F2"     label="Facebook"           value="Shaya Café" />
        </div>

        {/* TikTok centrado */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="contact-tiktok-wrap"
            style={{ width: isMobile ? "100%" : "calc(50% - 6px)" }}
          >
            <ContactCard href="https://tiktok.com/@shayacafe" icon={<IconTK />} dot="#010101" label="TikTok" value="@shayacafe" />
          </div>
        </div>

        {/* Divisor */}
        <div style={{ height: 1, background: "#E8DDD0", margin: "44px 0 24px" }} />

        {/* Footer */}
        <div
          className="contact-footer"
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", flexWrap: "wrap", gap: 10,
          }}
        >
          <span style={{ fontFamily: "var(--display)", fontSize: 20, fontWeight: 700, color: "#271409" }}>
            Shaya <span style={{ color: "#C07B52" }}>Café</span>
          </span>
          <span style={{ fontFamily: "var(--sans)", fontSize: 12.5, color: "#B0A090" }}>
            © 2026 Shaya Café · Hecho con en Colombia
          </span>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
