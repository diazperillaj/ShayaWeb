import { useState } from "react";
import type { FC } from "react";
import type { CoffeeWeightGrams, Product } from "../types";
import { PRODUCTS, WEIGHT_PRICES_CO, formatCOP, unitPriceFor } from "../constants";
import { useReveal, useIsMobile } from "../hooks";
import { useCart } from "../context/CartContext";

// ── Icons ──────────────────────────────────────────────────────────
const BagIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── ProductCard ────────────────────────────────────────────────────
const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const [weight, setWeight] = useState<CoffeeWeightGrams>(500);
  const { addItem } = useCart();

  const selectable = product.weightSelectable === true;
  const displayWeight = selectable ? `${weight} g` : product.weight;
  const displayPrice = formatCOP(unitPriceFor(product, selectable ? weight : undefined));

  const handleAdd = () => {
    addItem(product, selectable ? weight : undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-[18px] overflow-hidden bg-white border border-[#E8DDD0] cursor-pointer transition-[box-shadow,transform] duration-[400ms] ${
        hovered
          ? "shadow-[0_18px_50px_rgba(39,20,9,.12)] -translate-y-[7px]"
          : "shadow-[0_2px_14px_rgba(39,20,9,.05)] translate-y-0"
      }`}
    >
      {/* ── Image swap on hover ── */}
      <div className="relative h-[450px] overflow-hidden">
        {([product.imgA, product.imgB] as string[]).map((src, i) => (
          <img
            key={i}
            src={src}
            alt={product.name}
            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-[650ms] ${
              (i === 0 ? !hovered : hovered)
                ? "opacity-100 scale-100"
                : "opacity-0 scale-[1.07]"
            }`}
          />
        ))}

        {/* Badge */}
        <span className="absolute top-3.5 left-3.5 bg-[#C07B52] text-white text-[10px] font-bold tracking-[.14em] uppercase px-3 py-1 rounded-full font-sans">
          {product.badge}
        </span>

        {/* Weight */}
        <span className="absolute top-3.5 right-3.5 bg-[#F9F5EF]/92 text-[#5A8270] text-[11px] font-bold tracking-[.08em] px-2.5 py-1 rounded-full font-sans backdrop-blur-[4px]">
          {displayWeight}
        </span>
      </div>

      {/* ── Body ── */}
      <div className="px-6 pt-[22px] pb-[26px]">
        <p className="font-sans text-[10.5px] font-bold tracking-[.2em] uppercase text-[#5A8270] mb-1.5">
          {product.tagline}
        </p>

        <h3 className="font-display text-[23px] font-bold text-[#271409] mb-[18px]">
          {product.name}
        </h3>

        {selectable && (
          <div className="flex gap-2 mb-4">
            {([250, 500] as const).map((g) => (
              <button
                key={g}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setWeight(g);
                }}
                className={`flex-1 font-sans text-[11px] font-bold tracking-[.06em] uppercase rounded-full py-2 border transition-colors duration-200 cursor-pointer ${
                  weight === g
                    ? "bg-[#c07b52] text-[#FEFCF9] border-[#c07b52]"
                    : "bg-[#F3EDE4] text-[#8A7060] border-[#E8DDD0] hover:border-[#C07B52]"
                }`}
              >
                {g} g · {formatCOP(WEIGHT_PRICES_CO[g])}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="font-display text-[27px] font-bold text-[#C07B52]">
            {displayPrice}
          </span>

          {/* Add to cart button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
            aria-label={`Agregar ${product.name} al carrito`}
            className={`flex items-center gap-1.5 font-sans text-[12.5px] font-semibold tracking-[.05em] text-white border-0 rounded-full px-[22px] py-2.5 cursor-pointer transition-all duration-300 min-w-[130px] justify-center ${
              added
                ? "bg-[#5A8270]"
                : hovered
                ? "bg-[#271409]"
                : "bg-[#C07B52]"
            }`}
          >
            {added ? (
              <>
                <CheckIcon className="w-3 h-3" />
                Agregado
              </>
            ) : (
              <>
                <BagIcon className="w-3 h-3" />
                Agregar
              </>
            )}
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
        className={`max-w-[1080px] mx-auto transition-[opacity,transform] duration-[900ms] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* ── Header ── */}
        <div className="text-center mb-[52px]">
          <p className="font-sans text-[10.5px] font-bold tracking-[.3em] uppercase text-[#5A8270] mb-2.5">
            Nuestros productos
          </p>
          <h2
            className="font-display font-bold text-[#271409] leading-[1.1]"
            style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)" }}
          >
            Café que{" "}
            <em className="italic text-[#C07B52]">se siente</em>
          </h2>
          <div className="w-11 h-0.5 rounded-full mx-auto mt-4 bg-gradient-to-r from-[#C07B52] to-[#5A8270]" />
        </div>

        {/* ── Row 1: products 1 & 2 ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-[26px] mb-5 md:mb-[26px]">
          {PRODUCTS.slice(0, 2).map((p, i) => (
            <div
              key={p.id}
              className="transition-[opacity,transform] duration-[900ms]"
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

        {/* ── Row 2: product 3 centered ── */}
        <div className="flex justify-center">
          <div
            className="w-full md:w-[calc(50%-13px)] transition-[opacity,transform] duration-[900ms]"
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