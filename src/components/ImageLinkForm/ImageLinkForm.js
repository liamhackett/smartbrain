import React from "react";
import "./ImageLinkForm.css";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

const ImageLinkForm = ({ isFile, input, onInputChange, onButtonSubmit, onReset, toggleInputType, handleFileInputChange }) => {
  return (
    <div className="form">
      <div className="text-container">
        <h3 className="f3 text">
          Smart Brain will detect faces in your pictures. Give it a try!
        </h3>
      </div>
      <div className="input-container shadow-2">
        <div className="switch-container">
          <p>Input</p>
          <Form.Check
            type="switch"
            id="custom-switch"
            variant="custom"
            className="custom-switch"
            onChange={() => {
                onReset();
                toggleInputType(isFile)
              }
            }
          />
        </div>

        {isFile ? (
          <Form.Group controlId="formFileLg" className="form-group">
            <Form.Control
              className="focus file-input"
              type="file"
              size="lg"
              onChange={handleFileInputChange} 
              placeholder="Filename"
            />
          </Form.Group>
        ) : (
          <Form.Control
            size="lg"
            type="text"
            placeholder="Image Link"
            className="focus"
            onChange={onInputChange}
            value={input} 
          />
        )}
        <div className="buttons">
          <Button variant="custom" size="lg" onClick={onReset}>
            <FontAwesomeIcon icon={faArrowRotateLeft} />
          </Button>
          <Button variant="custom" size="lg" onClick={onButtonSubmit}>
            Detect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

