import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function LogoutBtn() {

    const { getLoggedIn } = useContext(AuthContext);

    const history = useHistory();

    async function logout() {

        await axios.get("http://localhost:5005/auth/logout");
        await getLoggedIn();
        history.push("/");
    }

    return (
        <button onClick={logout}>
            Logout
        </button>
    )
}
