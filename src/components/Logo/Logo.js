import React from "react";
import "./Logo.css";
import brain from "./logo.png";

const Logo = () => {
    return (
        <div className="pa3 logo shadow-2">
            <img src={brain} alt="logo"/>
        </div>
    
    );

}
export default Logo;