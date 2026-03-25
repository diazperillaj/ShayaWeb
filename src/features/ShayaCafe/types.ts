// ── Tipos compartidos ──────────────────────────────────────────────

/** Presente en ítems de café molido/grano (250 g o 500 g). */
export type CoffeeWeightGrams = 250 | 500;

export interface Product {
  id: number;
  name: string;
  tagline: string;
  price: string;
  weight: string;
  badge: string;
  imgA: string;
  imgB: string;
  /** Si es true, el cliente elige 250 g o 500 g y el precio viene de `WEIGHT_PRICES_CO`. */
  weightSelectable?: boolean;
}

export interface NavItem {
  label: string;
  id: string;
}
