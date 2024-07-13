import React, { createContext, useContext, useState } from 'react';
import Sneaker from '@/types/sneaker';

type CartItem = {
  sneaker: Sneaker;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (sneaker: Sneaker) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (sneaker: Sneaker) => {
    const existingItem = cart.find(item => item.sneaker.id === sneaker.id);

    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.sneaker.id === sneaker.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { sneaker, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

