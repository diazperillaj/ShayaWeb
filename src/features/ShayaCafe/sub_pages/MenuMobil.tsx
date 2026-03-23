import type { FC } from "react";
import type { NavItem } from "../types";

// ── Ícono hamburguesa animado ──────────────────────────────────────
interface HamburgerProps {
  open: boolean;
  color: string;
}

const Hamburger: FC<HamburgerProps> = ({ open, color }) => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <line
      x1="3" y1={open ? "11" : "5"} x2="19" y2={open ? "11" : "5"}
      stroke={color} strokeWidth="1.8" strokeLinecap="round"
      style={{
        transform: open ? "rotate(45deg)" : "none",
        transformOrigin: "center",
        transition: "all .3s ease",
      }}
    />
    <line
      x1="3" y1="11" x2="19" y2="11"
      stroke={color} strokeWidth="1.8" strokeLinecap="round"
      style={{ opacity: open ? 0 : 1, transition: "opacity .3s ease" }}
    />
    <line
      x1="3" y1={open ? "11" : "17"} x2="19" y2={open ? "11" : "17"}
      stroke={color} strokeWidth="1.8" strokeLinecap="round"
      style={{
        transform: open ? "rotate(-45deg)" : "none",
        transformOrigin: "center",
        transition: "all .3s ease",
      }}
    />
  </svg>
);

export default Hamburger;

// ── Overlay de menú móvil ──────────────────────────────────────────
interface MenuMobilProps {
  open: boolean;
  navItems: NavItem[];
  onNavigate: (id: string) => void;
}

export const MenuMobil: FC<MenuMobilProps> = ({ open, navItems, onNavigate }) => (
  <div
    className={`
      fixed inset-0 z-[400] bg-[#F9F5EF]
      flex flex-col items-center justify-center gap-2
      transition-[opacity,transform] duration-[350ms] ease-[ease]
      ${open
        ? "opacity-100 translate-y-0 pointer-events-auto"
        : "opacity-0 -translate-y-3 pointer-events-none"
      }
    `}
  >
    {navItems.map(({ label, id }) => (
      <span
        key={id}
        onClick={() => onNavigate(id)}
        className="font-display text-[2rem] font-bold text-[#271409] cursor-pointer py-3 tracking-[-0.01em] transition-colors duration-[250ms] hover:text-[#C07B52]"
      >
        {label}
      </span>
    ))}
    <button
      onClick={() => onNavigate("contacto")}
      className="mt-4 font-sans text-[13px] font-bold tracking-[.1em] uppercase text-white bg-[#C07B52] border-none rounded-full px-9 py-[13px] cursor-pointer"
    >
      Contáctanos
    </button>
  </div>
);
