import React, { createContext, useState } from 'react';

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