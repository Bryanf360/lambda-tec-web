import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { LambdaTecApp } from './LambdaTecApp';

import store from './store';

const theme = createTheme({
  palette: {
    background: {
      default: '#E4E4E4'
    },
    primary: {
      main: '#1F2A8A',
    },
    secondary: {
      main: '#F7F7F7',
    },
    tertiary: {
      main: '#CFA968',
      contrastText: '#FFFFFF',
    },
    quaternary: {
      main: "#3FC353",
      contrastText: 'rgba(79, 79, 79, 0.5)'
    },
    warning: {
      main: '#d4af37',
    },
    error: {
      light: 'rgba(250, 30, 11, 0.2)',
      main: '#DE1200',
      dark: '#FA1E0B',
    },
    grey: {
      50: '#f5f5f5',
      100: '#F1F1F1',
      200: '#F5F0DF',
      300: '#E4E4E4',
      400: '#D1D1D1',
      500: '#ABABAB',
      600: '#A6A6A6',
    },
    white: {
      100: '#FFFFFF',
    },
    black: {
      50: '#2D2D2D',
      100: '#000000'
    },
    green: {
      100: '#276921',
    },
    text: {
      primary: '#3A3737',
      secondary: '#352215',
    }
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '1rem',
      fontWeight: 500,
      letterSpacing: '-0.011em',
    },
    h3: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
    h4: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
      lineHeight: 'auto',
    },
    tableHead: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 0,
      color: '#FFFFFF',
    },
    tableCell: {
      fontSize: '0.75rem',
      color: '#000000',
      fontWeight: 500,
      letterSpacing: 0
    },
    modalTitle: {
      fontSize: '1.25rem',
      color: '#352215',
      letterSpacing: '-0.011em',
      fontWeight: 700,
      opacity: 0.7,
    },
    inputLabel: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.1em',
      color: '#000000',
      opacity: 0.5,
    },
    selectText: {
      color: '#000000',
      letterSpacing: 0,
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    inputFormLabel: {
      opacity: 0.7,
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    searchModalTitle: {
      fontSize: '1.5rem',
      color: '#352215',
      fontWeight: 700,
      letterSpacing: '-0.011em',
      opacity: 0.7,
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LambdaTecApp />
          </LocalizationProvider>
        </Provider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
