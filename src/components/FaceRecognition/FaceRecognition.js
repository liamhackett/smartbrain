import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ boxes, imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img className="shadow-2" id="inputImage" alt="" src={imageUrl} />
        {boxes.map((box, index) => (
          <div
            key={index}
            className="bounding-box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
