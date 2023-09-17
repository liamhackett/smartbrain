import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ boxes, imageUrl, isFile, format }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        {isFile ? (
          <img className="shadow-2" id="inputImage" src={`data:${format};base64,${imageUrl}`} alt="" />
        ) : (
          <img className="shadow-2" id="inputImage" src={imageUrl} alt="" />
        )}

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
