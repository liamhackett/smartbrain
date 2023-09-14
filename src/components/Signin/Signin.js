import React from "react";
import { Button, Container, Card, Row, Form } from "react-bootstrap";
import "./Signin.css";

const Signin = ({ onRouteChange }) => {
  return (
    <Container className="my-5 container">
      <Card className="sign-in-body">
        <Row className="g-0 d-flex align-items-center">
          <Card.Body>
            <h1>Welcome to SmartBrain!</h1>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="email" placeholder="Email Address" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control className="focus" type="password" placeholder="Password" />
            </Form.Group>

            <Button onClick={() => onRouteChange("home")} variant="custom" className="custom-btn mb-4 w-100">Sign in</Button>
            <p className="sign-in-text">Don"t have an account? <span onClick={() => onRouteChange("register")} className="link">Sign Up</span></p>
          </Card.Body>
        </Row>
      </Card>
    </Container>
  );
}

export default Signin;
