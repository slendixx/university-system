import { useState, Fragment } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Subtitle from "../../components/Subtitle";
import Table from "react-bootstrap/Table";

const GradesForm = (props) => {
  const [modifiedRows, setModifiedRows] = useState([]);

  console.log(modifiedRows);

  const handleGradeChange = (event) => {
    event.preventDefault();
    const inputElement = event.target.elements[0];
    const [userId, activityId] = inputElement.id.split(" ");
    const gradeValue = inputElement.value;
    //TODO check if the row wasn't already modfied yet
    setModifiedRows((oldState) => {
      return [
        ...oldState,
        {
          userId,
          activityId,
          gradeValue,
        },
      ];
    });
  };

  const renderGradesTables = (grades) => {
    return grades.map((course, index) => {
      return (
        <Fragment key={index}>
          <Row>
            <Col>
              <Subtitle>{course.asignatura}</Subtitle>
            </Col>
          </Row>
          {course.actividades.map((activity, index) => {
            return (
              <Fragment key={index}>
                <Row>
                  <Col>
                    <Subtitle classes={"sm"}>{activity.titulo}</Subtitle>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Apellido</th>
                          <th>Nombre</th>
                          <th>Calificacion</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activity.calificaciones.map((grade, index) => {
                          return (
                            <tr key={index}>
                              <td>{grade.apellido}</td>
                              <td>{grade.nombre}</td>
                              <td>
                                <Form onSubmit={handleGradeChange}>
                                  <Form.Group
                                    controlId={`${grade.id_alumno} ${activity.id_actividad}`}
                                  >
                                    <Form.Control
                                      type="number"
                                      defaultValue={grade.calificacion}
                                      min="1"
                                      max={activity.calificacion_maxima}
                                    ></Form.Control>
                                  </Form.Group>
                                </Form>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </Fragment>
            );
          })}
        </Fragment>
      );
    });
  };

  return renderGradesTables(props.grades);
};

export default GradesForm;
