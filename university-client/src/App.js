import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import OfertaAcademica from "./pages/OfertaAcademica";
import DetallesCarrera from "./pages/DetallesCarrera";

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
      <Route path="/campus-virtual" />
      <Route
        path="/campus-virtual/detalles-actividad"
        element={<Navigate replace to="/campus-virtual" />}
      />
      <Route path="/campus-virtual/detalles-actividad/:idActividad" />
      <Route path="/autogestion-alumnos" />
      <Route path="/autogestion-docentes" />
      <Route path="/contacto" />
      <Route path="/*" element={<Navigate replace to="/inicio" />} />
    </Routes>
  );
}

export default App;
