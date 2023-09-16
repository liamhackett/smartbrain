import React from "react";
import "./HomePage.css";
import Logo from "../Logo/Logo";
import { Button } from "react-bootstrap";

const HomePage = () => {
    return (
        <div className="landing-page">
            <div className="logo-container">
                <Logo /> {/* Place your Logo component here */}
            </div>
            <div className="title-container">
                <h1 className="landing-title">Welcome to SmartBrain</h1>
                <h2>SmartBrain takes images and detects the faces</h2>
                <Button variant="primary">Try Now</Button>
            </div>
        </div>
    );
}

export default HomePage;
