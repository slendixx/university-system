import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

const NavbarCampusVirtual = (props) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Esteban's University Virtual Campus</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/campus-virtual/asignaturas">
              Mis Asignaturas
            </Nav.Link>

            <NavDropdown title="Autogestión" id="autogestion-dropdown">
              <NavDropdown.Item as={Link} to="/campus-virtual/autogestion">
                Inscribirse/Anular Inscripción
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/campus-virtual/autogestion">
                Calificaciones
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/logout">
              Cerrar Sesión
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCampusVirtual;
