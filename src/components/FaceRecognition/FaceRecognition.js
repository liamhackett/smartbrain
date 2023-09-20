import React from "react";
import "./FaceRecognition.css";
import { Spinner } from "react-bootstrap";

const FaceRecognition = ( { boxes, imageUrl, isFile, format, celebrity, celebNames, loading, fileBytes, submit } ) => 
    (
      <div className="center ma">  
        <div className="relative mt2">
          <div className="custom-spinner-container">
          {
            loading && (
              <Spinner className="custom-spinner" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )
          }
          </div>
          {isFile && fileBytes !== "" && submit === true? (
            <img
              className="shadow-2"
              id="inputImage"
              src={`data:${format};base64,${fileBytes}`}
              alt=""
              style={{ visibility: loading ? "hidden" : "" }}
            />
          ) : (
            <img
              className="shadow-2"
              id="inputImage"
              src={imageUrl}
              alt=""
              style={{ visibility: loading ? "hidden" : "" }}
            />
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
            >
              {celebrity && celebNames[index] && (
                <div className="celeb-name">
                  <mark className="highlight">{celebNames[index]}</mark>
                </div>
              )}
          </div>
        ))}
      </div>


      </div>
    );

export default FaceRecognition;