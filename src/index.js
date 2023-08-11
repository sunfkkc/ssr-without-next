import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

const dehydratedState = window.__REACT_QUERY_STATE__;

const queryClient = new QueryClient();

hydrateRoot(
  document.getElementById('root'),
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <App />
        </Hydrate>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
