import React, { Component } from "react";
import { Button, Container, Card, Row, Form } from "react-bootstrap";
import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
    }
  }
  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignIn = () => {
    fetch("http://localhost:3001/signin", {
      method: "post",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    }).then(response => response.json())
      .then(user => {
        if (user.id){
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
        
      })
    
  }
  render() {
    const { onRouteChange } = this.props;
    return (
      <Container className="my-5">
        <Card className="sign-in-body container shadow-2">
          <Row className="g-0 d-flex align-items-center">
            <Card.Body>
              <h1>Welcome to SmartBrain!</h1>
              <Form.Group className="mb-4">
                <Form.Control onChange={this.onEmailChange} className="focus" type="email" placeholder="Email Address" />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control onChange={this.onPasswordChange} className="focus" type="password" placeholder="Password" />
              </Form.Group>

              <Button onClick={this.onSubmitSignIn} variant="custom" className="custom-btn mb-4 w-100">Sign in</Button>
              <p className="sign-in-text">Don"t have an account? <span onClick={() => onRouteChange("register")} className="link">Sign Up</span></p>
            </Card.Body>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default Signin;
