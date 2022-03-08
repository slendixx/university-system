import Col from "react-bootstrap/col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const CareerDashboard = (props) => {
  const renderCareers = (courses) => {
    return courses.map((course) => {
      return (
        <Col
          key={course.id}
          className="d-flex justify-content-center"
          style={{ flexBasis: "33.33%" }}
        >
          <Nav.Link
            as={Link}
            to={props.linkTo.replace(":courseId", course["id asignatura"])}
          >
            <Card
              className="my-5"
              style={{ width: "20rem", minHeight: "5rem" }}
            >
              <Card.Body>
                <Card.Title>{course.asignatura}</Card.Title>
              </Card.Body>
            </Card>
          </Nav.Link>
        </Col>
      );
    });
  };

  return renderCareers(props.courses);
};

export default CareerDashboard;
