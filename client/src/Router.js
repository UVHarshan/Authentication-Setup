import React, { useContext }  from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Register from './auth/Register';
import Login from './auth/Login';
import AuthContext from './context/AuthContext';
import Customers from './components/customers/Cstomers';

export default function Router() {

    const {loggedIn} = useContext(AuthContext);


    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path="/" > <div> Home </div></Route>

                {/* Conditional Rendering */}
                {/* If the user has not logged in */}
                {loggedIn === false && (
                    <>
                       <Route path="/register" > <Register/></Route>
                       <Route path="/login" > <Login/> </Route>
                    </>
                )} 


                {/* If user has logged in , he can only see the Customer component */}
                {loggedIn === true && (
                    <>
                         <Route path="/customer" > <Customers /> </Route>
                    </>
                )}


             
           
            </Switch>
        </BrowserRouter>
    )
}
