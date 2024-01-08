import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isUserLoggedIn, getUserRole } from "../commonFunctions/commonFunction";

function ProtectedRoutes({ allowedRoles }) {
  const isLoggedIn = isUserLoggedIn();
  const userRole = getUserRole();

  if (isLoggedIn) {
    if (allowedRoles.includes(userRole)) {
      return <Outlet />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }


}

export default ProtectedRoutes;
