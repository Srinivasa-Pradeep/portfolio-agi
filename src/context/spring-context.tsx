'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type SpringContextType = {
  isSpringMode: boolean;
  toggleSpringMode: () => void;
};

const SpringContext = createContext<SpringContextType | undefined>(undefined);

export function SpringProvider({ children }: { children: React.ReactNode }) {
  const [isSpringMode, setIsSpringMode] = useState(false);

  useEffect(() => {
    if (isSpringMode) {
      document.documentElement.classList.add('spring');
    } else {
      document.documentElement.classList.remove('spring');
    }
  }, [isSpringMode]);

  const toggleSpringMode = () => setIsSpringMode(prev => !prev);

  return (
    <SpringContext.Provider value={{ isSpringMode, toggleSpringMode }}>
      {children}
    </SpringContext.Provider>
  );
}

export function useSpring() {
  const context = useContext(SpringContext);
  if (context === undefined) {
    throw new Error('useSpring must be used within a SpringProvider');
  }
  return context;
}