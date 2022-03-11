import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import NavbarCampusVirtual from "../../layout/NavbarCampusVirtual";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ActivityDashboard from "../../components/ActivityDashboard";
import axios from "axios";
import apiHost from "../../utils/apiHost";

const Actividades = () => {
  const { pathname, state } = useLocation();
  const { courseId } = useParams();
  const [activities, setActivities] = useState([]);

  const fetchActivities = () => {
    axios
      .get(
        apiHost +
          `users/${localStorage.getItem(
            "userId"
          )}/courses/${courseId}/activities/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((response) => {
        setActivities((oldState) => {
          return [...oldState, ...response.data.data.results[0].activities];
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(fetchActivities, [courseId]);

  return (
    <Fragment>
      <NavbarCampusVirtual />
      <Row>
        <ActivityDashboard
          activities={activities}
          linkTo={pathname + "/:activityId"}
          userRole={state.userRole}
        />
      </Row>
    </Fragment>
  );
};

export default Actividades;
