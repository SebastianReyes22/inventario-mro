import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import { BrowserRouter } from 'react-router-dom';
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <BrowserRouter basename='inventario-mro'>
        <App />
      </BrowserRouter>
    </UserAuthContextProvider>
  </React.StrictMode>,
);
