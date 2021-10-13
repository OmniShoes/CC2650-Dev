import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import App from './App';

// https://material.io/resources/color/#!/?view.left=0&view.right=1&primary.color=595974&secondary.color=597459&primary.text.color=ffefca&secondary.text.color=f4fbf3
const theme = createTheme({
  palette: {
    primary: {
      light: '#8686a3',
      main: '#595974',
      dark: '#2f3048',
      contrastText: '#ffefca',
    },
    secondary: {
      light: '#86a386',
      main: '#597459',
      dark: '#2f4830',
      contrastText: '#f4fbf3',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>CC2650-Dev</title>
      </Helmet>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
