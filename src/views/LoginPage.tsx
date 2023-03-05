import React from "react";
import { Button, Form } from "react-bootstrap";
import { style } from "typestyle";

export class LoginPage extends React.Component {
  render() {
    return (
      <div className={loginStyles}>
        <Form className={`m-auto ${formStyles}`}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

const loginStyles = style({
  display: "flex",
  alignItems: "center",
  paddingTop: "40px",
  paddingBottom: "40px",
  backgroundColor: "#f5f5f5",
  height: "100%",
});

const formStyles = style({
  width: "100%",
  maxWidth: "360px",
});
