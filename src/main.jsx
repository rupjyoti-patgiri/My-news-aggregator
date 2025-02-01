// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import React from 'react';
//import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.jsx'

const container = document.getElementById('root');
const root = createRoot(container);

const queryClient = new QueryClient();

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  
);
