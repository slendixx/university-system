import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import styles from "./signup.module.css";
import Form from "react-bootstrap/Form";
import Subtitle from "../components/Subtitle";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Signup = (props) => {
  const location = useLocation();
  const { careerName, careerId } = location.state;

  //TODO add useEffect hook with a dependency that is updated on form submit. This use effect should send a POST request to the api with the new user data. Then it should redirect to some login page or display an alert with the respective validation problem

  const handleSignup = (event) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <Subtitle>Inscripción</Subtitle>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-center">
          <Form className={styles.form}>
            <Form.Group className="mb-3">
              <Form.Label>Carrera</Form.Label>
              <Form.Control placeholder={careerName} disabled />
            </Form.Group>
            <Form.Group className="mb-3" type="text">
              <Form.Label>Nombre</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" type="text">
              <Form.Label>Apellido</Form.Label>
              <Form.Control />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control type="password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Dirección de Email</Form.Label>
              <Form.Control type="email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Nacimiento</Form.Label>
              <Form.Select id="genderSelect">
                <option>Masculino</option>
                <option>Femenino</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSignup}>
              Confirmar
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Signup;
