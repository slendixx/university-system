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
import GradesForm from "./GradesForm";

const Calificaciones = () => {
  const [userRole, setUserRole] = useState("alumno");
  const [grades, setGrades] = useState([]);
  const fetchUserRole = () => {
    axios
      .get(apiHost + `users/${localStorage.getItem("userId")}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((response) => {
        setUserRole(response.data.data.results[0].role);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const fetchGrades = () => {
    if (userRole === "alumno")
      axios
        .get(
          apiHost +
            `users/${localStorage.getItem("userId")}/courses?grades=true`
        )
        .then((response) => {
          const userData = response.data.data.results[0];
          // setUserRole(userData.role);
          const gradesByCourse = groupBy(userData.courses, "id_asignatura");
          setGrades((oldState) => {
            return [...oldState, ...gradesByCourse];
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
    if (userRole === "docente")
      axios
        .get(
          apiHost + `users/${localStorage.getItem("userId")}/courses/grades`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        )
        .then((response) => {
          const gradeData = response.data.data.results;
          setGrades((oldState) => {
            return [...oldState, ...gradeData];
          });
        })
        .catch((error) => {
          console.log(error.response);
        });
  };
  useEffect(fetchUserRole, []);
  useEffect(fetchGrades, [userRole]);
  return (
    <Fragment>
      <NavbarCampusVirtual />
      {userRole === "alumno" && <GradeDashboard grades={grades} />}
      {userRole === "docente" && <GradesForm grades={grades} />}
    </Fragment>
  );
};

export default Calificaciones;
