import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const [activityId, setActivityId] = useState(null);
  const [title, setTitle] = useState("");
  const [paragraphs, setParagraphs] = useState([]);
  const [hasGrade, setHasGrade] = useState(false);
  const [maxGrade, setMaxGrade] = useState(null);
  const [hasLimitDate, setHasLimitDate] = useState(false);
  const [limitDate, setLimitDate] = useState("");
  const [inputData, setInputData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { state } = useLocation();
  const { courseId } = useParams();

  const getDescriptionParagraphs = (descriptionRaw) => {
    return descriptionRaw.split("{br}");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    //TODO gotta do some validations on the activity creation/updating form
    const input = {
      title,
      paragraphs,
      maxGrade: hasGrade ? maxGrade : null,
      limitDate: hasLimitDate ? limitDate : null,
    };
    setInputData((oldState) => {
      return { ...oldState, ...input };
    });
    setFormSubmitted(true);
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
  const handleAddParagraph = () => {
    setParagraphs((oldState) => {
      return [...oldState, ""];
    });
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
  const handleHasGradeChange = (event) => {
    setHasGrade(event.target.checked);
    setMaxGrade(10);
  };
  const handleMaxGradeChange = (event) => {
    setMaxGrade(event.target.value);
  };
  const handleHasLimitDateChange = (event) => {
    setHasLimitDate(event.target.checked);
  };
  const handleLimitDateChange = (event) => {
    setLimitDate(event.target.value);
  };

  useEffect(() => {
    if (!formSubmitted) return;
    if (activityId === null)
      axios
        .post(apiHost + `courses/${courseId}/activities`, inputData, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error.response);
        });
    if (activityId !== null)
      axios.patch(
        apiHost + `courses/${courseId}/activities/${activityId}`,
        inputData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
  }, [formSubmitted, courseId, inputData, activityId]);

  if (state.activity) {
    if (activityId === null) setActivityId(state.activity.id_actividad);
    if (title === "") setTitle(state.activity.titulo); //these checks prevent too many updates which causess the app to crash
    const descriptionParagraphs = getDescriptionParagraphs(
      state.activity.contenido
    );
    if (paragraphs.length === 0)
      setParagraphs((oldState) => {
        return [...oldState, ...descriptionParagraphs];
      });
    if (maxGrade === null && state.activity.calificacion_maxima !== null) {
      setHasGrade(true);
      setMaxGrade(state.activity.calificacion_maxima);
    }
    if (limitDate === "" && state.activity.fecha_limite !== null) {
      setHasLimitDate(true);
      //the datetime-local input has to be a 16 character long string
      setLimitDate(state.activity.fecha_limite.slice(0, 16));
    }
  }
  if (inputData !== null) console.log(inputData);

  return (
    <Fragment>
      <NavbarCampusVirtual />
      <Row className="my-3">
        <Col className="d-flex align-items-center flex-column">
          <Form className={styles.form} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="titulo" type="text">
              <Form.Label>Titulo de la actividad</Form.Label>
              <Form.Control value={title} onChange={handleTitleChange} />
            </Form.Group>
            {renderFormParagraphs(paragraphs)}
            <Form.Group className="mb-3 d-flex justify-content-center">
              <Button
                variant="secondary"
                className="d-flex flex-row align-items-center"
                onClick={handleAddParagraph}
              >
                <Add width="2rem" />
                <p style={{ margin: 0 }}>Agregar Parrafo</p>
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="hasGrade">
              <Form.Check
                type="checkbox"
                label="Tiene calificación"
                onChange={handleHasGradeChange}
                checked={hasGrade}
              />
            </Form.Group>
            {hasGrade && (
              <Form.Group className="mb-3" controlId="maxGrade">
                <Form.Label>Calificación máxima</Form.Label>
                <Form.Control
                  value={maxGrade}
                  onChange={handleMaxGradeChange}
                  type="number"
                  min="1"
                  max="10"
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="hasLimitDate">
              <Form.Check
                type="checkbox"
                label="Tiene fecha límite"
                onChange={handleHasLimitDateChange}
                checked={hasLimitDate}
              />
            </Form.Group>
            {hasLimitDate && (
              <Form.Group className="mb-3" controlId="limitDate">
                <Form.Label>Fecha Límite</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={limitDate}
                  onChange={handleLimitDateChange}
                />
              </Form.Group>
            )}
            <Button className="mt-3" type="submit">
              Crear Actividad
            </Button>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CrearModificarActividades;
