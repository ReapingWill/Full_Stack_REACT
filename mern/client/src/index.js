import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import  './index.css';

ReactDOM.render(
 <React.StrictMode>
    <AuthProvider> {}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
 </React.StrictMode>,
 document.getElementById("root")
);
