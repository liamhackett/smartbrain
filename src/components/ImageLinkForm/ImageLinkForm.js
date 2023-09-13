import React from "react";
import "./ImageLinkForm.css";
import { Button, Form } from "react-bootstrap";

const ImageLinkForm = () => {
    return (
        <div className="form">
            <div className="text-container">
                <h3 className="f3 text">
                    Smart Brain will detect faces in your pictures. Give it a try!
                </h3>
            </div>
            <div className="input-container shadow-2">
                <Form.Control size="lg" type="text" placeholder="Image Link" className="focus"/>
                <Button variant="custom" size="lg">Detect</Button>
            </div> 
        </div>
    );
}

export default ImageLinkForm;