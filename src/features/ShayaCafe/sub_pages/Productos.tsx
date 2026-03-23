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
      className="rounded-[18px] overflow-hidden bg-white border border-[#E8DDD0] cursor-pointer transition-[box-shadow,transform] duration-[400ms] ease-[ease]"
      style={{
        boxShadow: hovered
          ? "0 18px 50px rgba(39,20,9,.12)"
          : "0 2px 14px rgba(39,20,9,.05)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
      }}
    >
      {/* Imagen con swap al hover */}
      <div className="relative h-[450px] overflow-hidden">
        {([product.imgA, product.imgB] as string[]).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[650ms] ease-[ease]"
            style={{
              opacity: (i === 0 ? !hovered : hovered) ? 1 : 0,
              transform: (i === 0 ? !hovered : hovered) ? "scale(1)" : "scale(1.07)",
            }}
          />
        ))}

        {/* Badge */}
        <span className="absolute top-[14px] left-[14px] bg-[#C07B52] text-white text-[10px] font-bold tracking-[.14em] uppercase px-3 py-1 rounded-full font-sans">
          {product.badge}
        </span>

        {/* Peso */}
        <span className="absolute top-[14px] right-[14px] bg-[rgba(249,245,239,.92)] text-[#5A8270] text-[11px] font-bold tracking-[.08em] px-[10px] py-1 rounded-full font-sans backdrop-blur-[4px]">
          {product.weight}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="px-6 pt-[22px] pb-[26px]">
        <p className="font-sans text-[10.5px] font-bold tracking-[.2em] uppercase text-[#5A8270] mb-[6px]">
          {product.tagline}
        </p>

        <h3 className="font-display text-[23px] font-bold text-[#271409] mb-[18px]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-display text-[27px] font-bold text-[#C07B52]">
            {product.price}
          </span>
          <button
            className="font-sans text-[12.5px] font-semibold tracking-[.05em] text-white border-none rounded-full px-[22px] py-[10px] cursor-pointer transition-colors duration-300 ease-[ease]"
            style={{ background: hovered ? "#271409" : "#C07B52" }}
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
      className="bg-[#F9F5EF]"
      style={{ padding: isMobile ? "72px 16px 88px" : "96px 24px 112px" }}
    >
      <div
        ref={ref}
        className={`transition-[opacity,transform] duration-[900ms] ease-[ease] max-w-[1080px] mx-auto ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Encabezado */}
        <div className="text-center mb-[52px]">
          <p className="font-sans text-[10.5px] font-bold tracking-[.3em] uppercase text-[#5A8270] mb-[10px]">
            Nuestros productos
          </p>
          <h2
            className="font-display font-bold text-[#271409] leading-[1.1]"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)" }}
          >
            Café que{" "}
            <em className="italic text-[#C07B52]">se siente</em>
          </h2>
          <div
            className="w-11 h-[2px] rounded-full mx-auto mt-4"
            style={{ background: "linear-gradient(90deg,#C07B52,#5A8270)" }}
          />
        </div>

        {/* Fila 1 — productos 1 y 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[26px] mb-5 md:mb-[26px]">
          {PRODUCTS.slice(0, 2).map((p, i) => (
            <div
              key={p.id}
              className="transition-[opacity,transform] duration-[900ms] ease-[ease]"
              style={{
                transitionDelay: i === 0 ? ".06s" : ".20s",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
              }}
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>

        {/* Fila 2 — producto 3 centrado debajo */}
        <div className="flex justify-center">
          <div
            className="w-full md:w-[calc(50%-13px)] transition-[opacity,transform] duration-[900ms] ease-[ease]"
            style={{
              transitionDelay: ".34s",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(32px)",
            }}
          >
            <ProductCard product={PRODUCTS[2]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Productos;
