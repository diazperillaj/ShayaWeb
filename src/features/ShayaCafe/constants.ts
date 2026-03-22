import type { Product, NavItem } from "./types";

// ── Paleta
// --cream   : #F9F5EF
// --ivory   : #F0E9DC
// --terra   : #C07B52
// --moss    : #5A8270
// --espresso: #271409
// --mocha   : #6B3F22

export const NAV_ITEMS: NavItem[] = [
  { label: "Inicio",    id: "inicio"    },
  { label: "Productos", id: "productos" },
  { label: "Nosotros",  id: "nosotros"  },
  { label: "Contacto",  id: "contacto"  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Café Molido",
    tagline: "Tostión media",
    price: "$40.000",
    weight: "500 g",
    badge: "Más vendido",
    imgA: "/Products/ground_front.png",
    imgB: "/Products/ground_back.png",
  },
  {
    id: 2,
    name: "Café en Grano",
    tagline: "Single origin",
    price: "$40.000",
    weight: "500 g",
    badge: "Premium",
    imgA: "/Products/grain_front.png",
    imgB: "/Products/grain_lateral.png",
  },
  {
    id: 3,
    name: "Café 5 Lb",
    tagline: "Formato familiar · mismo sabor de siempre",
    price: "$185.000",
    weight: "5 lb",
    badge: "Familiar",
    imgA: "/Products/5lb_front.png",
    imgB: "/Products/5lb_top.png",
  },
];
