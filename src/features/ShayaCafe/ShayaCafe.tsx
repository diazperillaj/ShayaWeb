import { useState, useEffect, useRef } from "react";

import Navbar           from "./sub_pages/Navbar";
import { MenuMobil }    from "./sub_pages/MenuMobil";
import Inicio           from "./sub_pages/Inicio";
import Productos        from "./sub_pages/Productos";
import Nosotros         from "./sub_pages/Nosotros";
import Contacto         from "./sub_pages/Contacto";
import CartModal        from "./sub_pages/CartModal";       // ← nuevo
import { CartProvider } from "./context/CartContext";       // ← nuevo
import { NAV_ITEMS }    from "./constants";

export default function ShayaCafe() {
  const [navShow,  setNavShow]  = useState(true);
  const [atTop,    setAtTop]    = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (id: string) => {
    setMenuOpen(false);
    setTimeout(
      () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      10
    );
  };

  return (
    // CartProvider envuelve todo — cualquier hijo puede usar useCart()
    <CartProvider>

      <Navbar
        navShow={navShow}
        atTop={atTop}
        menuOpen={menuOpen}
        navItems={NAV_ITEMS}
        onNavigate={go}
        onToggleMenu={() => setMenuOpen((o) => !o)}
      />

      <MenuMobil
        open={menuOpen}
        navItems={NAV_ITEMS}
        onNavigate={go}
      />

      <Inicio   onNavigate={go} />
      <Productos />
      <Nosotros />
      <Contacto />

      {/* Drawer del carrito — se controla desde CartContext */}
      <CartModal />

    </CartProvider>
  );
}