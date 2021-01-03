import logo from '../assets/images/logo.svg';
import '../styles/App.css';
import Topbar from "./Topbar";
import React, {useState} from "react";
import Main from "./Main";

function App() {
    // how to use
    // -count (declare a state)
    // -setCount -fn -> change state
    // -default value for state

    // const[0] is the state
    // const[1] is the function to modify the state
    // use state will return an array  [0, func]
    // 返回constant, setCount(count+1)
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const logout = () => {
        console.log("logout");
        setIsLoggedIn(false);
    }

    return (
        <div className="App">
            <Topbar isLoggedIn={isLoggedIn} handleLogout ={logout} />
            <Main />
        </div>
    );
}

export default App;
