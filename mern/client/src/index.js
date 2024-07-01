import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import  './index.css';
import {CookiesProvider} from 'react-cookie';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
 <React.StrictMode>
    <CookiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <App />
          <ToastContainer/>
        </BrowserRouter>
      </AuthProvider>
    </CookiesProvider>
 </React.StrictMode>

);

