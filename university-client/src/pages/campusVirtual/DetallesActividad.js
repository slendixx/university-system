import { Fragment } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Description from "../../components/Description";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Subtitle from "../../components/Subtitle";
import Button from "react-bootstrap/esm/Button";

const DetallesActividad = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { activity } = state;
  return (
    <Fragment>
      <NavbarCampusVirtual />
      <Row>
        <Col>
          <Subtitle>{activity.titulo}</Subtitle>
        </Col>
      </Row>
      <Row>
        <Col>
          <Description descriptionRaw={activity.contenido} />
        </Col>
      </Row>
      <Row>
        <Col className="mt-3 mb-4 d-flex justify-content-center">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver a actividades
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default DetallesActividad;
