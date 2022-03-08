import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import CourseDashboard from "../../components/CourseDashboard";
import Subtitle from "../../components/Subtitle";

const Asignaturas = () => {
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
      <Row>
        <CourseDashboard
          courses={courses}
          linkTo="/campus-virtual/asignaturas/:courseId"
        />
      </Row>
    </Fragment>
  );
};

export default Asignaturas;
