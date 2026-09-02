import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CampusProvider } from './context/CampusContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CampusProvider>
      <App />
    </CampusProvider>
  </React.StrictMode>,
);
