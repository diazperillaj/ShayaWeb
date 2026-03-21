import type { FC } from "react";
import type { NavItem } from "../types";
import Hamburger from "./MenuMobil";

interface NavbarProps {
  navShow: boolean;
  atTop: boolean;
  menuOpen: boolean;
  navItems: NavItem[];
  onNavigate: (id: string) => void;
  onToggleMenu: () => void;
}

const Navbar: FC<NavbarProps> = ({
  navShow,
  atTop,
  menuOpen,
  navItems,
  onNavigate,
  onToggleMenu,
}) => {
  const transparent = atTop && !menuOpen;

  return (
    <header
      style={{
        position: "fixed",
        inset: "0 0 auto",
        zIndex: 500,
        padding: "0 20px",
        background: transparent ? "transparent" : "rgba(249,245,239,.96)",
        backdropFilter: transparent ? "none" : "blur(20px)",
        borderBottom: transparent
          ? "1px solid transparent"
          : "1px solid #E8DDD0",
        transform: navShow ? "translateY(0)" : "translateY(-100%)",
        transition:
          "transform .45s cubic-bezier(.16,1,.3,1), background .4s, border-color .4s",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ── Marca ── */}
        <button
          onClick={() => onNavigate("inicio")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            position: "relative",
            zIndex: 501,
          }}
        >
          
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 20,
              fontWeight: 700,
              color: transparent ? "#fff" : "#271409",
              transition: "color .4s",
            }}
          >
            SHAYA <span style={{ color: "#C07B52" }}>CAFÉ</span>
          </span>
        </button>

        {/* ── Links desktop ── */}
        <nav className="nav-desktop-links" style={{ display: "flex", gap: 32 }}>
          {navItems.map(({ label, id }) => (
            <span
              key={id}
              className="nl"
              onClick={() => onNavigate(id)}
              style={{
                color: atTop ? "rgba(255,255,255,.82)" : "#271409",
              }}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* ── CTA desktop ── */}
        <button
          className="nav-desktop-cta"
          onClick={() => onNavigate("contacto")}
          style={{
            fontFamily: "var(--sans)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "#fff",
            background: "#C07B52",
            border: "none",
            borderRadius: 99,
            padding: "10px 24px",
            cursor: "pointer",
            transition: "background .3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#271409")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#C07B52")}
        >
          Contáctanos
        </button>

        {/* ── Hamburger mobile ── */}
        <button
          className="nav-hamburger"
          onClick={onToggleMenu}
          aria-label="Menú"
          style={{
            display: "none", // overridden by media query
            background: "none",
            border: "none",
            cursor: "pointer",
            position: "relative",
            zIndex: 501,
            padding: 4,
          }}
        >
          <Hamburger open={menuOpen} color={transparent ? "#fff" : "#271409"} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
