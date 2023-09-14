import React from "react";
import "./Navigation.css";
import "tachyons";
import Logo from "../Logo/Logo";
const Navigation = ({ onRouteChange, route }) => {
    let hide = "";
    if (route === "signin" || route === "register"){
        hide = "hide";
    }
    else {
        hide = ""
    }
    return (
        <nav className="nav-bar">
            <Logo />
            <h1 className={"title " + hide}>SmartBrain</h1>
            <p onClick={() => onRouteChange("signin")} className={"f3 link dim pa3 pointer sign-out " + hide}> Sign Out </p>
        </nav>
    );
}

export default Navigation;