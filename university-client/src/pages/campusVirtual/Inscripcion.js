import { Fragment, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import apiHost from "../../utils/apiHost";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Subtitle from "../../components/Subtitle";
import SuscriptionTable from "../../components/SuscriptionTable";

const Inscripcion = () => {
  const [userData, setUserData] = useState({});
  const [careerCourses, setCareerCourses] = useState([]);
  const [reloadContent, setReloadContent] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState("");
  const [subscriptionMessageType, setSubscriptionMessageType] =
    useState("success");
  const pathname = useLocation().pathname;

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
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, [subscriptionInfo]);

  const handleAction = (actionInfo, _) => {
    setSubscriptionInfo(actionInfo);
  };

  let alreadySubscribedIds = [];
  if (userData.courses)
    alreadySubscribedIds = userData.courses.map((course) => {
      return course["id asignatura"];
    });

  const renderSuscriptionTable = careerCourses.length !== 0;

  //TODO sepparate courses by level, like on the career details page
  return (
    <Fragment>
      <NavbarCampusVirtual />
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

      <Row>
        <Col>
          <Subtitle>Primer Nivel</Subtitle>

          {userData.id_carrera && renderSuscriptionTable && (
            <SuscriptionTable
              courses={careerCourses}
              alreadySubscribedIds={alreadySubscribedIds}
              actionHandler={handleAction}
            />
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default Inscripcion;

/*
<SuscriptionTable
              courses={careerCourses}
              alreadySubscribedIds={userData.courses.map((course) => {
                return course["id asignatura"];
              })}
            />
 */
