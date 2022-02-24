import Col from "react-bootstrap/col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const CareerDashboard = (props) => {
  const renderCareers = (careers) => {
    return careers.map((career) => {
      return (
        <Col
          key={career.id}
          className="d-flex justify-content-center"
          style={{ flexBasis: "33.33%" }}
        >
          <Nav.Link as={Link} to={props.linkTo}>
            <Card
              className="my-3"
              style={{ width: "20rem", minHeight: "20rem" }}
            >
              <Card.Img variant="top" src={career.imagen_sm} />
              <Card.Body>
                <Card.Title>{career.nombre}</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
      );
    });
  };

  return renderCareers(props.careers);
};

export default CareerDashboard;
