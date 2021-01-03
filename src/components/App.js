import '../styles/App.css';
import Topbar from "./Topbar";
import React, {useState} from "react";
import Main from "./Main";
import {TOKEN_KEY} from "../constants";

function App() {
    // how to use
    // -count (declare a state)
    // -setCount -fn -> change state
    // -default value for state

    // const[0] is the state
    // const[1] is the function to modify the state
    // use state will return an array  [0, func]
    // 返回constant, setCount(count+1)
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(TOKEN_KEY));

    const logout = () => {
        console.log("logout");
        setIsLoggedIn(false);
        // remove token when log out
        localStorage.removeItem(TOKEN_KEY);
    }

    const login = (token) => {
        console.log('token -> ', token);
        //store token in browser
        localStorage.setItem(TOKEN_KEY, token);
        setIsLoggedIn(true);
    }


    return (
        <div className="App">
            <Topbar isLoggedIn={isLoggedIn} handleLogout ={logout} />
            <Main isLoggedIn={isLoggedIn} handleLoggedin={login}/>
        </div>
    );
}

export default App;
