import { Fragment, useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import styles from "./login.module.css";
import Form from "react-bootstrap/Form";
import Subtitle from "../components/Subtitle";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import apiHost from "../utils/apiHost";
import axios from "axios";

const Login = (props) => {
  const [loginData, setLoginData] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  const { redirectRoute } = location.state || { redirectRoute: "/inicio" };

  useEffect(() => {
    if (!formSubmitted) return;
    axios
      .post(apiHost + "auth/login", loginData)
      .then((response) => {
        const { token, userId, role } = response.data.data;

        setAuthError(false);
        setRedirect(true);
        localStorage.setItem("jwt", token);
        localStorage.setItem("userId", userId);
      })
      .catch((error) => {
        setRedirect(false);
        if (error.response.status === 400) {
          setAuthError(true);
          return;
        }
        if (error.response.status === 401) {
          setAuthError(true);
          return;
        }
        console.error(error.response.statusText);
      });
  }, [loginData, formSubmitted]);

  const validateInput = (inputData) => {
    if (inputData.email.length === 0)
      throw new Error("Please enter your email");
    if (inputData.password.length === 0)
      throw new Error("Please enter a password");
    setValidationError(false);
    setValidationErrorMessage("");
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const inputData = {
      password: elements.password.value,
      email: elements.email.value,
    };

    try {
      validateInput(inputData);
    } catch (error) {
      setValidationError(true);
      setValidationErrorMessage(error.message);
    }

    setFormSubmitted(true);
    setLoginData((oldState) => {
      return { ...oldState, ...inputData };
    });
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Subtitle>Iniciar Sesión</Subtitle>
        </Col>
      </Row>
      {validationError && formSubmitted && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Alert variant="warning">{validationErrorMessage}</Alert>
          </Col>
        </Row>
      )}
      {!validationError && authError && formSubmitted && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Alert variant="warning">Invalid email or password</Alert>
          </Col>
        </Row>
      )}
      {redirect && <Navigate replace to={redirectRoute} />}
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form className={styles.form} onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirmar
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Login;
