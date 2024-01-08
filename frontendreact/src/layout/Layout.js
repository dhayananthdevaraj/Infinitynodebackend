import React from "react";
import AdminNavbar from "../components/adminModule/adminNavbar/AdminNavbar";

import { useSelector } from "react-redux";
function Layout() {
  const userRole = useSelector((state) => state.user.role);

  const adminPaths = [
    "/admin/dashboard",
    "/admin/table",
    "/admin/users",
    "/admin/payments",
    "/admin/menu",
    "/user/orders",
    "/",
  ];
  const userPaths = [
    "/user/thankyou",
    "/user/selecttable",
    "/user/payment",
    "/user/orders",
    "/",
  ];
  const currentPath = window.location.pathname;
  const isAdminPath = adminPaths.some((path) => currentPath.includes(path));
  const isUserPath = userPaths.some((path) => currentPath.includes(path));
  return (
    <>
      {userRole === "admin" && isAdminPath && <AdminNavbar />}
      {userRole === "user" && isUserPath && <AdminNavbar />}
    </>
  );
}

export default Layout;
