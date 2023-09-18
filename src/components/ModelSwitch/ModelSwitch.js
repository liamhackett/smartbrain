import React from "react";
import { Form } from "react-bootstrap";
import "./ModelSwitch.css";

const ModelSwitch = ( { model, celebrity, onReset, toggleCelebrity }) => {
    return (
        <div>
            <div className="model-switch-container">
            <p className="celeb-text">Switch Model</p>
                <Form.Check
                    type="switch"
                    id="switch"
                    variant="custom"
                    className="switch shadow-2"
                    onChange={() => {
                        onReset();
                        toggleCelebrity(celebrity);
                        }
                    }
                    />
                  Model: {model}
            </div>
            {/* <div className="model-label">
            Model: {model}
            </div> */}
        </div>

    );

}

export default ModelSwitch;