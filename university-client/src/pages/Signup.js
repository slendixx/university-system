import { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./signup.module.css";
import Form from "react-bootstrap/Form";
import Subtitle from "../components/Subtitle";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import apiHost from "../utils/apiHost";

const Signup = (props) => {
  const location = useLocation();
  const { careerName, careerId } = location.state;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [validationError, setValidationError] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState("");
  const [signupError, setSignupError] = useState(false);
  const [signupErrorMessage, setSignupErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //initialize a useEffect cleanup function that prevents the warning "can't perform React state update on an unmounted component"
    const abortController = new AbortController();
    //initialize a signal for axios to notify of any async requests in case they need to be aborted
    const signal = abortController.signal;

    if (!formSubmitted) return;
    axios
      .post(apiHost + "auth/signup", newUserData, {
        signal,
      })
      .then((_) => {
        navigate("/campus-virtual", {
          state: { signupSucessMessage: "La cuenta se creó correctamente." },
        });
        setSignupError(false);
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "the specified email is already in use"
        ) {
          setSignupErrorMessage("El Email especificado ya está en uso");
        } else {
          setSignupErrorMessage(
            "Ocurrió un error durante la creación de la cuenta"
          );
        }
        setSignupError(true);
      });

    return () => abortController.abort();
  }, [newUserData, formSubmitted, navigate]);

  const validateInput = (inputData) => {
    if (inputData.firstName.length === 0)
      throw new Error("Please enter your first name");
    if (inputData.lastName.length === 0)
      throw new Error("Please enter your last name");
    if (inputData.password.length === 0)
      throw new Error("Please enter a password");
    if (inputData.password.length < 8 || inputData.password.length > 30)
      throw new Error("Your password must be between 8 and 30 characters long");
    if (inputData.password !== inputData.passwordConfirm)
      throw new Error("Passwords don't match");
    if (inputData.email.length === 0)
      throw new Error("Please enter your email");
    if (inputData.birthDate.length === 0)
      throw new Error("Please enter your birthDate");
    setValidationError(false);
    setValidationErrorMessage("");
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const elements = event.target.elements;

    const inputData = {
      firstName: elements.firstName.value,
      lastName: elements.lastName.value,
      password: elements.password.value,
      passwordConfirm: elements.passwordConfirm.value,
      email: elements.email.value,
      birthDate: elements.birthDate.value,
      gender: elements.gender.value,
      career: careerId,
    };

    try {
      validateInput(inputData);
    } catch (error) {
      setValidationError(true);
      setValidationErrorMessage(error.message);
      return;
    }

    const [birthDay, birthMonth, birthYear] = inputData.birthDate
      .split("-")
      .map((element) => Number(element));

    inputData.birthDay = birthDay;
    inputData.birthMonth = birthMonth;
    inputData.birthYear = birthYear;

    if (inputData.gender === "Masculino") inputData.gender = "m";
    if (inputData.gender === "Femenino") inputData.gender = "f";

    setNewUserData((oldState) => {
      return { ...oldState, ...inputData };
    });
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Subtitle>Inscripción</Subtitle>
        </Col>
      </Row>
      {validationError && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Alert variant="warning">{validationErrorMessage}</Alert>
          </Col>
        </Row>
      )}
      {signupError && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Alert variant="danger">{signupErrorMessage}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form className={styles.form} onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="career">
              <Form.Label>Carrera</Form.Label>
              <Form.Control value={careerName} disabled />
            </Form.Group>
            <Form.Group className="mb-3" type="text" controlId="firstName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" type="text" controlId="lastName">
              <Form.Label>Apellido</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordConfirm">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Dirección de Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="birthDate">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Genero</Form.Label>
              <Form.Select id="gender">
                <option>Masculino</option>
                <option>Femenino</option>
              </Form.Select>
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
export default Signup;
