import { Fragment } from "react";
import { Link } from "react-router-dom";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Button from "react-bootstrap/Button";
import NavbarInicio from "../../layout/NavbarInicio";
import Subtitle from "../../components/Subtitle";
import Banner from "../../components/Banner";

const InicioCampusVirtual = () => {
  return (
    <Fragment>
      <NavbarInicio />
      <Banner
        imgSrc={
          "https://drive.google.com/uc?export=view&id=1FIFef2kkI4UwcFXm6qaGe8zJC7VODfiU"
        }
        title={"Esteban's University Virtual Campus"}
      />
      <Row>
        <Col className="d-flex justify-content-center">
          <Link
            to="/campus-virtual/asignaturas"
            state={{ redirectRoute: "/campus-virtual/asignaturas" }}
          >
            <Button variant="primary" className="my-5 px-5 py-2">
              Ingresar
            </Button>
          </Link>
        </Col>
      </Row>
    </Fragment>
  );
};

export default InicioCampusVirtual;

// banner img src "https://drive.google.com/uc?export=view&id=1FIFef2kkI4UwcFXm6qaGe8zJC7VODfiU"
