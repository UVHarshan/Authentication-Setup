import React from "react";
import { useState, useContext } from "react";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");

  const { getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

//   console.log(email);  
//   const onSubmit = (e) => {
//       e.preventDefault();
//       const user = {
//           email,
//           pass,
//           passVerify
//       }
//       console.log(user);
//   }

async function login(e) {
    e.preventDefault();

    try { 
        const loginData = {
            email, pass
        };
        console.log(loginData);

        await axios.post("http://localhost:5005/auth/login", loginData);

        await getLoggedIn();
        history.push("/");
        
    } catch (err) {
        console.log(err);        
    }
}



  return (
    <div>
      <h1> Login to your Account </h1>
      <form onSubmit={login}> 
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setpass(e.target.value)}
          value={pass}
        />
        <button type="submit"> login</button>
      </form>
    </div>
  );
}
