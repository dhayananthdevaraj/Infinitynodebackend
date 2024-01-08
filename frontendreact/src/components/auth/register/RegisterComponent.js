import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import fullnameicon from "../../../assets/fullnameicon.svg";
import mailicon from "../../../assets/mailicon.svg";
import passwordicon from "../../../assets/passwordicon.svg";
import register from "../../../assets/register.png";
import { useToasts } from "react-toast-notifications";
import { Link, useNavigate } from "react-router-dom";
import { registerService } from "../../../services/authServices";
import "./register.component.css";
function RegisterComponent() {
  const [registerData, setregisterData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
    role: "user",
  });
  const [isPasswordVisible, setisPasswordVisible] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: "",
  });

  const handleOptionChange = (event) => {
    setregisterData({
      ...registerData,
      role: event.target.value,
    });
  };

  let handleRegister = (e) => {
    setregisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();
  const { addToast } = useToasts();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = () => {
    let valid = true;

    if (!registerData.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Full Name is required",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "",
      }));
    }

    if (
      !registerData.email.trim() ||
      !/\S+@\S+\.\S+/.test(registerData.email)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !registerData.email.trim()
          ? "Email is required"
          : "Invalid email address",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }

    if (!registerData.phoneNo.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNo: "Phone No. is required",
      }));
      valid = false;
    } else if (!/^\d{10}$/.test(registerData.phoneNo.trim())) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNo: "Invalid phone number (10 digits required)",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNo: "",
      }));
    }

    if (!registerData.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      valid = false;
    } else if (!passwordRegex.test(registerData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Password must be 8 characters or more and include at least one uppercase, one lowercase, one special character, and one number",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    return valid;
  };

  let saveDetails = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { data, error } = await registerService(registerData);
      if (data) {
        if (data.error) {
          //error
          addToast(data.message, { appearance: "error" });
        } else {
          //toast
          addToast(data.message, { appearance: "success" });
          localStorage.setItem("email", registerData.email);
          data?.role === "user"
            ? navigate("/user/table")
            : navigate("/admin/dashboard");
        }
      } else if (error) {
        addToast(error.message, { appearance: "error" });
      }
    }
  };
  return (
    <div>
      <div className="container-fluidREG h-100 ">
        <div className="card h-100">
          <div className="row h-100">
            <div
              className="col-md-6 col-lg-7 col-xl-8"
              style={{ paddingRight: 0 }}
            >
              <div className="">
                <div className="registerlogin">
                  <div className="logo" style={{ paddingTop: "10px" }}>
                    <img src={logo} alt="logo" />
                  </div>
                  <div className="registerTitle mt-4 mb-0 ">
                    <p
                      className="mb-1"
                      style={{ fontSize: 32, color: "#236BAE" }}
                    >
                      Create Account
                    </p>
                    <small>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </small>
                  </div>
                  <div className="form pt-4 mb-0">
                    <form>
                      <div className="form-group ">
                        <label className="d-block">
                          Full Name
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </label>
                        <div className="position-relative">
                          <input
                            id="nameField"
                            className="inputRegister"
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={registerData.name}
                            onChange={(e) => {
                              handleRegister(e);
                            }}
                          />
                          <div className="icon">
                            <img
                              src={fullnameicon}
                              className="pe-2"
                              alt="fullnameicon"
                            />
                            <span className="line"></span>
                          </div>
                          {errors.name && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.name}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="d-block">
                          Email
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </label>
                        <div className="position-relative">
                          <input
                            className="inputRegister"
                            type="text"
                            placeholder="example@gmail.com"
                            name="email"
                            value={registerData.email}
                            onChange={(e) => {
                              handleRegister(e);
                            }}
                          />
                          <div className="icon">
                            <img
                              src={mailicon}
                              className="pe-2"
                              alt="mailicon"
                            />
                            <span className="line"></span>
                          </div>
                          {errors.email && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="d-block">
                          Phone No.
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </label>
                        <div className="position-relative">
                          <input
                            className="inputRegister"
                            type="text"
                            placeholder="9654645671"
                            name="phoneNo"
                            value={registerData.phoneNo}
                            onChange={(e) => {
                              handleRegister(e);
                            }}
                          />
                          <div className="icon">
                            <img
                              src={mailicon}
                              className="pe-2"
                              alt="mailicon"
                            />
                            <span className="line"></span>
                          </div>
                          {errors.phoneNo && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.phoneNo}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="d-block">
                          Password
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </label>
                        <div className="position-relative">
                          <input
                            className="inputRegister"
                            placeholder="********"
                            type={isPasswordVisible ? "text" : "password"}
                            name="password"
                            value={registerData.password}
                            onChange={(e) => {
                              handleRegister(e);
                            }}
                          />
                          <div className="icon">
                            <img
                              src={passwordicon}
                              className="pe-2"
                              alt="passwordicon"
                            />

                            <span className="line"></span>
                          </div>
                          <div className="passwordicon">
                            <i
                              onClick={() => {
                                setisPasswordVisible(!isPasswordVisible);
                              }}
                              className={
                                isPasswordVisible
                                  ? "fa fa-eye"
                                  : "fa fa-eye-slash"
                              }
                              aria-hidden="true"
                            ></i>
                          </div>
                          {errors.password && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.password}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="d-block">Role</label>
                        <div>
                          <label>
                            <input
                              type="radio"
                              value="user"
                              checked={registerData.role === "user"}
                              onChange={handleOptionChange}
                            />{" "}
                            User
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="admin"
                              checked={registerData.role === "admin"}
                              onChange={handleOptionChange}
                            />{" "}
                            Admin
                          </label>
                        </div>
                      </div>
                      <div className="form-group text-center mt-3">
                        <button
                          type="submit"
                          className="btn submitbtnRegister"
                          onClick={saveDetails}
                        >
                          Register
                        </button>
                      </div>
                      <div className="form-group text-center mt-4">
                        <small>
                          Already have an account?{" "}
                          <Link to="/login">Sign in</Link>
                        </small>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-5  col-xl-4" style={{ padding: 0 }}>
              <img src={register} className="w-100 h-100" alt="register" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
