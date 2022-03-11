import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import ListGroup from "react-bootstrap/ListGroup";
import Bin from "../svg/Bin";
import Pencil from "../svg/Pencil";

const ActivityDashboard = (props) => {
  const formatDate = (isoString) => {
    return isoString.substring(0, 10).replaceAll("-", "/");
  };

  const renderActivities = (activities) => {
    return activities.map((activity, index) => {
      return (
        <Col
          key={index}
          className="d-flex justify-content-center"
          style={{ flexBasis: "33.33%" }}
        >
          <Card
            className="my-3"
            key={index}
            style={{ width: "20rem", minHeight: "10rem" }}
          >
            <Card.Body>
              <Nav.Link
                as={Link}
                to={props.linkTo.replace(":activityId", activity.id_actividad)}
                state={{ activity }}
              >
                <Card.Title className="pb-2">{activity.titulo}</Card.Title>
              </Nav.Link>
              <ListGroup>
                <ListGroup.Item>
                  {`Fecha de publicación: ${formatDate(
                    activity.fecha_publicacion
                  )}`}
                </ListGroup.Item>
                {activity.fecha_limite !== null && (
                  <ListGroup.Item>
                    {`Fecha Límite: ${formatDate(activity.fecha_limite)}`}
                  </ListGroup.Item>
                )}
                {props.userRole === "docente" && (
                  <ListGroup.Item className="d-flex justify-content-between">
                    <Nav.Link>
                      <Pencil width="2rem" />
                    </Nav.Link>
                    <Nav.Link>
                      <Bin width="2rem" />
                    </Nav.Link>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      );
    });
  };

  return renderActivities(props.activities);
};

//TODO implement the teacher option buttons

export default ActivityDashboard;
