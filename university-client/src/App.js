import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import OfertaAcademica from "./pages/OfertaAcademica";
import DetallesCarrera from "./pages/DetallesCarrera";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CheckLogin from "./auth/CheckLogin";
import InicioCampusVirtual from "./pages/InicioCampusVirtual";
import Autogestion from "./pages/Autogestion";
import Asignaturas from "./pages/Asignaturas";
import DetallesActividad from "./pages/DetallesActividad";

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

      <Route path="/campus-virtual" element={<InicioCampusVirtual />} />
      <Route path="/contacto" />
      <Route path="/*" element={<Navigate replace to="/inicio" />} />

      <Route
        path="/campus-virtual/autogestion"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Autogestion />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/asignaturas"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <Asignaturas />
          </CheckLogin>
        }
      />
      <Route
        path="/campus-virtual/asignaturas/detalles-actividad"
        element={<Navigate replace to="/campus-virtual/asignaturas" />}
      />
      <Route
        path="/campus-virtual/asignaturas/detalles-actividad/:id"
        element={
          <CheckLogin redirectRoute={"/login"}>
            <DetallesActividad />
          </CheckLogin>
        }
      />
    </Routes>
  );
}

export default App;
