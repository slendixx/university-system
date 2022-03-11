import Table from "react-bootstrap/Table";
import styles from "./suscriptionTable.module.css";

const SuscriptionTable = (props) => {
  const handleClick = (actionInfo, event) => {
    props.actionHandler(actionInfo, event);
  };

  const renderCourses = (courses, alreadySubscribedIds) => {
    return courses.map((course, index) => {
      const actionLink = alreadySubscribedIds.includes(
        course["id asignatura"]
      ) ? (
        <span
          className={styles.actionLink}
          onClick={handleClick.bind(null, {
            courseId: course["id asignatura"],
            action: "unsubscribe",
          })}
        >
          Anular Inscripción
        </span>
      ) : (
        <span
          className={styles.actionLink}
          onClick={handleClick.bind(null, {
            courseId: course["id asignatura"],
            action: "subscribe",
          })}
        >
          Inscribirse
        </span>
      );

      return (
        <tr key={index}>
          <td>{course.asignatura}</td>
          <td>{actionLink}</td>
        </tr>
      );
    });
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Asignatura</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{renderCourses(props.courses, props.alreadySubscribedIds)}</tbody>
    </Table>
  );
};

export default SuscriptionTable;
