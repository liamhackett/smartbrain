import React from "react";
import { Button, Container, Card, Row, Form } from "react-bootstrap";
import "./Register.css";

const Register = ({ onRouteChange }) => {
  return (
    <Container className="my-5 container">
      <Card className="sign-up-body">
        <Row className="g-0 d-flex align-items-center">
          <Card.Body>
            <h1>Welcome to SmartBrain!</h1>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="text" placeholder="First Name" id="firstName" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="text" placeholder="Last Name" id="LastName" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="email" placeholder="Email Address" id="email" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="password" placeholder="Password" id="password" />
            </Form.Group>

            <Button onClick={() => onRouteChange("home")} variant="custom" className="custom-btn mb-4 w-100">Sign Up</Button>
            <p className="sign-up-text">Already have an account? <span onClick={() => onRouteChange("signin")} className="link">Sign In</span></p>
          </Card.Body>
        </Row>
      </Card>
    </Container>
  );
}

export default Register;
