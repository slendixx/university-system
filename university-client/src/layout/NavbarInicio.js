import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarInicio = () => {
  //TODO Add an href to the links on the Navbar
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Esteban's University</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/inicio">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/oferta-academica">
              Oferta Académica
            </Nav.Link>
            <Nav.Link as={Link} to="/campus-virtual">
              Campus Virtual
            </Nav.Link>
            <Nav.Link as={Link} to="/autogestion-alumnos">
              Autogestión Alumnos
            </Nav.Link>
            <Nav.Link as={Link} to="/autogestion-docentes">
              Autogestión Docentes
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarInicio;
