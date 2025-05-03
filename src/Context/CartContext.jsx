import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

const CART_EXPIRY_DAYS = 7;
const GUEST_CART_EXPIRY_DAYS = 1;

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
          localStorage.removeItem('cart');
          localStorage.removeItem('cart_expiry');
        }
      } catch (error) {
        console.error('Failed to parse cart data', error);
      }
    }
    return [];
  });

  const [cartExpiry, setCartExpiry] = useState(() => {
    if (typeof window !== 'undefined') {
      const expiry = localStorage.getItem('cart_expiry');
      return expiry ? new Date(expiry) : null;
    }
    return null;
  });

  const updateCartExpiry = useCallback((isGuest = false) => {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + (isGuest ? GUEST_CART_EXPIRY_DAYS : CART_EXPIRY_DAYS));
    setCartExpiry(expiryDate);
    localStorage.setItem('cart_expiry', expiryDate.toISOString());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
      if (cart.length > 0) {
        const hasGuestItems = cart.some(item => item.isGuestItem);
        updateCartExpiry(hasGuestItems);
      } else {
        localStorage.removeItem('cart_expiry');
        setCartExpiry(null);
      }
    } catch (error) {
      console.error('Failed to persist cart', error);
    }
  }, [cart, updateCartExpiry]);

  const addToCart = useCallback((item, quantity = 1, isGuest = false) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        cartItem => 
          cartItem.productId === item.productId &&
          cartItem.size === item.size &&
          cartItem.color === item.color &&
          cartItem.isGuestItem === isGuest
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
          lastUpdated: now,
          isGuestItem: isGuest
        }
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
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

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_expiry');
    setCartExpiry(null);
  }, []);

  const restoreCart = useCallback((savedCart) => {
    setCart(savedCart);
    const hasGuestItems = savedCart.some(item => item.isGuestItem);
    updateCartExpiry(hasGuestItems);
  }, [updateCartExpiry]);

  const getGuestItems = useCallback(() => 
    cart.filter(item => item.isGuestItem),
    [cart]
  );

  const convertGuestItems = useCallback((userId) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.isGuestItem 
          ? { ...item, isGuestItem: false, userId } 
          : item
      )
    );
  }, []);

  const clearGuestItems = useCallback(() => {
    setCart(prevCart => prevCart.filter(item => !item.isGuestItem));
  }, []);

  const cartTotal = useMemo(() => 
    cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    [cart]
  );

  const itemCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

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
        hasItems,
        getGuestItems,
        convertGuestItems,
        clearGuestItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};