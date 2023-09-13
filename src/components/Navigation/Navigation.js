import React from "react";
import './Navigation.css';
import 'tachyons';
import Logo from "../Logo/Logo";
const Navigation = () => {
    return (
        <nav className="nav-bar">
            <Logo />
            <h1 className="title">SmartBrain</h1>
            <p className="f3 link dim pa3 pointer sign-out"> Sign Out </p>
        </nav>
    );
}

export default Navigation;