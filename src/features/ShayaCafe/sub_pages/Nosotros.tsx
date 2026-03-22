import type { FC } from "react";
import { useReveal, useIsMobile } from "../hooks";

const Nosotros: FC = () => {
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();

  return (
    <section
      id="nosotros"
      style={{
        background: "#F0E9DC",
        padding: isMobile ? "72px 16px" : "100px 24px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Blob decorativo */}
      <div
        style={{
          position: "absolute", right: -130, bottom: -130,
          width: 500, height: 500, borderRadius: "50%",
          background: "rgba(90,130,112,.07)", pointerEvents: "none",
        }}
      />

      <div
        ref={ref}
        className={`rev about-inner ${visible ? "on" : "off"}`}
        style={{
          maxWidth: 1080,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: 72,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Foto ── */}
        <div className="about-photo-col" style={{ flex: "0 0 44%", position: "relative" }}>
          <div style={{ borderRadius: 20, overflow: "hidden" }}>
            <img
              src="/Microcentral/process.jpg"
              alt="Proceso artesanal Shaya Café"
              style={{
                width: "100%", height: 460,
                objectFit: "cover", display: "block",
              }}
            />
          </div>

          {/* Badge flotante */}
          <div
            className="about-badge"
            style={{
              position: "absolute", bottom: -20, right: -20,
              background: "#C07B52", borderRadius: 16,
              padding: "18px 24px",
              boxShadow: "0 12px 38px rgba(192,123,82,.28)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--display)", fontSize: 34,
                fontWeight: 700, color: "#fff", lineHeight: 1,
              }}
            >
              100%
            </p>
            <p
              style={{
                fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 700,
                letterSpacing: ".15em", textTransform: "uppercase",
                color: "rgba(255,255,255,.8)", marginTop: 4,
              }}
            >
              Origen colombiano
            </p>
          </div>
        </div>

        {/* ── Texto ── */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 700,
              letterSpacing: ".3em", textTransform: "uppercase",
              color: "#5A8270", marginBottom: 14,
            }}
          >
            ✦ Quiénes somos
          </p>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(1.8rem, 2.8vw, 2.7rem)",
              fontWeight: 700, color: "#271409",
              lineHeight: 1.15, marginBottom: 22,
            }}
          >
            Pasión por el café,<br />
            <em style={{ fontStyle: "italic", color: "#C07B52" }}>
              desde las montañas
            </em>
            <br />hasta tu taza
          </h2>

          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 15,
              lineHeight: 1.88, color: "#6B3F22", marginBottom: 16,
            }}
          >
            En <strong style={{ color: "#271409" }}>Shaya Café</strong> creemos
            que una buena taza de café va más allá del sabor: es un ritual, un
            momento de pausa, una conexión con la tierra colombiana que lo hace
            posible.
          </p>

          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 15,
              lineHeight: 1.88, color: "#6B3F22", marginBottom: 44,
            }}
          >
            Seleccionamos granos en una de las mejores regiones cafeteras del país,
            con tostión artesanal que respeta el perfil único de cada variedad.
            Cada grano tiene una historia — nosotros te la contamos en cada sorbo.
          </p>

          {/* Stats */}
          <div className="about-stats" style={{ display: "flex", gap: 44 }}>
            {[
              ["4+",   "Años de exp."],
              ["100%", "Café de origen"],
              ["3",    "Presentaciones"],
            ].map(([n, l]) => (
              <div key={l}>
                <p
                  style={{
                    fontFamily: "var(--display)", fontSize: 32,
                    fontWeight: 700, color: "#C07B52",
                  }}
                >
                  {n}
                </p>
                <p
                  style={{
                    fontFamily: "var(--sans)", fontSize: 11,
                    fontWeight: 600, color: "#B0A090",
                    letterSpacing: ".06em", marginTop: 2,
                  }}
                >
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
