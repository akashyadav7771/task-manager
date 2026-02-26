import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { Toaster } from 'react-hot-toast';

import React from "react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <BrowserRouter basename={import.meta.env.VITE_BASE_PATH}>
      <AuthProvider>
        <>
          <App />
          <Toaster position="top-right" />
        </>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
