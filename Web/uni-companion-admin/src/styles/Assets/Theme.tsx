"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    typography: {
        fontFamily: 'Assistant',
        h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        h2: {
        fontSize: '2rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.2,
        },
        body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        },
        body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
        },
        button: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        textTransform: 'none',
        },
    },
  palette: {
    primary: {
      main: 'rgb(25, 37, 103)',
      contrastText: 'rgb(179, 185, 218)',
    },
    secondary: {
      main: 'rgb(51, 71, 176)',
      contrastText: 'rgb(149, 158, 207)',
    },
    error: {
      main: 'rgb(186, 26, 26)',
      contrastText: 'rgb(255, 255, 255)',
    },
    background: {
      default: 'rgb(244, 246, 255)',
      paper: 'rgb(255, 255, 255)',
    },
    text: {
      primary: 'rgb(25, 37, 103)',
      secondary: 'rgb(51, 71, 176)',
    },
  },
});
