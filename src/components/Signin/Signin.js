import React, { Component } from "react";
import { Button, Container, Card, Row, Form } from "react-bootstrap";
import "./Signin.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      rememberMe: false, 
      invalid: "",
    };
  }

  componentDidMount() {
    // Check if there"s a stored email in localStorage
    const storedEmail = localStorage.getItem("rememberedEmail");

    if (storedEmail) {
      this.setState({ signInEmail: storedEmail, rememberMe: true });
    }
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onRememberMeChange = () => {
    this.setState((prevState) => ({ rememberMe: !prevState.rememberMe }));
  };

  onSubmitSignIn = () => {
    const { signInEmail, rememberMe } = this.state;

    // Store the email in localStorage if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", signInEmail);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    fetch("https://sleepy-brook-78639-a1e6e03111c1.herokuapp.com/signin", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch(() => {
        this.setState({ invalid: "Invalid email or password" });
      });

  };

  render() {
    const { onRouteChange } = this.props;
    const { rememberMe } = this.state;

    return (
      <Container className="my-5">
        <Card className="sign-in-body container shadow-2">
          <Row className="g-0 d-flex align-items-center">
            <Card.Body>
              <h1>Welcome to SmartBrain!</h1>
              <Form.Group className="mb-4">
                <Form.Control
                  onChange={this.onEmailChange}
                  value={this.state.signInEmail}
                  className="focus"
                  type="email"
                  placeholder="Email Address"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  onChange={this.onPasswordChange}
                  className="focus"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Check
                  className="remember-me"
                  type="checkbox"
                  label="Remember Me"
                  checked={rememberMe} 
                  onChange={this.onRememberMeChange}
                />
              </Form.Group>
              <p>{this.state.invalid}</p>
              <Button
                onClick={this.onSubmitSignIn}
                variant="custom"
                className="custom-btn mb-4 w-100"
              >
                Sign in
              </Button>
              <p className="sign-in-text">
                Don"t have an account?{" "}
                <span onClick={() => onRouteChange("register")} className="link">
                  Sign Up
                </span>
              </p>
            </Card.Body>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default Signin;

