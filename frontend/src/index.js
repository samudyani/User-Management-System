import React from 'react';
import ReactDOM from 'react-dom/client';  // Import from 'react-dom/client' in React 18
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));  // Create root using createRoot
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
