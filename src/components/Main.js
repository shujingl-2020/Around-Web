import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import Login from './Login';
import Register from "./Register";
import Home from "./Home"

function Main(props) {
    const {handleLoggedin, isLoggedIn} = props;

    const showLogin = () => {
        // case 1: already logged in, we will directly get to home
        // case 2: hasn't logged in go to login page
        return isLoggedIn ?
            <Redirect to="/home"/> :
            <Login handleLoggedIn={handleLoggedin} />
    }

    const showHome = () => {
        return isLoggedIn ?
            <Home />
            :
            <Redirect to="/login"/>
    }

    return (
        <div className="main">
           <Switch>
               <Route path="/login" render={showLogin} />
               <Route path="/register" component={Register}/>
               <Route path="/home" render={showHome}/>
           </Switch>
        </div>
    );
}

export default Main;