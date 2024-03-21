import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 const updateLoginStatus = (status) => {
    setIsLoggedIn(status);
 };

 return (
    <AuthContext.Provider value={{ isLoggedIn, updateLoginStatus }}>
      {children}
    </AuthContext.Provider>
 );
};

export const useAuth = () => useContext(AuthContext);

