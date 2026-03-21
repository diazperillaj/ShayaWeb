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
    tagline: "Tostión media · filtro & prensa francesa",
    price: "$18.000",
    weight: "250 g",
    badge: "Más vendido",
    imgA: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=700&q=80",
    imgB: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
  },
  {
    id: 2,
    name: "Café en Grano",
    tagline: "Single origin · perfil floral y frutado",
    price: "$22.000",
    weight: "250 g",
    badge: "Premium",
    imgA: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=700&q=80",
    imgB: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=700&q=80",
  },
  {
    id: 3,
    name: "Café 5 Lb",
    tagline: "Formato familiar · mismo sabor de siempre",
    price: "$85.000",
    weight: "5 lb",
    badge: "Familiar",
    imgA: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?w=700&q=80",
    imgB: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&q=80",
  },
];
