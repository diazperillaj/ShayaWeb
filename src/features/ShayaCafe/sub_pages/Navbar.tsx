import type { FC } from "react";
import type { NavItem } from "../types";
import Hamburger from "./MenuMobil";
import { useCart } from "../context/CartContext";

interface NavbarProps {
  navShow?: boolean;
  atTop?: boolean;
  menuOpen: boolean;
  navItems: NavItem[];
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}

// ── Shopping bag icon ──────────────────────────────────────────────
const BagIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

// ── Navbar ─────────────────────────────────────────────────────────
const Navbar: FC<NavbarProps> = ({
  navShow,
  atTop,
  menuOpen,
  navItems,
  onNavigate,
  onToggleMenu,
}) => {
  const transparent = atTop && !menuOpen;
  const { totalCount, openCart } = useCart();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[500] px-5 transition-[transform,background-color,border-color] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] ${
        navShow ? "translate-y-0" : "-translate-y-full"
      } ${
        transparent
          ? "bg-transparent border-b border-transparent backdrop-blur-none"
          : "bg-[#F9F5EF]/[0.96] border-b border-[#E8DDD0] backdrop-blur-xl"
      }`}
    >
      <div className="max-w-[1160px] mx-auto h-16 flex items-center justify-between">
        {/* ── Logo ── */}
        <button
          onClick={() => onNavigate("inicio")}
          className="bg-transparent border-0 cursor-pointer flex items-center gap-2.5 relative z-[501]"
        >
          <img
            src="/logo_sin_fondo.ico"
            alt="Shaya Café"
            className={`h-10 sm:h-8 md:h-12 w-auto object-contain transition-all duration-[400ms] `}
          />
          <span
            className={`text-[#402d0f] font-display italic text-2xl font-semibold transition-colors duration-[400ms] "
            }`}
          >
            Shaya <span className="text-[#f3990d]">Café</span>
          </span>
        </button>

        {/* ── Desktop nav links ── */}
        <nav className="hidden md:flex gap-8">
          {navItems.map(({ label, id }) => (
            <span
              key={id}
              onClick={() => onNavigate(id)}
              className={`nav-link-underline relative font-sans text-[.78rem] font-semibold tracking-[.13em] uppercase cursor-pointer pb-[3px] transition-colors duration-300 ${
                atTop ? "text-white/82" : "text-[#271409]"
              }`}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="flex items-center gap-3">
          {/* CTA — desktop only */}
          <button
            onClick={() => onNavigate("contacto")}
            className="hidden md:block font-sans text-xs font-bold tracking-[.1em] uppercase text-white bg-[#C07B52] hover:bg-[#271409] border-0 rounded-full px-6 py-2.5 cursor-pointer transition-colors duration-300"
          >
            Contáctanos
          </button>

          {/* ── Cart button ── */}
          <button
            onClick={openCart}
            aria-label={`Carrito${totalCount > 0 ? `, ${totalCount} productos` : ""}`}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-0 cursor-pointer transition-colors duration-300 z-[501] ${
              transparent
                ? "bg-white/15 hover:bg-white/25"
                : "bg-[#EDE7DE] hover:bg-[#E0D6CA]"
            }`}
          >
            <BagIcon
              className={`w-[18px] h-[18px] transition-colors duration-300 ${
                transparent ? "text-white" : "text-[#271409]"
              }`}
            />

            {/* Badge */}
            {totalCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-sans text-[10px] font-bold text-white px-1 bg-[#C07B52] animate-[cartPop_.3s_cubic-bezier(.34,1.56,.64,1)] ${
                  transparent ? "shadow-none" : "ring-2 ring-[#F9F5EF]"
                }`}
              >
                {totalCount > 99 ? "99+" : totalCount}
              </span>
            )}
          </button>

          {/* ── Hamburger — mobile only ── */}
          <button
            onClick={onToggleMenu}
            aria-label="Menú"
            className="flex md:hidden bg-transparent border-0 cursor-pointer relative z-[501] p-1"
          >
            <Hamburger
              open={menuOpen}
              color={transparent ? "#fff" : "#271409"}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
