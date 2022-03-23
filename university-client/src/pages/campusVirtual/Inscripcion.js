import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CenterResponsive from "../../layout/CenterResponsive";
import Alert from "react-bootstrap/Alert";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Subtitle from "../../components/Subtitle";
import Description from "../../components/Description";
import SuscriptionTable from "../../components/SuscriptionTable";
import groupBy from "../../utils/groupBy";

const NIVELES = [
  "Primer Nivel",
  "Segundo Nivel",
  "Tercer Nivel",
  "Cuarto Nivel",
  "Quinto Nivel",
  "Sexto Nivel",
];

const Inscripcion = () => {
  const [userData, setUserData] = useState({});
  const [careerCourses, setCareerCourses] = useState([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionMessageType, setSubscriptionMessageType] =
    useState("success");

  const fetchUserData = () => {
    //TODO should add checks to see if localStorage.jwt & localStorage.userId are defined before performing request to api
    axios
      .get(apiHost + `users/${localStorage.getItem("userId")}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        const responseData = response.data.data.results[0];
        setUserData((oldState) => {
          return { ...oldState, ...responseData };
        });
        fetchCareerCourses(responseData.id_carrera);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(fetchUserData, []);

  const fetchCareerCourses = (id_carrera) => {
    //the user is not yet subscribed to a career
    if (!id_carrera) return setCareerCourses([]);

    axios
      .get(apiHost + `careers/${id_carrera}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((response) => {
        setCareerCourses((oldState) => {
          return [...oldState, ...response.data.data.results[0].courses];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(fetchCareerCourses, []);

  useEffect(() => {
    if (subscriptionInfo === null) return;
    if (subscriptionInfo.action === "subscribe") {
      axios
        .post(
          apiHost + `users/${localStorage.getItem("userId")}/courses`,
          { courseId: subscriptionInfo.courseId },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }
        )
        .then((response) => {
          const status = response.data.data.status;
          if (status === "user is already subscribed") {
            setSubscriptionMessageType("info");
            setSubscriptionMessage("Ya estas inscripto a esta asignatura.");
          }
          if (status === "user subscribed to course successfully") {
            setSubscriptionMessageType("success");
            setSubscriptionMessage(
              "Te inscribiste a la asignatura satisfactoriamente."
            );
          }
          fetchUserData();
          fetchCareerCourses(); //this fetch was added in order to prevent an issue where a whole new set of table rows would be added to the tables when the user data was fetched
          //TODO find out if there's a way to avoid the screen flickering on course subscrition/unsubscription
        })
        .catch((error) => {
          console.log(error.response);
        });
    }

    if (subscriptionInfo.action === "unsubscribe") {
      axios
        .delete(
          apiHost +
            `users/${localStorage.getItem("userId")}/courses/${
              subscriptionInfo.courseId
            }`,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          }
        )
        .then((response) => {
          setSubscriptionMessageType("warning");
          setSubscriptionMessage(
            "Te desinscribiste de la asignatura satisfactoriamente."
          );
          fetchUserData();
          fetchCareerCourses();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [subscriptionInfo]);

  const handleAction = (actionInfo, _) => {
    setSubscriptionInfo(actionInfo);
  };

  const renderSuscriptionTable = (coursesByLevel) => {
    return coursesByLevel.map((courses, index) => {
      return (
        <Fragment key={index}>
          <Row>
            <Col>
              <Subtitle>{NIVELES[index]}</Subtitle>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-center">
              <CenterResponsive>
                <SuscriptionTable
                  courses={courses}
                  alreadySubscribedIds={alreadySubscribedIds}
                  actionHandler={handleAction}
                />
              </CenterResponsive>
            </Col>
          </Row>
        </Fragment>
      );
    });
  };

  let alreadySubscribedIds = [];
  if (userData.courses)
    alreadySubscribedIds = userData.courses.map((course) => {
      return course["id asignatura"];
    });

  const coursesAvailableForRender = careerCourses.length !== 0;

  return (
    <Fragment>
      <NavbarCampusVirtual />
      {userData.role !== "alumno" && (
        <Row className="my-5">
          <Col className="d-flex justify-content-center">
            <CenterResponsive>
              <Description descriptionRaw="El sistema de inscripciones es para para uso exclusivo de los alumnos de la institución.{br}" />
            </CenterResponsive>
          </Col>
        </Row>
      )}
      <Row>
        {userData.career !== null && <Subtitle>{userData.career}</Subtitle>}
      </Row>

      {subscriptionMessage !== "" && (
        <Row>
          <Col className="d-flex justify-content-center">
            <Alert variant={subscriptionMessageType}>
              {subscriptionMessage}
            </Alert>
          </Col>
        </Row>
      )}

      {userData.id_carrera &&
        coursesAvailableForRender &&
        renderSuscriptionTable(groupBy(careerCourses, "nivel"))}
    </Fragment>
  );
};

export default Inscripcion;
//TODO add propper width and media queries to the subscription table
/*
<SuscriptionTable
              courses={careerCourses}
              alreadySubscribedIds={userData.courses.map((course) => {
                return course["id asignatura"];
              })}
            />
 */
