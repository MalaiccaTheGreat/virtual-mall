import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

/**
 * @typedef {Object} CartItem
 * @property {string} id - Unique cart item ID
 * @property {string} productId - Original product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Item quantity (1-99)
 * @property {string} [size] - Selected size
 * @property {string} [color] - Selected color
 * @property {string} [image] - Product image URL
 * @property {string} addedAt - ISO timestamp when added
 * @property {string} lastUpdated - ISO timestamp when last updated
 */

/**
 * @typedef {Object} CartContextType
 * @property {CartItem[]} cart - Array of cart items
 * @property {(item: Omit<CartItem, 'id' | 'quantity' | 'addedAt' | 'lastUpdated'>, quantity?: number) => void} addToCart - Add item to cart
 * @property {(id: string) => void} removeFromCart - Remove item from cart
 * @property {(id: string, quantity: number) => void} updateQuantity - Update item quantity
 * @property {() => void} clearCart - Empty the cart
 * @property {number} cartTotal - Total cart value
 * @property {number} itemCount - Total number of items
 * @property {Date | null} cartExpiry - Cart expiration date
 * @property {(savedCart: CartItem[]) => void} restoreCart - Restore saved cart
 * @property {() => boolean} hasItems - Check if cart has items
 */

const CartContext = createContext(/** @type {CartContextType | undefined} */(undefined));

const CART_EXPIRY_DAYS = 7; // Cart expires after 7 days

export function CartProvider({ children }) {
  // Load cart from localStorage or initialize empty
  const [cart, setCart] = useState(/** @type {CartItem[]} */(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('cart');
        const expiry = localStorage.getItem('cart_expiry');
        
        if (saved && expiry) {
          const expiryDate = new Date(expiry);
          if (new Date() < expiryDate) {
            return JSON.parse(saved);
          }
          // Clear expired cart
          localStorage.removeItem('cart');
          localStorage.removeItem('cart_expiry');
        }
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }
    return [];
  }));

  const [cartExpiry, setCartExpiry] = useState(/** @type {Date | null} */(() => {
    if (typeof window !== 'undefined') {
      const expiry = localStorage.getItem('cart_expiry');
      return expiry ? new Date(expiry) : null;
    }
    return null;
  }));

  // Update cart expiry date
  const updateCartExpiry = useCallback(() => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + CART_EXPIRY_DAYS);
    setCartExpiry(expiryDate);
    localStorage.setItem('cart_expiry', expiryDate.toISOString());
  }, []);

  // Persist cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      if (cart.length > 0) {
        updateCartExpiry();
      } else {
        localStorage.removeItem('cart_expiry');
        setCartExpiry(null);
      }
    } catch (error) {
      console.error('Failed to persist cart', error);
    }
  }, [cart, updateCartExpiry]);

  // Add item to cart or update quantity if exists
  const addToCart = useCallback((
    /** @type {Omit<CartItem, 'id' | 'quantity' | 'addedAt' | 'lastUpdated'>} */ item,
    /** @type {number} */ quantity = 1
  ) => {
    setCart((prevCart) => {
      // Check for existing item with same productId, size and color
      const existingItemIndex = prevCart.findIndex(
        cartItem => 
          cartItem.productId === item.productId &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      const now = new Date().toISOString();
      
      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: Math.min(99, updatedCart[existingItemIndex].quantity + quantity),
          lastUpdated: now
        };
        return updatedCart;
      }

      return [
        ...prevCart,
        {
          ...item,
          id: uuidv4(),
          quantity: Math.min(99, quantity),
          addedAt: now,
          lastUpdated: now
        }
      ];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((
    /** @type {string} */ id
  ) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  // Update item quantity (removes if quantity <= 0)
  const updateQuantity = useCallback((
    /** @type {string} */ id,
    /** @type {number} */ quantity
  ) => {
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
              lastUpdated: new Date().toISOString() 
            } 
          : item
      )
    );
  }, [removeFromCart]);

  // Empty the cart completely
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_expiry');
    setCartExpiry(null);
  }, []);

  // Restore cart from saved data
  const restoreCart = useCallback((
    /** @type {CartItem[]} */ savedCart
  ) => {
    setCart(savedCart);
    updateCartExpiry();
  }, [updateCartExpiry]);

  // Calculate cart total
  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cart]
  );

  // Calculate total item count
  const itemCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  // Check if cart has items
  const hasItems = useMemo(() => cart.length > 0, [cart]);

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
        hasItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 * @returns {CartContextType}
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};