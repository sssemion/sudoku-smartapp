import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DeviceThemeProvider, SSRProvider } from '@salutejs/plasma-ui';
import { GlobalStyle } from './style/GlobalStyle';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <DeviceThemeProvider>
        <SSRProvider>
            <App />
            <GlobalStyle />
        </SSRProvider>
    </DeviceThemeProvider>,
  // </React.StrictMode>
);

