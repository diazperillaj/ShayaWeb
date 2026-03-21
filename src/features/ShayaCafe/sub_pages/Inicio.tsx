import type { FC } from "react";

interface InicioProps {
  onNavigate: (id: string) => void;
}

const Inicio: FC<InicioProps> = ({ onNavigate }) => (
  <section
    id="inicio"
    style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }}
  >
    {/* ── Foto fondo a pantalla completa ── */}
    <img
      src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1800&q=85"
      alt="Café Shaya portada"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center 55%",
      }}
    />

    {/* ── Overlay suave ── */}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(160deg,rgba(15,8,3,.40) 0%,rgba(15,8,3,.25) 45%,rgba(15,8,3,.55) 100%)",
      }}
    />

    {/* ── Contenido centrado sobre la foto ── */}
    <div
      style={{
        position: "relative",
        zIndex: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 20px",
      }}
    >
      {/* Eyebrow */}
      <p
        className="a1 hero-eyebrow"
        style={{
          fontFamily: "var(--sans)",
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: ".32em",
          textTransform: "uppercase",
          color: "#E8C49A",
          marginBottom: 18,
        }}
      >
        &nbsp;Café de origen colombiano
      </p>

      {/* Título */}
      <h1
        className="a2"
        style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(2.4rem, 6.5vw, 6rem)",
          fontWeight: 700,
          lineHeight: 1.06,
          color: "#FEFCF9",
          marginBottom: 20,
          letterSpacing: "-.015em",
          maxWidth: 760,
        }}
      >
        El alma del{" "}
        <em style={{ fontStyle: "italic", color: "#E8C49A" }}>buen café</em>
        <br />en cada sorbo
      </h1>

      {/* Subtítulo */}
      <p
        className="a3 hero-sub"
        style={{
          fontFamily: "var(--sans)",
          fontSize: 16,
          lineHeight: 1.85,
          color: "rgba(254,252,249,.66)",
          maxWidth: 460,
          marginBottom: 44,
        }}
      >
        Seleccionamos los mejores granos de las montañas colombianas
        para llevarte una experiencia cafetera auténtica y memorable.
      </p>

      {/* Botones */}
      <div
        className="a4 hero-btns"
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => onNavigate("productos")}
          style={{
            fontFamily: "var(--sans)",
            fontSize: 13.5,
            fontWeight: 600,
            color: "#fff",
            background: "#C07B52",
            border: "none",
            borderRadius: 99,
            padding: "14px 34px",
            cursor: "pointer",
            boxShadow: "0 8px 28px rgba(192,123,82,.45)",
            transition: "transform .25s, background .3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.04)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Ver productos →
        </button>

        <button
          onClick={() => onNavigate("nosotros")}
          style={{
            fontFamily: "var(--sans)",
            fontSize: 13.5,
            fontWeight: 500,
            color: "rgba(254,252,249,.88)",
            background: "rgba(254,252,249,.10)",
            border: "1.5px solid rgba(254,252,249,.32)",
            borderRadius: 99,
            padding: "14px 34px",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "background .3s, border-color .3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(254,252,249,.18)";
            e.currentTarget.style.borderColor = "rgba(254,252,249,.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(254,252,249,.10)";
            e.currentTarget.style.borderColor = "rgba(254,252,249,.32)";
          }}
        >
          Nuestra historia
        </button>
      </div>
    </div>

    {/* ── Flecha scroll ── */}
    <div
      className="arr"
      onClick={() => onNavigate("productos")}
      style={{
        position: "absolute",
        bottom: 30,
        left: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontFamily: "var(--sans)",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: ".28em",
          textTransform: "uppercase",
          color: "rgba(254,252,249,.38)",
        }}
      >
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
