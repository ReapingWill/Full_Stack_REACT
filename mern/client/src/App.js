import React, { useState, useEffect } from "react";
import { useLocation, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from "./components/navbar";
import AgentManagement from "./components/agents/AgentManagement.jsx";
import TransactionManagement from "./components/transaction/TransactionManagement.jsx"
import Edit from "./components/agents/edit.js";
import Create from "./components/agents/create.js";
import Login from "./components/login";
import Unauthorized from './components/unauthorized'; 
import { useAuth } from './AuthContext'; 
import AdminHomePage from "./components/AdminHomePage.jsx";
import axios from "axios";
import { useCookies } from 'react-cookie';



function App() {
 const { isLoggedIn } = useAuth(); 
 const navigate = useNavigate();
 const location = useLocation();
 const [userId, setUserId] = useState('');
 const [cookies] = useCookies(['user']);
 const [userData, setUserData] = useState({
  userId:'',
  email:''
 })

 useEffect(() => {
  const fetchData = async () => {
     try {
       const token = await axios.get(`http://localhost:5000/validate_token?token=${cookies.user}`);
       console.log(token);
       const status = token.data.status
       console.log(status)

       console.log("token.data.data.user", token)
       const userInfo = token.data.data.user

       setUserData({
         userId:userInfo.id,
         email:userInfo.email,
       })

       setUserId(userInfo.id)
       
//console.log(userData)

       if(status === 'ok'){
          //console.log('Token has been validated')
       }else{
        console.log('Not Validated')
        navigate('/')
       }
     } catch (error) {
       console.log(error);
     }
  };
    fetchData();
 }, [navigate, location]);
 

 return (
    
    <div>
      <Navbar 
      userData={userData}
      userId={userId}/>
          <Routes> 
            <Route exact path='/' element={<Login />}/>

            <Route exact path="/AgentManagement" element={<AgentManagement
              userData={userData}
              userId={userId} /> } />

            <Route exact path="/TransactionManagement" element={<TransactionManagement
              userData={userData}
              userId={userId} />} />

            <Route path="/edit/:id" element={<Edit />} />

            <Route path="/create" element={<Create />} />

            <Route path="/unauthorized" element={<Unauthorized/>} />

            <Route path="/AdminHomePage" element={<AdminHomePage
              userData={userData}
              userId={userId} />} />

          </Routes>  
    </div>
 );
};

export default App;
