import { useState, Fragment, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterResponsive from "../../layout/CenterResponsive";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Subtitle from "../../components/Subtitle";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import apiHost from "../../utils/apiHost";
import axios from "axios";

const GradesForm = (props) => {
  const [formSubmited, setFormSubmited] = useState(false);
  const [modifiedRows, setModifiedRows] = useState([]);
  const [gradesPostedMessage, setGradesPostedMessage] = useState("");
  const [showGradesPosted, setShowGradesPosted] = useState(false);
  const [postedMessageVariant, setPostedMessageVariant] = useState("primary");
  const [gradesUpdatedMessage, setGradesUpdatedMessage] = useState("");
  const [showGradesUpdated, setShowGradesUpdated] = useState(false);
  const [UpdatedMessageVariant, setUpdatedMessageVariant] = useState("primary");

  const checkAlreadyModified = (modifiedRows, newItem) => {
    const found = modifiedRows.find((row) => {
      return (
        row.userId === newItem.userId && row.activityId === newItem.activityId
      );
    });
    if (!found) {
      setModifiedRows((oldState) => {
        return [...oldState, { ...newItem }];
      });
      return;
    }

    const foundIndex = modifiedRows.indexOf(found);
    setModifiedRows((oldState) => {
      const result = [...oldState];
      result[foundIndex].gradeValue = newItem.gradeValue;
      return result;
    });
  };

  const handleGradeChange = (event) => {
    event.preventDefault();
    const inputElement = event.target.elements[0];
    if (inputElement.value === "") return; //TODO Give propper feedback to tell the user the field can't be empty
    //TODO validate grade values
    const gradeValue = Number(inputElement.value);
    const [userId, activityId] = inputElement.id.split(" ");
    const isNewGrade = inputElement.defaultValue === "";

    checkAlreadyModified(modifiedRows, {
      userId,
      activityId,
      gradeValue,
      isNewGrade,
    });
  };

  const filterByNewValues = (modifiedRows) => {
    const result = [];

    result.push(
      modifiedRows.filter((row) => {
        return row.isNewGrade === true;
      })
    );
    result.push(
      modifiedRows.filter((row) => {
        return row.isNewGrade === false;
      })
    );

    return result;
  };

  const handleSubmit = () => {
    setFormSubmited(true);
  };
  const sendInputData = () => {
    if (!formSubmited) return;

    setShowGradesPosted(false);
    setShowGradesUpdated(false);
    const [newValues, updatedValues] = filterByNewValues(modifiedRows);
    if (newValues.length !== 0) {
      axios
        .post(
          apiHost +
            "users/:userId/courses/grades".replace(
              ":userId",
              localStorage.getItem("userId")
            ),
          { newValues },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((response) => {
          setFormSubmited(false);
          setModifiedRows([]);
          setShowGradesPosted(true);
          setGradesPostedMessage(
            "Las calificaciones se guardaron exitosamente"
          );
          setPostedMessageVariant("primary");
        })
        .catch((error) => {
          setFormSubmited(false);
          setShowGradesPosted(true);
          setGradesPostedMessage(
            "Ocurrió un error al intentar guardar las calificaciones"
          );
          setPostedMessageVariant("danger");
          console.log(error.response);
        });
    }
    if (updatedValues.length !== 0) {
      axios
        .patch(
          apiHost +
            "users/:userId/courses/grades".replace(
              ":userId",
              localStorage.getItem("userId")
            ),
          { updatedValues },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((response) => {
          setFormSubmited(false);
          setModifiedRows([]);
          setShowGradesUpdated(true);
          setGradesUpdatedMessage(
            "Las calificaciones se modificaron exitosamente"
          );
          setUpdatedMessageVariant("primary");
        })
        .catch((error) => {
          setFormSubmited(false);
          setShowGradesUpdated(true);
          setGradesUpdatedMessage(
            "Ocurrió un error al intentar modificar las calificaciones"
          );
          setUpdatedMessageVariant("danger");
          console.log(error.response);
        });
    }
  };

  useEffect(sendInputData, [formSubmited, modifiedRows]);

  const renderGradesTables = (grades) => {
    return (
      <Fragment>
        {grades.map((course, index) => {
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
                      <Col className="d-flex justify-content-center">
                        <CenterResponsive>
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
                        </CenterResponsive>
                      </Col>
                    </Row>
                  </Fragment>
                );
              })}
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button className="mt-5 mb-3" onClick={handleSubmit}>
            Guardar Los Cambios
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <CenterResponsive>
            {showGradesPosted && (
              <Alert variant={postedMessageVariant}>
                {gradesPostedMessage}
              </Alert>
            )}
            {showGradesUpdated && (
              <Alert variant={UpdatedMessageVariant}>
                {gradesUpdatedMessage}
              </Alert>
            )}
          </CenterResponsive>
        </Col>
      </Row>
      {renderGradesTables(props.grades)}
    </Fragment>
  );
};

export default GradesForm;
