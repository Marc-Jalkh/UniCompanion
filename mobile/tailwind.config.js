/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [./src/**/*.{js,jsx,ts,tsx}],
  theme: {
      colors: {
        light: {
          primary: '#ff7e67',
          background: '#ffffff',
          secondary: '#6dd5ed',
          'on-secondary': '#000000',
          surface: '#ffffff',
          'on-surface': '#000000',
          'surface-variant': '#f0f0f0',
          'on-surface-variant': '#000000',
          error: '#ff0000',
          success: '#00ff00',
          'on-success': '#ffffff',
          warning: '#ffff00',
          'on-warning': '#000000',
          disabled: '#cccccc',
          'on-disabled': '#666666',
          placeholder: '#999999',
        },
        dark: {
          primary: '#ff6347',
          background: '#000000',
          secondary: '#4a90e2',
          'on-secondary': '#ffffff',
          surface: '#121212',
          'on-surface': '#ffffff',
          'surface-variant': '#1e1e1e',
          'on-surface-variant': '#ffffff',
          error: '#ff0000',
          success: '#00ff00',
          'on-success': '#ffffff',
          warning: '#ffff00',
          'on-warning': '#000000',
          disabled: '#999999',
          'on-disabled': '#999999',
          placeholder: '#cccccc',
        },
      },
    
    extend: {},
  },
  plugins: [],
}

