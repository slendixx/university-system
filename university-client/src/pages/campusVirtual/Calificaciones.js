import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Subtitle from "../../components/Subtitle";

const Calificaciones = () => {
  const [userData, setUserData] = useState("alumno");
  const [courses, setCourses] = useState([]);

  return (
    <Fragment>
      <NavbarCampusVirtual />
    </Fragment>
  );
};

export default Calificaciones;
