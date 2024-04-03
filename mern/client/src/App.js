import React from "react";
import { useLocation } from 'react-router-dom';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import AgentManagement from "./components/agents/AgentManagement.jsx";
import TransactionManagement from "./components/transaction/TransactionManagement.jsx"
import Edit from "./components/agents/edit.js";
import Create from "./components/agents/create.js";
import Login from "./components/login";
import Unauthorized from './components/unauthorized'; 
import { useEffect } from 'react';
import { useAuth } from './AuthContext'; 
import AdminHomePage from "./components/AdminHomePage.jsx";
import LoginToast from './components/Toasts';




const App = () => {
 const { isLoggedIn } = useAuth(); 
 const navigate = useNavigate();
 const location = useLocation(); 

//  useEffect(() => {
//  if (!isLoggedIn) {
//     navigate('/login'); 
//  }
// }, [isLoggedIn, navigate]); 

 return (
    
    <div>
      <Navbar />
          <Routes> 
            <Route exact path='/login' element={<Login />}/>
            <Route exact path="/AgentManagement" element={<AgentManagement />} />
            <Route exact path="/TransactionManagement" element={<TransactionManagement/>} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route path="/" element={<AdminHomePage/>}/>
          </Routes>  
    </div>
    
    
 );
};

export default App;
