import { Navigate, useLocation } from "react-router-dom";

const CheckLogin = (props) => {
  const { pathname } = useLocation(); //get pathname where user didn't authenticate properly so we can redirect them there after login
  return localStorage.getItem("jwt") && localStorage.getItem("userId") ? (
    props.children
  ) : (
    <Navigate
      replace
      to={props.redirectRoute}
      state={{ redirectRoute: pathname }}
    />
  );
};

export default CheckLogin;
