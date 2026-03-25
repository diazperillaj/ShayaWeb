import { useEffect } from "react";
import type { FC } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { formatCOP, unitPriceFor } from "../constants";

// ── Icon helpers ────────────────────────────────────────────────────
const BagIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const XIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const WAIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.847L.057 23.887l6.207-1.46A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.844 0-3.577-.487-5.078-1.338l-.362-.213-3.684.866.899-3.572-.235-.374A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

// ── Format price ────────────────────────────────────────────────────
const fmt = (n: number) => "$" + n.toLocaleString("es-CO");

// ── CartModal ───────────────────────────────────────────────────────
const CartModal: FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, totalPrice, totalCount } = useCart();
  const navigate = useNavigate();

  // Esc key close
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && closeCart();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [closeCart]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleProceed = () => {
    closeCart();
    const encoded = encodeURIComponent(JSON.stringify(items));
    navigate(`/checkout?cart=${encoded}`);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`fixed inset-0 z-[600] bg-[#271409]/50 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed top-0 right-0 h-full z-[601] flex flex-col bg-[#F9F5EF] shadow-2xl transition-transform duration-[420ms] ease-[cubic-bezier(.16,1,.3,1)] w-full max-w-[420px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8DDD0]">
          <div className="flex items-center gap-3">
            <BagIcon className="w-5 h-5 text-[#C07B52]" />
            <h2 className="font-display text-lg font-bold text-[#271409]">Tu pedido</h2>
            {totalCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#C07B52] text-white text-[10px] font-bold">
                {totalCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EDE7DE] hover:bg-[#E0D6CA] transition-colors duration-200 cursor-pointer border-0"
          >
            <XIcon className="w-3.5 h-3.5 text-[#271409]" />
          </button>
        </div>

        {/* ── Items ── */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center py-16 gap-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EDE7DE]">
                <BagIcon className="w-7 h-7 text-[#C07B52]" />
              </div>
              <p className="font-display text-base font-bold text-[#271409]">Tu carrito está vacío</p>
              <p className="font-sans text-sm text-[#8A7060] text-center leading-relaxed">
                Agrega alguno de nuestros cafés para continuar.
              </p>
              <button
                onClick={closeCart}
                className="font-sans text-xs font-semibold tracking-wide uppercase text-white bg-[#C07B52] hover:bg-[#271409] transition-colors duration-300 rounded-full px-6 py-2.5 cursor-pointer border-0"
              >
                Ver productos
              </button>
            </div>
          ) : (
            items.map(({ product, quantity, weightGrams }) => (
              <div
                key={`${product.id}-${weightGrams ?? "x"}`}
                className="flex gap-3 rounded-2xl p-3 bg-white border border-[#E8DDD0]"
              >
                {/* Thumbnail */}
                <div className="w-[68px] h-[68px] rounded-xl overflow-hidden flex-shrink-0">
                  <img src={product.imgA} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-[9.5px] font-bold tracking-[.18em] uppercase text-[#5A8270] mb-0.5">
                    {product.tagline}
                  </p>
                  <p className="font-display text-sm font-bold text-[#271409] truncate leading-tight mb-0.5">
                    {product.name}
                  </p>
                  {weightGrams != null && (
                    <p className="font-sans text-[10px] text-[#8A7060] mb-2">
                      {weightGrams} g
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Stepper */}
                    <div className="flex items-center gap-2 bg-[#F3EDE4] border border-[#E8DDD0] rounded-full px-1 py-0.5">
                      <button
                        onClick={() => updateQty(product.id, -1, weightGrams)}
                        aria-label="Reducir cantidad"
                        className={`flex items-center justify-center w-6 h-6 rounded-full border-0 cursor-pointer font-bold text-sm leading-none transition-colors duration-200 ${
                          quantity === 1
                            ? "bg-[#E8DDD0] text-[#8A7060]"
                            : "bg-[#C07B52] text-white hover:bg-[#271409]"
                        }`}
                      >
                        −
                      </button>
                      <span className="font-sans text-sm font-bold text-[#271409] w-4 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQty(product.id, 1, weightGrams)}
                        aria-label="Aumentar cantidad"
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C07B52] hover:bg-[#271409] text-white border-0 cursor-pointer font-bold text-sm leading-none transition-colors duration-200"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display text-base font-bold text-[#C07B52]">
                      {formatCOP(unitPriceFor(product, weightGrams))}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(product.id, weightGrams)}
                  aria-label="Eliminar producto"
                  className="self-start mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-[#F3EDE4] hover:bg-red-50 hover:text-red-400 text-[#C07B52] border-0 cursor-pointer transition-colors duration-200 flex-shrink-0"
                >
                  <XIcon className="w-2.5 h-2.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* ── Footer ── */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#E8DDD0] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-sans text-sm text-[#8A7060] font-semibold">
                Subtotal ({totalCount} {totalCount === 1 ? "producto" : "productos"})
              </span>
              <span className="font-display text-2xl font-bold text-[#271409]">
                {fmt(totalPrice)}
              </span>
            </div>
            <p className="font-sans text-xs text-[#8A7060]">
              El envío se calcula al confirmar el pedido por WhatsApp.
            </p>
            <button
              onClick={handleProceed}
              className="w-full flex items-center justify-center gap-2 font-sans text-sm font-bold tracking-wide uppercase text-white bg-[#C07B52] hover:bg-[#271409] transition-colors duration-300 rounded-full py-3.5 cursor-pointer border-0"
            >
              <WAIcon className="w-4 h-4" />
              Proceder al pedido
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default CartModal;