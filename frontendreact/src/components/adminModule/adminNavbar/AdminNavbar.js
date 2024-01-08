import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import user from "../../../assets/user.png";
import "./adminNavbar.component.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../../toolkit/userSlice";
function AdminNavbar() {
  const [menuOpen, setmenuOpen] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [role, setrole] = useState("");

  const [loginDateTimeData, setloginDateTimeData] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setToggler(false);
    const storedDateString = localStorage.getItem("loginDateTime");

    if (storedDateString) {
      const storedDate = new Date(storedDateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };

      const formattedDateTime = storedDate.toLocaleString(undefined, options);
      setloginDateTimeData(formattedDateTime);
    }

    setname(localStorage.getItem("customerName"));
    setemail(JSON.parse(localStorage.getItem("loginData"))?.email);
    setrole(localStorage.getItem("role"));
  }, []);

  const handleTogglerClick = () => {
    setToggler((prevToggler) => !prevToggler);
  };

  let openDropdown = () => {
    setmenuOpen(!menuOpen);
  };

  let navigate = useNavigate();
  let logOutUser = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe");
    localStorage.clear();
    dispatch(setUserRole(null));
    if (username && password && rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", rememberMe);
    }
    navigate("/login");
  };
  return (
    <div className="background">
      <div className="container-fluid pt-3">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="logo" />
            </Link>
            {role === "admin" && (
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded={toggler ? "true" : "false"}
                aria-label="Toggle navigation"
                onClick={handleTogglerClick}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            )}
            {role !== "admin" && (
              <form className={`d-flex ${toggler ? "show" : ""}`} role="search">
                <div className="d-flex align-items-center">
                  <div className="" id="navbarSupportedContent">
                    <div className="d-flex jutify-content-flex-end">
                      <button
                        className="btn"
                        type="button"
                        onClick={openDropdown}
                      >
                        <img
                          src={user}
                          alt="user"
                          className="w-100 signupIcon"
                        />
                      </button>
                    </div>

                    <div>
                      {menuOpen && (
                        <div className="box arrow-top">
                          <div className="d-flex align-items-center">
                            <div>
                              <img
                                src={user}
                                alt=""
                                className="w-100 signupIcon"
                              />
                            </div>
                            <div className="ms-3">
                              <h2
                                className="mb-0 fs-14 fw-600"
                                style={{ lineHeight: 1 }}
                              >
                                {name}
                              </h2>
                              <small className="text-secondary">{role}</small>
                              <br />
                              <small>{email}</small>
                            </div>
                          </div>

                          <div className="d-flex flex-column mt-2 justify-content-end">
                            <div>Login date & time :</div>
                            <div>
                              <small className="ms-2 fw-bold">
                                {loginDateTimeData}
                              </small>
                            </div>
                          </div>

                          <div className="text-end mt-4">
                            <button className="logout" onClick={logOutUser}>
                              Logout
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
            {role === "admin" && (
              <div
                className={`collapse navbar-collapse ${toggler ? "show" : ""}`}
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  {role === "admin" && (
                    <>
                      {" "}
                      <li className="nav-item">
                        <NavLink
                          as={Link}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending nav-link"
                              : isActive
                              ? "activeLink nav-link"
                              : "nav-link"
                          }
                          aria-current="page"
                          to="/admin/dashboard"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          as={Link}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending nav-link"
                              : isActive
                              ? "activeLink nav-link"
                              : "nav-link"
                          }
                          to="admin/menu"
                        >
                          Menu
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          as={Link}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending nav-link"
                              : isActive
                              ? "activeLink nav-link"
                              : "nav-link"
                          }
                          to="/admin/table"
                        >
                          Tables
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          as={Link}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending nav-link"
                              : isActive
                              ? "activeLink nav-link"
                              : "nav-link"
                          }
                          to="admin/users"
                        >
                          Users
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          as={Link}
                          className={({ isActive, isPending }) =>
                            isPending
                              ? "pending nav-link"
                              : isActive
                              ? "activeLink nav-link"
                              : "nav-link"
                          }
                          to="admin/payments"
                        >
                          Payments
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
                <form className="d-flex" role="search">
                  <div className="d-flex align-items-center">
                    <div className="" id="navbarSupportedContent">
                      <div className="d-flex jutify-content-flex-end">
                        <button
                          className="btn"
                          type="button"
                          onClick={openDropdown}
                        >
                          <img
                            src={user}
                            alt="user"
                            className="w-100 signupIcon"
                          />
                        </button>
                      </div>

                      <div>
                        {menuOpen && (
                          <div className="box arrow-top">
                            <div className="d-flex align-items-center">
                              <div>
                                <img
                                  src={user}
                                  alt=""
                                  className="w-100 signupIcon"
                                />
                              </div>
                              <div className="ms-3">
                                <h2
                                  className="mb-0 fs-14 fw-600"
                                  style={{ lineHeight: 1 }}
                                >
                                  {name}
                                </h2>
                                <small className="text-secondary">{role}</small>
                                <br />
                                <small>{email}</small>
                              </div>
                            </div>

                            <div className="d-flex flex-column mt-2 justify-content-end">
                              <div>Login date & time :</div>
                              <div>
                                <small className="ms-2 fw-bold">
                                  {loginDateTimeData}
                                </small>
                              </div>
                            </div>

                            <div className="text-end mt-4">
                              <button className="logout" onClick={logOutUser}>
                                Logout
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}

export default AdminNavbar;
