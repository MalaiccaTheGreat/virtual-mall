import React, { createContext, useContext, useState } from 'react';

export const TryOnContext = createContext();

export function TryOnProvider({ children }) {
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [isTryOnVisible, setIsTryOnVisible] = useState(false);

  const openTryOn = (product) => {
    setTryOnProduct(product);
    setIsTryOnVisible(true);
  };

  const closeTryOn = () => setIsTryOnVisible(false);

  return (
    <TryOnContext.Provider value={{ tryOnProduct, isTryOnVisible, openTryOn, closeTryOn }}>
      {children}
    </TryOnContext.Provider>
  );
}

// Custom hook to use the TryOnContext
export function useTryOn() {
  const context = useContext(TryOnContext);
  if (context === undefined) {
    throw new Error('useTryOn must be used within a TryOnProvider');
  }
  return context;
}