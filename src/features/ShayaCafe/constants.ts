import type { CoffeeWeightGrams, Product, NavItem } from "./types";

/** Precios COP para café molido / grano por presentación. */
export const WEIGHT_PRICES_CO: Record<CoffeeWeightGrams, number> = {
  250: 25_000,
  500: 45_000,
};

export const formatCOP = (n: number): string =>
  "$" + n.toLocaleString("es-CO");

export const parsePriceString = (price: string): number => {
  const clean = price.replace(/[^0-9]/g, "");
  return parseInt(clean, 10) || 0;
};

/** Precio unitario COP según producto y (si aplica) presentación en gramos. */
export function unitPriceFor(
  product: Product,
  weightGrams?: CoffeeWeightGrams
): number {
  if (product.weightSelectable) {
    const g = weightGrams ?? 500;
    return WEIGHT_PRICES_CO[g];
  }
  return parsePriceString(product.price);
}

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
    price: "$45.000",
    weight: "500 g",
    badge: "Más vendido",
    imgA: "/Products/ground_front2.png",
    imgB: "/Products/ground_back2.png",
    weightSelectable: true,
  },
  {
    id: 2,
    name: "Café en Grano",
    tagline: "Single origin",
    price: "$45.000",
    weight: "500 g",
    badge: "Premium",
    imgA: "/Products/grain_front2.png",
    imgB: "/Products/grain_lateral2.png",
    weightSelectable: true,
  },
  {
    id: 3,
    name: "Café 5 Lb",
    tagline: "Formato familiar · mismo sabor de siempre",
    price: "$200.000",
    weight: "5 lb",
    badge: "Familiar",
    imgA: "/Products/5lb_front.png",
    imgB: "/Products/5lb_top.png",
  },
];
