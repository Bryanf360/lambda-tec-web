import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { BrowserRouter } from 'react-router';
import { LambdaTecApp } from './LambdaTecApp';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1F2A8A',
    },
    secondary: {
      main: '#F7F7F7',
    },
    warning: {
      main: '#d4af37',
    },
    error: {
      main: '#DE1200',
    },
    grey: {
      100: '#f5f5f5',
    },
    text: {
      primary: '#3A3737',
    }
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
    },
    h3: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.1em',
    }
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LambdaTecApp />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
