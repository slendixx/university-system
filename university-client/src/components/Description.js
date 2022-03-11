import styles from "./description.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Subtitle from "./Subtitle";

const Description = (props) => {
  const renderDescription = (descriptionRaw) => {
    const descriptionParts = descriptionRaw.split("{br}");
    return descriptionParts.map((part, index) => {
      if (part.includes("{subtitle}")) {
        return (
          <Row key={index}>
            <Col>
              <Subtitle>{part.replace("{subtitle}", "")}</Subtitle>
            </Col>
          </Row>
        );
      }
      return (
        <Row>
          <Col className={styles.textFiller}></Col>
          <Col className={`d-flex ${styles.text}`} style={{ flexGrow: "3" }}>
            <p>{part}</p>
          </Col>
          <Col className={styles.textFiller}></Col>
        </Row>
      );
    });
  };
  return renderDescription(props.descriptionRaw);
};

export default Description;
