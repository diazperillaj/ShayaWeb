import { useState } from "react";
import type { FC } from "react";
import type { Product } from "../types";
import { PRODUCTS } from "../constants";
import { useReveal, useIsMobile } from "../hooks";

// ── Tarjeta individual de producto ────────────────────────────────
const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: "hidden",
        background: "#FFFFFF",
        border: "1px solid #E8DDD0",
        boxShadow: hovered
          ? "0 18px 50px rgba(39,20,9,.12)"
          : "0 2px 14px rgba(39,20,9,.05)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition: "box-shadow .4s ease, transform .4s ease",
        cursor: "pointer",
      }}
    >
      {/* Imagen con swap al hover */}
      <div style={{ position: "relative", height: 450, overflow: "hidden" }}>
        {([product.imgA, product.imgB] as string[]).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: (i === 0 ? !hovered : hovered) ? 1 : 0,
              transform: (i === 0 ? !hovered : hovered)
                ? "scale(1)"
                : "scale(1.07)",
              transition: "opacity .65s ease, transform .65s ease",
            }}
          />
        ))}

        {/* Badge */}
        <span
          style={{
            position: "absolute", top: 14, left: 14,
            background: "#C07B52", color: "#fff",
            fontSize: 10, fontWeight: 700,
            letterSpacing: ".14em", textTransform: "uppercase",
            padding: "4px 12px", borderRadius: 99,
            fontFamily: "var(--sans)",
          }}
        >
          {product.badge}
        </span>

        {/* Peso */}
        <span
          style={{
            position: "absolute", top: 14, right: 14,
            background: "rgba(249,245,239,.92)", color: "#5A8270",
            fontSize: 11, fontWeight: 700, letterSpacing: ".08em",
            padding: "4px 10px", borderRadius: 99,
            fontFamily: "var(--sans)", backdropFilter: "blur(4px)",
          }}
        >
          {product.weight}
        </span>
      </div>

      {/* Cuerpo */}
      <div style={{ padding: "22px 24px 26px" }}>
        <p
          style={{
            fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 700,
            letterSpacing: ".2em", textTransform: "uppercase",
            color: "#5A8270", marginBottom: 6,
          }}
        >
          {product.tagline}
        </p>

        <h3
          style={{
            fontFamily: "var(--display)", fontSize: 23, fontWeight: 700,
            color: "#271409", marginBottom: 18,
          }}
        >
          {product.name}
        </h3>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              fontFamily: "var(--display)", fontSize: 27,
              fontWeight: 700, color: "#C07B52",
            }}
          >
            {product.price}
          </span>
          <button
            style={{
              fontFamily: "var(--sans)", fontSize: 12.5, fontWeight: 600,
              letterSpacing: ".05em", color: "#fff",
              background: hovered ? "#271409" : "#C07B52",
              border: "none", borderRadius: 99,
              padding: "10px 22px", cursor: "pointer",
              transition: "background .3s ease",
            }}
          >
            Pedir ahora
          </button>
        </div>
      </div>
    </article>
  );
};

// ── Sección Productos ──────────────────────────────────────────────
const Productos: FC = () => {
  const { ref, visible } = useReveal();
  const isMobile = useIsMobile();

  return (
    <section
      id="productos"
      style={{
        background: "#F9F5EF",
        padding: isMobile ? "72px 16px 88px" : "96px 24px 112px",
      }}
    >
      <div
        ref={ref}
        className={`rev ${visible ? "on" : "off"}`}
        style={{ maxWidth: 1080, margin: "0 auto" }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p
            style={{
              fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 700,
              letterSpacing: ".3em", textTransform: "uppercase",
              color: "#5A8270", marginBottom: 10,
            }}
          >
            Nuestros productos
          </p>
          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(1.9rem, 3.8vw, 3rem)",
              fontWeight: 700, color: "#271409", lineHeight: 1.1,
            }}
          >
            Café que{" "}
            <em style={{ fontStyle: "italic", color: "#C07B52" }}>se siente</em>
          </h2>
          <div
            style={{
              width: 44, height: 2,
              background: "linear-gradient(90deg,#C07B52,#5A8270)",
              borderRadius: 99, margin: "16px auto 0",
            }}
          />
        </div>

        {/* Fila 1 — productos 1 y 2 */}
        <div
          className="products-row1"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 26,
            marginBottom: 26,
          }}
        >
          {PRODUCTS.slice(0, 2).map((p, i) => (
            <div
              key={p.id}
              className={`rev ${visible ? "on" : "off"} d${i + 1}`}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Fila 2 — producto 3 centrado debajo */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className={`rev ${visible ? "on" : "off"} d3 products-row2-wrap`}
            style={{ width: isMobile ? "100%" : "calc(50% - 13px)" }}
          >
            <ProductCard product={PRODUCTS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productos;
