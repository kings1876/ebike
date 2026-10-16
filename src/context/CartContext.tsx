import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, ProductVariant } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  cryptoDiscount: number;
  discountedTotal: number;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ebikes_cart');
      // Carts saved before variants existed have no lineId
      return saved ? (JSON.parse(saved) as CartItem[]).map(i => ({ ...i, lineId: i.lineId ?? i.product.id })) : [];
    } catch {
      return [];
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ebikes_cart', JSON.stringify(cart));
    } catch {
      // localStorage may fail in restricted sandboxes
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const lineId = variant ? product.id + ':' + variant.id : product.id;
    setCart((prev) => {
      const existing = prev.find((item) => item.lineId === lineId);
      if (existing) {
        return prev.map((item) =>
          item.lineId === lineId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      const line: CartItem = variant
        ? {
            lineId,
            variantId: variant.id,
            variantTitle: variant.title,
            product: {
              ...product,
              price: variant.price,
              originalPrice: variant.compareAtPrice,
              imageUrl: variant.image ?? product.imageUrl,
              // keep the stored cart small: the full variant list is not needed once chosen
              options: undefined,
              variants: undefined,
            },
            quantity,
          }
        : { lineId, product, quantity };
      return [...prev, line];
    });
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (lineId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(lineId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.lineId === lineId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (lineId: string) => {
    setCart((prev) => prev.filter((item) => item.lineId !== lineId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const cryptoDiscount = Math.round(subtotal * 0.1);
  const discountedTotal = subtotal - cryptoDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalCount,
        subtotal,
        cryptoDiscount,
        discountedTotal,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false)
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
