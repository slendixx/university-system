import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Subtitle from "../components/Subtitle";
import NavbarInicio from "../layout/NavbarInicio";
import CareerDashboard from "../components/CareerDashboard";
import axios from "axios";
import apiHost from "../utils/apiHost";

const OfertaAcademica = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    axios
      .get(apiHost + "careers")
      .then((response) => {
        const careersData = response.data.data.results;
        setCareers((oldState) => {
          return [...oldState, ...careersData];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <Fragment>
      <NavbarInicio />
      <Row>
        <Subtitle>Economía y Administración</Subtitle>
      </Row>
      <Row>
        <CareerDashboard
          careers={careers.filter((career) => {
            return career.facultad === "economía y administración";
          })}
          linkTo="/oferta-academica/detalles-carrera/:idCarrera"
        />
      </Row>
      <Row>
        <Subtitle>Ciencias Jurídicas, Políticas y Sociales</Subtitle>
      </Row>
      <Row>
        <CareerDashboard
          careers={careers.filter((career) => {
            return (
              career.facultad === "ciencias jurídicas, políticas y sociales"
            );
          })}
          linkTo="/oferta-academica/detalles-carrera/:idCarrera"
        />
      </Row>
      <Row>
        <Subtitle>Ciencias de la Salud</Subtitle>
      </Row>
      <Row>
        <CareerDashboard
          careers={careers.filter((career) => {
            return career.facultad === "ciencias de la salud";
          })}
          linkTo="/oferta-academica/detalles-carrera/:idCarrera"
        />
      </Row>
      <Row>
        <Subtitle>Ingeniería</Subtitle>
      </Row>
      <Row>
        <CareerDashboard
          careers={careers.filter((career) => {
            return career.facultad === "ingeniería";
          })}
          linkTo="/oferta-academica/detalles-carrera/:idCarrera"
        />
      </Row>
      <Row>
        <Subtitle>Humanidades</Subtitle>
      </Row>
      <Row>
        <CareerDashboard
          careers={careers.filter((career) => {
            return career.facultad === "humanidades";
          })}
          linkTo="/oferta-academica/detalles-carrera/:idCarrera"
        />
      </Row>
    </Fragment>
  );
};

export default OfertaAcademica;
