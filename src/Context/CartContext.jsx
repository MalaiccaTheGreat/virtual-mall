import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Define the CartItem type
/**
 * @typedef {Object} CartItem
 * @property {string} id - Unique cart item ID
 * @property {string} productId - Original product ID
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} [size]
 * @property {string} [color]
 * @property {string} [image]
 * @property {string} addedAt
 * @property {string} lastUpdated
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cart
 * @property {(item: Omit<CartItem, 'id' | 'quantity' | 'addedAt' | 'lastUpdated'>, quantity?: number) => void} addToCart
 * @property {(id: string) => void} removeFromCart
 * @property {(id: string, quantity: number) => void} updateQuantity
 * @property {() => void} clearCart
 * @property {number} cartTotal
 * @property {number} itemCount
 * @property {Date | null} cartExpiry
 * @property {(savedCart: CartItem[]) => void} restoreCart
 */

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_EXPIRY_DAYS = 7; // Cart expires after 7 days

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cart');
        const expiry = localStorage.getItem('cart_expiry');

        if (saved && expiry) {
          const expiryDate = new Date(expiry);
          if (new Date() < expiryDate) {
            return JSON.parse(saved);
          }
        }
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }
    return [];
  });

  const [cartExpiry, setCartExpiry] = useState<Date | null>(() => {
    if (typeof window !== 'undefined') {
      const expiry = localStorage.getItem('cart_expiry');
      return expiry ? new Date(expiry) : null;
    }
    return null;
  });

  // Update cart expiry date
  const updateCartExpiry = useCallback(() => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CART_EXPIRY_DAYS);
    setCartExpiry(expiryDate);
    localStorage.setItem('cart_expiry', expiryDate.toISOString());
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartExpiry();
    } catch (error) {
      console.error('Failed to persist cart', error);
    }
  }, [cart, updateCartExpiry]);

  // Add item to cart
  const addToCart = useCallback(
    (item, quantity = 1) => {
      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) =>
            cartItem.productId === item.productId &&
            cartItem.size === item.size &&
            cartItem.color === item.color
        );

        if (existingItemIndex >= 0) {
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
            lastUpdated: new Date().toISOString(),
          };
          return updatedCart;
        }

        const now = new Date().toISOString();
        return [
          ...prevCart,
          {
            ...item,
            id: uuidv4(),
            quantity,
            addedAt: now,
            lastUpdated: now,
          },
        ];
      });
    },
    []
  );

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback(
    (id, quantity) => {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(99, quantity),
                lastUpdated: new Date().toISOString(),
              }
            : item
        )
      );
    },
    [removeFromCart]
  );

  // Clear the cart
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_expiry');
  }, []);

  // Restore a saved cart
  const restoreCart = useCallback(
    (savedCart) => {
      setCart(savedCart);
      updateCartExpiry();
    },
    [updateCartExpiry]
  );

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Calculate total item count
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
        cartExpiry,
        restoreCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};