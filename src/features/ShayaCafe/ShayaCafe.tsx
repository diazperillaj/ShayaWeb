import { useState, useEffect, useRef } from "react";

import GlobalStyles          from "./GlobalStyles";
import Navbar                from "./sub_pages/Navbar";
import { MenuMobil }         from "./sub_pages/MenuMobil";
import Inicio                from "./sub_pages/Inicio";
import Productos             from "./sub_pages/Productos";
import Nosotros              from "./sub_pages/Nosotros";
import Contacto              from "./sub_pages/Contacto";
import { NAV_ITEMS }         from "./constants";

// ── Componente raíz ────────────────────────────────────────────────
export default function ShayaCafe() {
  const [navShow,   setNavShow]   = useState(true);
  const [atTop,     setAtTop]     = useState(true);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const lastY = useRef(0);

  // Navbar: ocultar al bajar, mostrar al subir
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavShow(y < lastY.current || y < 60);
      setAtTop(y < 30);
      lastY.current = y;
      if (y > 60) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body cuando el menú mobile está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Navegación suave hacia una sección
  const go = (id: string) => {
    setMenuOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      10
    );
  };

  return (
    <>
      {/* Estilos globales y fuentes */}
      <GlobalStyles />

      {/* Navbar fijo con lógica hide/show */}
      <Navbar
        navShow={navShow}
        atTop={atTop}
        menuOpen={menuOpen}
        navItems={NAV_ITEMS}
        onNavigate={go}
        onToggleMenu={() => setMenuOpen((o) => !o)}
      />

      {/* Menú overlay mobile */}
      <MenuMobil
        open={menuOpen}
        navItems={NAV_ITEMS}
        onNavigate={go}
      />

      {/* Secciones de la página */}
      <Inicio    onNavigate={go} />
      <Productos />
      <Nosotros  />
      <Contacto  />
    </>
  );
}
