import React from "react";
import { useState, useContext} from "react";
import axios from 'axios';
import AuthContext from "../context/AuthContext";
import { useHistory } from 'react-router-dom';


export default function Register() {

  // Using 'useState' hook
  const [email, setEmail] = useState("");
  const [pass, setpass] = useState("");
  const [passVerify, setpassVerify] = useState("");

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

// Function to be called when user clicks the 'register' button
async function register(e) {
    e.preventDefault();

    try { 
        const registerData = {
            email, pass, passVerify
        };
        console.log(registerData);

        // sending data to the backend as a JSON object
        await axios.post("http://localhost:5005/auth/", registerData);

        await getLoggedIn();
        history.push("/");
        
    } catch (err) {
        console.log(err);        
    }
}

  return (
    <div>
      <h1> Register a New Account </h1>
      <form onSubmit={register}> 
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
        <input
          type="password"
          placeholder="Verify password"
          onChange={(e) => setpassVerify(e.target.value)}
          value={passVerify}
        />
        <button type="submit"> Register</button>
      </form>
    </div>
  );
}
