import exp from 'constants';
import React, { createContext, useState, useContext } from 'react';

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(null);

    return (
        <SessionContext.Provider value={{ session, setSession}}>
            {children}
        </SessionContext.Provider>  
    );
};