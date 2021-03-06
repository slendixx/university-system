import { Fragment } from "react";
import Subtitle from "./Subtitle";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterResponsive from "../layout/CenterResponsive";
import Alert from "react-bootstrap/Alert";

const GradeDashboard = (props) => {
  const renderGradeTables = (gradesByCourse) => {
    return gradesByCourse.map((courseGrades, index) => {
      return (
        <Fragment key={index}>
          <Row>
            <Col>
              <Subtitle>{courseGrades[0].asignatura}</Subtitle>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <CenterResponsive>
                <Table>
                  <thead>
                    <tr>
                      <th>Actividad</th>
                      <th>Calificacion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseGrades.map((grade, index) => {
                      return (
                        <tr key={index}>
                          <td>{grade.titulo}</td>
                          <td>
                            {grade.calificacion}/{grade.calificacion_maxima}
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
    });
  };
  return props.grades.length !== 0 ? (
    renderGradeTables(props.grades)
  ) : (
    <Row className="my-5">
      <Col className="d-flex justify-content-center">
        <Alert variant="info">Aun no tienes calificaciones registradas.</Alert>
      </Col>
    </Row>
  );
};

export default GradeDashboard;
