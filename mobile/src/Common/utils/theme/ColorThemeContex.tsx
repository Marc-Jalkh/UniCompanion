import React, {createContext, useState, useContext} from 'react';
import {lightColors, darkColors} from './colors'; // Import light and dark color palettes
import {useColorScheme} from 'react-native';

const ColorThemeContext = createContext(
  // Create a context with default values
  {
    isDarkMode: false,
    toggleDarkMode: () => {},
    colors: lightColors,
  },
);

export const ColorThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const currentColors = isDarkMode ? darkColors : lightColors;

  return (
    <ColorThemeContext.Provider
      value={{isDarkMode, toggleDarkMode, colors: currentColors}}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => useContext(ColorThemeContext);
