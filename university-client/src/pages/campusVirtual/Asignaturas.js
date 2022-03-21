import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import CourseDashboard from "../../components/CourseDashboard";
import Subtitle from "../../components/Subtitle";

const Asignaturas = () => {
  const [userRole, setUserRole] = useState("alumno");
  const [courses, setCourses] = useState([]);
  const [userCareer, setUserCareer] = useState("");

  useEffect(() => {
    axios
      .get(apiHost + `users/${localStorage.getItem("userId")}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        const userData = response.data.data.results[0];
        if (userData.career) setUserCareer(userData.career);
        setUserRole(userData.role);
        setCourses((oldState) => {
          return [...oldState, ...userData.courses];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  return (
    <Fragment>
      <NavbarCampusVirtual />
      <Row>{userCareer !== "" && <Subtitle>{userCareer}</Subtitle>}</Row>
      <Row style={{ maxWidth: "1400px" }}>
        <CourseDashboard
          courses={courses}
          linkTo="/campus-virtual/asignaturas/:courseId/actividades"
          userRole={userRole}
        />
      </Row>
    </Fragment>
  );
};

export default Asignaturas;
