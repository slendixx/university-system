import { Fragment, useEffect, useState } from "react";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Subtitle from "../components/Subtitle";
import NavbarInicio from "../layout/NavbarInicio";
import CarouselInicio from "../components/CarouselInicio";
import CareerDashboard from "../components/CareerDashboard";
import fetchFromApi from "../utils/fetchFromApi";
import axios from "axios";
import apiHost from "../utils/apiHost";

const Inicio = (props) => {
  const [topCareers, setTopCareers] = useState([]);
  const [remoteCareers, setRemoteCareers] = useState([]);

  useEffect(() => {
    axios
      .get(apiHost + "careers?filter=topCareers")
      .then((response) => {
        const careersData = response.data.data.results;
        setTopCareers((oldState) => {
          return [...oldState, ...careersData];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
    axios
      .get(apiHost + "careers?filter=remote")
      .then((response) => {
        const careersData = response.data.data.results;
        setRemoteCareers((oldState) => {
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
      <CarouselInicio />
      <main>
        <Row>
          <Col>
            <Subtitle>Carreras más demandadas</Subtitle>
          </Col>
        </Row>
        <Row>
          <CareerDashboard
            careers={topCareers}
            linkTo="/oferta-academica/detalles-carrera/:idCarrera"
          />
        </Row>
        <Row>
          <Col>
            <Subtitle>Carreras a distancia</Subtitle>
          </Col>
        </Row>
        <Row>
          <CareerDashboard
            careers={remoteCareers}
            linkTo="/oferta-academica/detalles-carrera/:idCarrera"
          />
        </Row>
      </main>
    </Fragment>
  );
};

export default Inicio;
