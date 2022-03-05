import { Fragment, useState, useEffect } from "react";
import styles from "./login.module.css";
import Form from "react-bootstrap/Form";
import Subtitle from "../components/Subtitle";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const Login = (props) => {
  const handleLogin = (event) => {
    event.preventDefault();
    const elements = event.target.elements;
    const inputData = {
      password: elements.password.value,
      email: elements.email.value,
    };

    console.log(inputData);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Subtitle>Iniciar Sesión</Subtitle>
        </Col>
      </Row>
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
