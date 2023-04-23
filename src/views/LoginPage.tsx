import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { style } from "typestyle";
import { Auth } from "../services/http";
import { LocalStore } from "../utils/store";
import { useAuth } from "../components/providers/AuthProvider";

export const LoginPage = () => {
  const auth = useAuth();

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const getUserData = useCallback(() => {
    Auth.me().then((res) => {
      auth.updateLogin(res.data);
      setLoggedIn(true);
    });
  }, [auth]);

  useEffect(() => {
    const token = LocalStore.getToken();

    if (token && !auth.isLoggedIn) {
      getUserData();
    }
  }, [auth, getUserData]);


  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    Auth.login({ username, password }).then((res) => {
      if (res.data && res.data.accessToken) {
        LocalStore.setToken(res.data.accessToken);
        getUserData();
      }
    });
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className={loginStyles}>
      <Form className={`m-auto ${formStyles}`} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
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
};

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
