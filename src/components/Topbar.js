import React from 'react';
import logo from "../assets/images/logo.svg";
import {LogoutOutlined} from "@ant-design/icons"

function Topbar(props) {
    const {isLoggedIn, handleLogout} = props;

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <span className="App-title">
               Around Web
            </span>
            {
                isLoggedIn ?
                    <LogoutOutlined className="logout"
                    //child to parent data communication, we need to modify isloggedin in app.js
                        onClick = { ()=> {
                            handleLogout();
                        }}
                    />
                    :
                    null
            }
        </header>
    );
}

export default Topbar;
