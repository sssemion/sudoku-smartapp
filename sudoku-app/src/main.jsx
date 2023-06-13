import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { DeviceThemeProvider, SSRProvider } from '@salutejs/plasma-ui';
import { GlobalStyle } from './style/GlobalStyle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
      suspense: true,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <DeviceThemeProvider>
    <SSRProvider>
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <Suspense fallback={<div className="lds-ring"><div></div><div></div><div></div><div></div></div>}>
            <App />
          </Suspense>
        </React.StrictMode>
      </QueryClientProvider>
      <GlobalStyle />
    </SSRProvider>
  </DeviceThemeProvider>
)
