import React from "react";
import { useLocation } from 'react-router-dom';
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import AgentManagement from "./components/AgentManagement";
import Edit from "./components/edit";
import Create from "./components/create";
import Login from "./components/login";
import Unauthorized from './components/unauthorized'; 
import { useEffect } from 'react';
import { useAuth } from './AuthContext'; 
import AdminHomePage from "./components/AdminHomePage";
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
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
            <Route path="/unauthorized" element={<Unauthorized/>} />
            <Route path="/" element={<AdminHomePage/>}/>
          </Routes>  
    </div>
    
    
 );
};

export default App;
