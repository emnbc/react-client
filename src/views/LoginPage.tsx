import { FormEvent, useCallback, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { style } from "typestyle";
import { Auth } from "../services/http";
import { LocalStore } from "../utils/local-store";
import { useAuth } from "../components/providers/AuthProvider";

export const LoginPage = () => {
  const auth = useAuth();

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const getUserData = useCallback(() => {
    Auth.me()
      .then((res) => {
        auth.logIn(res.data);
        setLoading(false);
        setLoggedIn(true);
      })
      .catch(() => setLoading(false));
  }, [auth]);

  useEffect(() => {
    const token = LocalStore.getToken();

    if (token && !auth.isLoggedIn) {
      setLoading(true);
      getUserData();
    }
  }, [auth, getUserData]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    Auth.login({ username, password })
      .then((res) => {
        if (res.data && res.data.accessToken) {
          LocalStore.setToken(res.data.accessToken);
          getUserData();
        }
      })
      .catch(() => setLoading(false));
  };

  return isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className={loginStyles}>
      <Form className={`m-auto ${formStyles}`} onSubmit={handleSubmit}>
        {isLoading && (
          <div className={spinnerStyles}>
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            disabled={isLoading}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            disabled={isLoading}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
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
  position: "relative",
  width: "100%",
  maxWidth: "360px",
});

const spinnerStyles = style({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
