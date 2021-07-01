import axios from 'axios';
import React from 'react'
import { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        // Getting a boolean value whether the user is logged in or not
        const loggedInRes = await axios.get("http://localhost:5005/auth/loggedIn");
        setLoggedIn(loggedInRes.data);
    }

    // Executes this function when the components are loaded( Just like a life cycle method)
    useEffect(() => {
        getLoggedIn();
      }, []);

      return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
          {props.children}
        </AuthContext.Provider>
      );
}


export default AuthContext;
export { AuthContextProvider };