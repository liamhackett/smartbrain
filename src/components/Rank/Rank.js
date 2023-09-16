import React from "react";
import "./Rank.css";

const Rank = ({ name, entries }) => {
    return (
        <div className="f3">
            <h2 className="rank"> {name}'s' current entry count:<br/> {entries} </h2>
            
        </div>
    );
}

export default Rank;