import { Fragment, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Subtitle from "../components/Subtitle";
import NavbarInicio from "../layout/NavbarInicio";
import CareerDashboard from "../components/CareerDashboard";
import fetchFromApi from "../utils/fetchFromApi";

const OfertaAcademica = () => {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const getCareers = async () => {
      let careerData;
      try {
        careerData = await fetchFromApi({
          apiResource: "careers",
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      }
      //It isn't recommended to update state based on previous state (objects and arrays) directly. gotta do it like this
      setCareers((careers) => {
        return [...careers, ...careerData.results];
      });
    };

    getCareers();
  }, []);

  return (
    <Fragment>
      <NavbarInicio />
      <Row>
        <Subtitle>Economía y Administración</Subtitle>
      </Row>
      <Row style={{ maxWidth: "1400px" }}>
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
      <Row style={{ maxWidth: "1400px" }}>
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
      <Row style={{ maxWidth: "1400px" }}>
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
      <Row style={{ maxWidth: "1400px" }}>
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
      <Row style={{ maxWidth: "1400px" }}>
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
