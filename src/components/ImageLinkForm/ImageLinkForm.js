import React from "react";
import "./ImageLinkForm.css";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
const ImageLinkForm = ({input, onInputChange, onButtonSubmit, onReset }) => {
    return (
        <div className="form">
            <div className="text-container">
                <h3 className="f3 text">
                    Smart Brain will detect faces in your pictures. Give it a try!
                </h3>
            </div>
            <div className="input-container shadow-2">
                <Form.Control 
                    size="lg" 
                    type="text" 
                    placeholder="Image Link" 
                    className="focus" 
                    onChange={ onInputChange }
                    value={input}
                    />
                    <div className="buttons">
                    <Button variant="custom" size="lg" onClick={onReset}>
                        <FontAwesomeIcon icon={faArrowRotateLeft}/>
                    </Button>
                    <Button variant="custom" size="lg" onClick={onButtonSubmit}>Detect</Button>
                    </div>
                
            </div> 
        </div>
    );
}

export default ImageLinkForm;