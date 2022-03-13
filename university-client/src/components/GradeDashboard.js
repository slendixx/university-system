import { Fragment } from "react";
import Subtitle from "./Subtitle";
import Table from "react-bootstrap/Table";
const GradeDashboard = (props) => {
  const renderGradeTables = (gradesByCourse) => {
    return gradesByCourse.map((courseGrades, index) => {
      console.log(courseGrades);
      return (
        <Fragment key={index}>
          <Subtitle>{courseGrades[0].asignatura}</Subtitle>
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
        </Fragment>
      );
    });
  };
  return renderGradeTables(props.grades);
};

export default GradeDashboard;
