import { createContext, useContext, useState, useCallback } from "react";
import type { FC, ReactNode } from "react";
import type { CoffeeWeightGrams, Product } from "../types";
import { unitPriceFor } from "../constants";

// ── Types ──────────────────────────────────────────────────────────
export interface CartItem {
  product: Product;
  quantity: number;
  /** Solo café molido/grano: 250 o 500. Ausente en productos de peso fijo (ej. 5 lb). */
  weightGrams?: CoffeeWeightGrams;
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addItem: (product: Product, weightGrams?: CoffeeWeightGrams) => void;
  removeItem: (productId: number, weightGrams?: CoffeeWeightGrams) => void;
  updateQty: (
    productId: number,
    delta: number,
    weightGrams?: CoffeeWeightGrams
  ) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const sameLine = (
  a: CartItem,
  productId: number,
  weightGrams?: CoffeeWeightGrams
) =>
  a.product.id === productId &&
  (a.weightGrams ?? null) === (weightGrams ?? null);

// ── Provider ───────────────────────────────────────────────────────
export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback(
    (product: Product, weightGrams?: CoffeeWeightGrams) => {
      const w = product.weightSelectable ? weightGrams ?? 500 : undefined;
      setItems((prev) => {
        const exists = prev.find((i) => sameLine(i, product.id, w));
        if (exists) {
          return prev.map((i) =>
            sameLine(i, product.id, w)
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, { product, quantity: 1, weightGrams: w }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback(
    (productId: number, weightGrams?: CoffeeWeightGrams) => {
      setItems((prev) =>
        prev.filter((i) => !sameLine(i, productId, weightGrams))
      );
    },
    []
  );

  const updateQty = useCallback(
    (productId: number, delta: number, weightGrams?: CoffeeWeightGrams) => {
      setItems((prev) =>
        prev
          .map((i) =>
            sameLine(i, productId, weightGrams)
              ? { ...i, quantity: i.quantity + delta }
              : i
          )
          .filter((i) => i.quantity > 0)
      );
    },
    []
  );

  const totalCount = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce(
    (acc, i) =>
      acc + unitPriceFor(i.product, i.weightGrams) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        totalPrice,
        addItem,
        removeItem,
        updateQty,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside <CartProvider>");
  return ctx;
};
