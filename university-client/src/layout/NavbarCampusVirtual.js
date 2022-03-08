import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarCampusVirtual = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Esteban's University Virtual Campus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/asignaturas">
              Mis Asignaturas
            </Nav.Link>
            <Nav.Link as={Link} to="/autogestion">
              Autogestion
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              Cerras Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCampusVirtual;
