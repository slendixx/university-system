import { Fragment, useEffect, useState } from "react";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Subtitle from "../components/Subtitle";
import NavbarInicio from "../layout/NavbarInicio";
import CarouselInicio from "../components/CarouselInicio";
import CareerDashboard from "../components/CareerDashboard";
import fetchFromApi from "../utils/fetchFromApi";

const Inicio = (props) => {
  const [topCareers, setTopCareers] = useState([]);
  const [remoteCareers, setRemoteCareers] = useState([]);

  useEffect(() => {
    const getTopCareers = async () => {
      let careers;
      try {
        careers = await fetchFromApi({
          apiResource: "careers?filter=topCareers",
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      }
      //It isn't recommended to update state based on previous state (objects and arrays) directly. gotta do it like this
      setTopCareers((topCareers) => {
        return [...topCareers, ...careers.results];
      });
    };
    const getRemoteCareers = async () => {
      let careers;
      try {
        careers = await fetchFromApi({
          apiResource: "careers?filter=remote",
          method: "GET",
        });
      } catch (error) {
        console.error(error);
      }
      setRemoteCareers((remoteCareers) => {
        return [...remoteCareers, ...careers.results];
      });
    };

    getTopCareers();
    getRemoteCareers();
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

//https://drive.google.com/file/d/1Ft2xjgHf6hM9Gj5BEHD4gg0Ss0l5Ii3U/view?usp=sharing
export default Inicio;
