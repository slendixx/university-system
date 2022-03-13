import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Subtitle from "../../components/Subtitle";
import groupBy from "../../utils/groupBy";
import GradeDashboard from "../../components/GradeDashboard";

const Calificaciones = () => {
  const [userRole, setUserRole] = useState("alumno");
  const [gradesByCourse, setGradesByCourse] = useState([]);
  const fetchUserGrades = () => {
    axios
      .get(
        apiHost + `users/${localStorage.getItem("userId")}/courses?grades=true`
      )
      .then((response) => {
        const userData = response.data.data.results[0];
        setUserRole(userData.role);
        const gradesByCourse = groupBy(userData.courses, "id_asignatura");
        setGradesByCourse((oldState) => {
          return [...oldState, ...gradesByCourse];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(fetchUserGrades, []);
  return (
    <Fragment>
      <NavbarCampusVirtual />
      {userRole === "alumno" && <GradeDashboard grades={gradesByCourse} />}
    </Fragment>
  );
};

export default Calificaciones;
