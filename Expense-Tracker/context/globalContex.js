import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUsers } from '../lib/appwrite';

export const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [user , setUser] = useState(null);
    const [loading , setLoading] = useState(true);  
    const [isLogged , setLogged] = useState(false);

    useEffect(() => {
        getUsers().then((res) =>{
            if(res){
                setUser(res);
                setLogged(true);
                
            }else
            {
                setLogged(false);
                setUser(null);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false)})


    } , [])


    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                isLogged,
                setLoading,
                loading,
                setLogged
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;