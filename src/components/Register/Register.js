// import React, { Component } from "react";
// import { Button, Container, Card, Row, Form } from "react-bootstrap";
// import "./Register.css";

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       name: ""
//     }
//   }
//   onNameChange = (event) => {
//     this.setState({name: event.target.value});
//   }

//   onEmailChange = (event) => {
//     this.setState({email: event.target.value});
//   }

//   onPasswordChange = (event) => {
//     this.setState({password: event.target.value});
//   }

//   onSubmitRegister = () => {
//     fetch("http://localhost:3001/register", {
//       method: "post",
//       headers: {"Content-type": "application/json"},
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password,
//         name: this.state.name,
//       })
//     }).then(response => response.json())
//       .then(user => {
//         if (user.id){
//           this.props.loadUser(user);
//           this.props.onRouteChange("home");
//         }
        
//       })
    
//   }

//   render() {
//     const { onRouteChange } = this.props;
//     return (
//       <Container className="my-5">
//         <Card className="sign-up-body container shadow-2">
//           <Row className="g-0 d-flex align-items-center">
//             <Card.Body>
//               <h1>Welcome to SmartBrain!</h1>
//               <Form.Group className="mb-4">
//                 <Form.Control onChange={this.onNameChange} className="focus" type="text" placeholder=" Name" id="name" />
//               </Form.Group>
//               <Form.Group className="mb-4">
//                 <Form.Control onChange={this.onEmailChange} className="focus" type="email" placeholder="Email Address" id="email" />
//               </Form.Group>
//               <Form.Group className="mb-4">
//                 <Form.Control onChange={this.onPasswordChange} className="focus" type="password" placeholder="Password" id="password" />
//               </Form.Group>

//               <Button onClick={this.onSubmitRegister} variant="custom" className="custom-btn mb-4 w-100">Sign Up</Button>
//               <p className="sign-up-text">Already have an account? <span onClick={() => onRouteChange("signin")} className="link">Sign In</span></p>
//             </Card.Body>
//           </Row>
//         </Card>
//       </Container>
//     );
//   }
// }

// export default Register;

import React, { Component } from "react";
import { Button, Container, Card, Row, Form } from "react-bootstrap";
import "./Register.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      emailError: "",
      passwordError: ""
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    const email = event.target.value;
    this.setState({ email });
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      this.setState({ emailError: "Invalid email address" });
    } else {
      this.setState({ emailError: "" });
    }
  };

  onPasswordChange = (event) => {
    const password = event.target.value;
    this.setState({ password });

    if (password.length < 6) {
      this.setState({ passwordError: "Password must be at least 6 characters long" });
    } else {
      this.setState({ passwordError: "" });
    }
  };

  onSubmitRegister = () => {
    if (this.state.emailError || this.state.passwordError) {
      return;
    }

    fetch("http://localhost:3001/register", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <Container className="my-5">
        <Card className="sign-up-body container shadow-2">
          <Row className="g-0 d-flex align-items-center">
            <Card.Body>
              <h1>Welcome to SmartBrain!</h1>
              <Form.Group className="mb-4">
                <Form.Control
                  onChange={this.onNameChange}
                  className="focus"
                  type="text"
                  placeholder=" Name"
                  id="name"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  onChange={this.onEmailChange}
                  className="focus"
                  type="email"
                  placeholder="Email Address"
                  id="email"
                />
                <span className="error">{this.state.emailError}</span>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  onChange={this.onPasswordChange}
                  className="focus"
                  type="password"
                  placeholder="Password"
                  id="password"
                />
                <span className="error">{this.state.passwordError}</span>
              </Form.Group>

              <Button
                onClick={this.onSubmitRegister}
                variant="custom"
                className="custom-btn mb-4 w-100"
              >
                Sign Up
              </Button>
              <p className="sign-up-text">
                Already have an account?{" "}
                <span
                  onClick={() => onRouteChange("signin")}
                  className="link"
                >
                  Sign In
                </span>
              </p>
            </Card.Body>
          </Row>
        </Card>
      </Container>
    );
  }
}

export default Register;

