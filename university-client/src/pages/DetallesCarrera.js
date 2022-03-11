import { Fragment, useState, useEffect } from "react";
import fetchFromApi from "../utils/fetchFromApi";
import styles from "./detallesCarrera.module.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarInicio from "../layout/NavbarInicio";
import Banner from "../components/Banner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Subtitle from "../components/Subtitle";
import CoursesAccordion from "../components/CoursesAccordion";
import Description from "../components/Description";

const DetallesCarrera = () => {
  const location = useLocation(); //We use this hook to pass props through React Router's Link element
  const { career } = location.state;
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async (id) => {
      let coursesData;
      try {
        coursesData = await fetchFromApi({
          apiResource: `careers/${id}/courses`,
          method: "GET",
        });
      } catch (error) {
        console.error(error);
        return;
      }

      setCourses((courses) => {
        return [...courses, ...coursesData.results[0].courses];
      });
    };

    getCourses(career.id);
  }, [career]);

  return (
    <Fragment>
      <NavbarInicio />
      <Banner imgSrc={career.imagen_lg} title={career.nombre} />
      <Row>
        <Col className="d-flex justify-content-center">
          <Link
            to="/signup"
            state={{ careerName: career.nombre, careerId: career.id }}
          >
            <Button variant="primary" className="mt-5 px-5 py-2">
              Inscribirse
            </Button>
          </Link>
        </Col>
      </Row>
      {<Description descriptionRaw={career.descripcion} />}
      <Row>
        <Col>
          <Subtitle>Plan de Estudios</Subtitle>
        </Col>
      </Row>
      <Row>
        <Col className={styles.accordionFiller}></Col>
        <Col style={{ flexGrow: "3" }}>
          <CoursesAccordion courses={courses} />
        </Col>
        <Col className={styles.accordionFiller}></Col>
      </Row>
    </Fragment>
  );
};

export default DetallesCarrera;
