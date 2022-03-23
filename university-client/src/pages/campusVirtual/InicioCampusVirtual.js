import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import Col from "react-bootstrap/col";
import Row from "react-bootstrap/row";
import Button from "react-bootstrap/Button";
import NavbarInicio from "../../layout/NavbarInicio";
import Alert from "react-bootstrap/Alert";
import Banner from "../../components/Banner";

const InicioCampusVirtual = () => {
  const signupSucessMessage = useLocation().state?.signupSucessMessage;

  return (
    <Fragment>
      <NavbarInicio />
      <Banner
        imgSrc={
          "https://drive.google.com/uc?export=view&id=1FIFef2kkI4UwcFXm6qaGe8zJC7VODfiU"
        }
        title={"Esteban's University Virtual Campus"}
      />
      {signupSucessMessage !== undefined && (
        <Row className="mt-3">
          <Col className="d-flex justify-content-center">
            <Alert variant="success">{signupSucessMessage}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col className="d-flex justify-content-center">
          <Link
            to="/campus-virtual/asignaturas"
            state={{ redirectRoute: "/campus-virtual/asignaturas" }}
          >
            <Button variant="primary" className="my-3 px-5 py-2">
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
