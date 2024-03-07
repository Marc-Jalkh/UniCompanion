import {DefaultTheme, configureFonts} from 'react-native-paper';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Assistant',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'assistant-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'assistant-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'assistant-thin',
      fontWeight: 'normal',
    },
  },
};

export const lightTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  // fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(25, 37, 103)',
    onPrimary: 'rgb(179, 185, 218)',
    secondary: 'rgb(51, 71, 176)',
    onSecondary: 'rgb(149, 158, 207)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    // errorContainer: 'rgb(255, 218, 214)',
    // onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(244, 246, 255)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(25, 37, 103)',
    surfaceVariant: 'rgb(255, 255, 255)',
    onSurfaceVariant: 'rgb(51, 71, 176)',
    outline: 'rgb(25, 37, 103)',
    shadow: 'rgb(0, 0, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)',
    },
    backdrop: 'rgba(51, 47, 55, 0.4)',
  },
};

export const darkTheme = {
  ...DefaultTheme,
  // fonts: configureFonts(fontConfig),
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(25, 37, 103)',
    onPrimary: 'rgb(179, 185, 218)',
    secondary: 'rgb(51, 71, 176)',
    onSecondary: 'rgb(149, 158, 207)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    // errorContainer: 'rgb(255, 218, 214)',
    // onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(244, 246, 255)',
    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(25, 37, 103)',
    surfaceVariant: 'rgb(255, 255, 255)',
    onSurfaceVariant: 'rgb(255, 255, 255)',
    outline: 'rgb(25, 37, 103)',
    shadow: 'rgb(0, 0, 0)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(248, 242, 251)',
      level2: 'rgb(244, 236, 248)',
      level3: 'rgb(240, 231, 246)',
      level4: 'rgb(239, 229, 245)',
      level5: 'rgb(236, 226, 243)',
    },
    backdrop: 'rgba(51, 47, 55, 0.4)',
  },
};
