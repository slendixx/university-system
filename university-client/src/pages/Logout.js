import { Navigate, useLocation } from "react-router-dom";

const Logout = () => {
  const state = useLocation().state;

  localStorage.removeItem("jwt");
  localStorage.removeItem("userId");

  return <Navigate replace to={state.redirectRoute} />;
};
export default Logout;
