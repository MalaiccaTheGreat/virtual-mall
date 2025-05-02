import React, { createContext, useContext, useState } from 'react';

// Create the TryOnContext
export const TryOnContext = createContext();

// TryOnProvider component
export function TryOnProvider({ children }) {
  const [tryOnProduct, setTryOnProduct] = useState(null);
  const [isTryOnVisible, setIsTryOnVisible] = useState(false);

  // Function to open the try-on modal
  const openTryOn = (product) => {
    setTryOnProduct(product);
    setIsTryOnVisible(true);
  };

  // Function to close the try-on modal
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