import React, { createContext, useContext, useEffect, useState } from 'react';

// 1. Create ThemeContext
const ThemeContext = createContext();

// 2. Create a provider component
export function ThemeProvider({ children }) {
  // Check localStorage for a saved theme, or default to 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  // 3. Use useEffect to save the theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 4. Toggle function to switch themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Custom hook to use ThemeContext in components
export function useTheme() {
  return useContext(ThemeContext);
}
