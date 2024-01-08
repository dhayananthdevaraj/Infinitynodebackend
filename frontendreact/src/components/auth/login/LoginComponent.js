import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form"; // Import the necessary components
import loginpng from "../../../assets/login.png";
import logo from "../../../assets/logo.png";
import mailicon from "../../../assets/mailicon.svg";
import passwordicon from "../../../assets/passwordicon.svg";
import "./login.component.css";
import { Link, useNavigate } from "react-router-dom";
import { loginService } from "../../../services/authServices";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { setUserRole } from "../../../toolkit/userSlice";

function LoginComponent() {
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const navigate = useNavigate();

  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const remember = JSON.parse(localStorage.getItem("rememberMe"));
    setRememberMe(remember);
    if (remember) {
      const savedEmail = localStorage.getItem("savedEmail");
      const savedPassword = localStorage.getItem("savedPassword");
      reset({ email: savedEmail, password: savedPassword });
    }
  }, [control]);

  const saveDetails = async (data) => {
    if (validateForm(data)) {
      if (validateForm(data)) {
        try {
          if (rememberMe) {
            localStorage.setItem("savedEmail", data.email);
            localStorage.setItem("savedPassword", data.password);
            localStorage.setItem("rememberMe", rememberMe);
          } else {
            localStorage.removeItem("savedEmail");
            localStorage.removeItem("savedPassword");
          }
          const response = await loginService(data);
          if (response.data) {
            if (response.data.error) {
              addToast(response.data.message, { appearance: "error" });
            } else {
              const currentDate = new Date();
              const dateString = currentDate.toISOString();
              localStorage.setItem("loginDateTime", dateString);
              addToast(response.data.message, { appearance: "success" });
              localStorage.setItem("loginData", JSON.stringify(response.data));
              localStorage.setItem("role", response.data.role);
              localStorage.setItem("customerName", response.data.name);
              localStorage.setItem("customerID", response.data.userData._id);
              localStorage.setItem("message", response.data.message);
              localStorage.setItem("rememberMe", rememberMe);
              setRole(response.data.role);
              dispatch(setUserRole(response.data.role));

              response.data.role === "user"
                ? navigate("/user/table")
                : navigate("/admin/dashboard");
            }
          } else {
            addToast(response.error.response.data.message, {
              appearance: "error",
            });
          }
        } catch (error) {
          addToast("An error occurred while logging in.", {
            appearance: "error",
          });
        }
      }
    }
  };

  const validateForm = (data) => {
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      addToast("Invalid email address", { appearance: "error" });
      return false;
    }

    if (!data.password || data.password.length < 1) {
      addToast("Password is required", { appearance: "error" });
      return false;
    } else if (data.password.length < 8) {
      addToast("Password must be at least 8 characters", {
        appearance: "error",
      });
      return false;
    }

    return true;
  };
  return (
    <div className="container-fluidLC h-100 backgroundCol">
      <div className="card h-100">
        <div className="row h-100">
          <div className="col-md-6 col-lg-7 col-xl-7 d-none d-md-block login-image">
            <img src={loginpng} alt="loginpng" className="w-100" />
          </div>
          <div className="col-md-6 col-lg-5 col-xl-5 login-form-container ps-0">
            <div className="loginPage ps-5">
              <div className="loginform">
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="loginTitle mt-4">
                  <h1 className="mb-1">Login to Your Account</h1>
                  <small>Welcome back! Select method to login</small>
                </div>
                <div className="formLogin">
                  <form onSubmit={handleSubmit(saveDetails)}>
                    <div className="form-group">
                      <label className="d-block">
                        Email
                        <span style={{ color: "red", marginLeft: 2 }}>*</span>
                      </label>

                      <div className="position-relative">
                        <Controller
                          name="email"
                          control={control}
                          rules={{
                            required: "Email is required",
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Invalid email address",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="inputLogin position-relative"
                              type="email"
                              data-testid="emailInput"
                              placeholder="example@gmail.com"
                            />
                          )}
                        />
                        <div className="icon">
                          <img src={mailicon} className="pe-2" alt="mailicon" />
                          <span className="line"></span>
                        </div>
                        {errors.email && (
                          <p className="text-danger" style={{ fontSize: 14 }}>
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="form-group mt-3">
                      <label className="d-block">
                        Password
                        <span style={{ color: "red", marginLeft: 2 }}>*</span>
                      </label>
                      <div className="position-relative">
                        <Controller
                          name="password"
                          control={control}
                          rules={{
                            required: "Password is required",

                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                              message:
                                "Password must be 8 characters or more and include at least one uppercase, one lowercase, one special character, and one number",
                            },
                          }}
                          render={({ field }) => (
                            <input
                              {...field}
                              className="inputLogin"
                              type={isPasswordVisible ? "text" : "password"}
                              placeholder="********"
                              data-testid="passwordInput"
                            />
                          )}
                        />
                        <div className="icon">
                          <img src={passwordicon} className="pe-2" alt="" />
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
                          <p className="text-danger" style={{ fontSize: 14 }}>
                            {errors.password.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="form-group mt-3 d-flex align-items-center justify-content-between">
                      <div className="d-flex">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <span className="d-inline-block ms-2">Remember me</span>
                      </div>
                      <div>
                        <Link to="/changepassword">Forgot Password?</Link>
                      </div>
                    </div>
                    <div className="form-group text-center mt-3">
                      <button type="submit" className="btn submitbtnLogin">
                        Login
                      </button>
                    </div>
                    <div className="form-group text-center mt-4">
                      <small>
                        Don't have an account?{" "}
                        <Link to="/register">Create an account</Link>{" "}
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;

