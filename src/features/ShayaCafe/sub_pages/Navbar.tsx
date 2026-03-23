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
      className="fixed inset-x-0 top-0 z-[500] px-5"
      style={{
        background: transparent ? "transparent" : "rgba(249,245,239,.96)",
        backdropFilter: transparent ? "none" : "blur(20px)",
        borderBottom: transparent ? "1px solid transparent" : "1px solid #E8DDD0",
        transform: navShow ? "translateY(0)" : "translateY(-100%)",
        transition: "transform .45s cubic-bezier(.16,1,.3,1), background .4s, border-color .4s",
      }}
    >
      <div className="max-w-[1160px] mx-auto h-16 flex items-center justify-between">

        {/* ── Marca ── */}
        <button
          onClick={() => onNavigate("inicio")}
          className="bg-transparent border-none cursor-pointer flex items-center gap-[10px] relative z-[501]"
        >
          <span
            className="font-display text-[20px] font-bold transition-colors duration-[400ms]"
            style={{ color: transparent ? "#fff" : "#271409" }}
          >
            SHAYA <span className="text-[#C07B52]">CAFÉ</span>
          </span>
        </button>

        {/* ── Links desktop ── */}
        <nav className="hidden md:flex gap-8">
          {navItems.map(({ label, id }) => (
            <span
              key={id}
              onClick={() => onNavigate(id)}
              className="nav-link-underline relative font-sans text-[.78rem] font-semibold tracking-[.13em] uppercase cursor-pointer pb-[3px] transition-colors duration-300"
              style={{ color: atTop ? "rgba(255,255,255,.82)" : "#271409" }}
            >
              {label}
            </span>
          ))}
        </nav>

        {/* ── CTA desktop ── */}
        <button
          onClick={() => onNavigate("contacto")}
          className="hidden md:block font-sans text-[12px] font-bold tracking-[.1em] uppercase text-white bg-[#C07B52] border-none rounded-full px-6 py-[10px] cursor-pointer transition-colors duration-300 hover:bg-[#271409]"
        >
          Contáctanos
        </button>

        {/* ── Hamburger mobile ── */}
        <button
          onClick={onToggleMenu}
          aria-label="Menú"
          className="flex md:hidden bg-transparent border-none cursor-pointer relative z-[501] p-1"
        >
          <Hamburger open={menuOpen} color={transparent ? "#fff" : "#271409"} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
