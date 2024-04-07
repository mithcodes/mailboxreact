import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { authSliceActions } from "../store/store";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Login

    if (isLogin) {
      try {
        if (!email || !password) {
          throw new Error("Please fill all the fields for signup");
        }

        let response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCDsKmRy9uKIl5cyHAFUJc5PCGyPCMqTvo",
          {
            method: "POST",
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
          }
        );
        let data = await response.json();
        if (data.error)
          throw new Error("LogIn failed : If not have account please signup ");
        else {
          setError("");
          setEmail("");
          setPassword("");
          dispatch(
            authSliceActions.login({ token: data.idToken, email: data.email })
          );
        }
      } catch (error) {
        setError(error.message);
      }
    }

    // signup
    else {
      if (password === cnfPassword) {
        try {
          if (!email || !password || !cnfPassword) {
            throw new Error("Please fill all the fields for signup");
          }
          let response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCDsKmRy9uKIl5cyHAFUJc5PCGyPCMqTvo",
            {
              method: "POST",
              body: JSON.stringify({
                email,
                password,
                returnSecureToken: true,
              }),
            }
          );
          let data = await response.json();
          if (data.error)
            throw new Error("Signup failed: Email already exists");
          else {
            console.log("User have Successfully SignedUp");
            setError("");
            setEmail("");
            setPassword("");
            setCnfPassword("");
          }
        } catch (error) {
          setError(error.message);
        }
      } else {
        setPasswordError("Passwords do not match");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">
                {isLogin ? "Log In" : "Sign Up"}
              </h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                {!isLogin && (
                  <Form.Group
                    controlId="formBasicConfirmfPassword"
                    className="mt-3"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      value={cnfPassword}
                      onChange={(e) => setCnfPassword(e.target.value)}
                    />
                  </Form.Group>
                )}
                {passwordError && (
                  <p className="text-danger">{passwordError}</p>
                )}
                {error && <p className="text-danger">{error}</p>}

                <Col className="text-right">
                  <Button className={`mt-3`} variant="primary" type="submit">
                    {isLogin ? "Log In" : "Sign Up"}
                  </Button>
                </Col>
              </Form>
              <p
                className="text-left mt-3"
                onClick={() => setIsLogin((pre) => !pre)}
              >
                {isLogin ? (
                  <span>
                    Don't have an account?{" "}
                    <button className="su_toogle">SignUp Here! </button>
                  </span>
                ) : (
                  <span>
                    Already have an account?{" "}
                    <button className="su_toogle">LogIn Here! </button>
                  </span>
                )}
              </p>
              {isLogin && (
                <button className="text-left su_toogle">
                  Forget Password?
                </button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthForm;
