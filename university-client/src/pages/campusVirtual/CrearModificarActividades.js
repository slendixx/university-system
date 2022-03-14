import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./crearModificarActividades.module.css";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Subtitle from "../../components/Subtitle";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Add from "../../svg/Add";
import Bin from "../../svg/Bin";

const CrearModificarActividades = (props) => {
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([
    "This is the first paragraph",
    "This is the second paragraph",
  ]);
  const { state } = useLocation();

  const getDescriptionParagraphs = (descriptionRaw) => {
    return descriptionRaw.split("{br}");
  };
  const handleSignup = (event) => {
    event.preventDefault();
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleParagraphChange = (event) => {
    const paragraphId = event.target.id;
    const newParagraphsState = [...paragraphs];
    newParagraphsState[paragraphId] = event.target.value;
    setParagraphs(newParagraphsState);
  };
  const handleDeleteParagraph = (paragraphId) => {
    const newParagraphsState = paragraphs.filter((paragraph, index) => {
      return index !== paragraphId;
    });
    setParagraphs(newParagraphsState);
  };

  const renderFormParagraphs = (paragraphs) => {
    return paragraphs.map((paragraph, index) => {
      return (
        <Form.Group
          className="mb-3 d-flex flex-row align-items-center"
          controlId={index}
          key={index}
        >
          <Form.Control
            as="textarea"
            rows={5}
            value={paragraph}
            onChange={handleParagraphChange}
          />
          <Bin
            width="2rem"
            className={styles.icon}
            clickHandler={handleDeleteParagraph.bind(null, index)}
          />
        </Form.Group>
      );
    });
  };
  if (state.activity) {
    setTitle(state.activity.titulo);
    const descriptionParagraphs = getDescriptionParagraphs(
      state.activity.contenido
    );
    setParagraphs((oldState) => {
      return [...oldState, ...descriptionParagraphs];
    });
  }

  return (
    <Fragment>
      <NavbarCampusVirtual />
      <Row className="my-3">
        <Col className="d-flex align-items-center flex-column">
          <Form className={styles.form} onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="titulo" type="text">
              <Form.Label>Titulo de la actividad</Form.Label>
              <Form.Control value={title} onChange={handleTitleChange} />
            </Form.Group>
            {renderFormParagraphs(paragraphs)}
          </Form>
          <Fragment>
            //TODO use a button for adding paragraphs
            <Add
              width="2rem"
              className={`${styles.icon} ${styles["icon-margin"]}`}
            />
            <p>Agregar Parrafo</p>
          </Fragment>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CrearModificarActividades;
