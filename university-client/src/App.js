import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import OfertaAcademica from "./pages/OfertaAcademica";
import DetallesCarrera from "./pages/DetallesCarrera";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import CheckLogin from "./auth/CheckLogin";
import InicioCampusVirtual from "./pages/campusVirtual/InicioCampusVirtual";
import Asignaturas from "./pages/campusVirtual/Asignaturas";
import Actividades from "./pages/campusVirtual/Actividades";
import DetallesActividad from "./pages/campusVirtual/DetallesActividad";
import Inscripcion from "./pages/campusVirtual/Inscripcion";
import Calificaciones from "./pages/campusVirtual/Calificaciones";

function App() {
  return (
    <Routes>
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/oferta-academica" element={<OfertaAcademica />} />
      <Route
        path="/oferta-academica/detalles-carrera"
        element={<Navigate replace to="/oferta-academica" />}
      />
      <Route
        path="/oferta-academica/detalles-carrera/:idCarrera"
        element={<DetallesCarrera />}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/campus-virtual" element={<InicioCampusVirtual />} />
      <Route path="/contacto" />

      <Route
        path="/campus-virtual/asignaturas"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Asignaturas />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/asignaturas/:courseId/actividades"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Actividades />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/asignaturas/:courseId/actividades/:activityId"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <DetallesActividad />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/autogestion"
        element={<Navigate replace to="/campus-virtual/asignaturas" />}
      />
      <Route
        path="/campus-virtual/autogestion/inscripcion"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Inscripcion />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/autogestion/calificaciones"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Calificaciones />
          </CheckLogin>
        }
      />
      <Route path="/*" element={<Navigate replace to="/inicio" />} />
    </Routes>
  );
}

export default App;
