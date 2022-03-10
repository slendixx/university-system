import Accordion from "react-bootstrap/Accordion";
import groupBy from "../utils/groupBy";
import Table from "react-bootstrap/Table";

const NIVELES = [
  "Primer Nivel",
  "Segundo Nivel",
  "Tercer Nivel",
  "Cuarto Nivel",
  "Quinto Nivel",
  "Sexto Nivel",
];

const CoursesAccordion = (props) => {
  const renderCoursesTableRows = (courses) => {
    return courses.map((course, index) => {
      if (course["distribución anual"] === "anual") {
        return (
          <tr key={index}>
            <td>{course.asignatura}</td>
            <td colSpan={2}></td>
          </tr>
        );
      }

      if (course["distribución anual"] === "1er cuat") {
        return (
          <tr key={index}>
            <td></td>
            <td>{course.asignatura}</td>
            <td></td>
          </tr>
        );
      }
      if (course["distribución anual"] === "2do cuat") {
        return (
          <tr key={index}>
            <td colSpan={2}></td>

            <td>{course.asignatura}</td>
          </tr>
        );
      }
    });
  };

  const renderAccordion = (coursesByLevel) => {
    const coursesByLevelCopy = [...coursesByLevel];

    return coursesByLevelCopy.map((courses, index) => {
      return (
        <Accordion.Item eventKey={"" + index} key={index}>
          <Accordion.Header>{NIVELES[index]}</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Anual</th>
                  <th>Primer Cuatrimestre</th>
                  <th>Segundo Cuatrimestre</th>
                </tr>
                {renderCoursesTableRows(courses)}
              </thead>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      );
    });
  };

  if (!props.courses || props.courses.length === 0) return "";

  const coursesByLevel = groupBy(props.courses, "nivel");

  return (
    <Accordion defaultActiveKey="0">
      {renderAccordion(coursesByLevel)}
    </Accordion>
  );
};

export default CoursesAccordion;
