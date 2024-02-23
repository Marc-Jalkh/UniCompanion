import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {useState} from 'react';

const storeTheme = async (mode: string) => {
  try {
    await AsyncStorage.setItem('themeMode', mode);
  } catch (error) {
    console.error('Error storing theme mode:', error);
  }
};

const loadTheme = async () => {
  try {
    const storedMode = await AsyncStorage.getItem('themeMode');
    return storedMode || 'adaptive'; // Use adaptive as default
  } catch (error) {
    console.error('Error loading theme mode:', error);
    return 'adaptive';
  }
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const [themeMode, setThemeMode] = useState(await loadTheme());

const toggleTheme = () => {
  const newMode = themeMode === 'light' ? 'dark' : 'light';
  setThemeMode(newMode);
  storeTheme(newMode);
  // Update the theme provider with the new mode
};
export {themeMode, toggleTheme};
