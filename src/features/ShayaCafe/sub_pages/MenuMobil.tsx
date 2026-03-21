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
  <div className={`mobile-menu ${open ? "open" : "closed"}`}>
    {navItems.map(({ label, id }) => (
      <span key={id} className="mob-link" onClick={() => onNavigate(id)}>
        {label}
      </span>
    ))}
    <button
      onClick={() => onNavigate("contacto")}
      style={{
        marginTop: 16,
        fontFamily: "var(--sans)",
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        color: "#fff",
        background: "#C07B52",
        border: "none",
        borderRadius: 99,
        padding: "13px 36px",
        cursor: "pointer",
      }}
    >
      Contáctanos
    </button>
  </div>
);
