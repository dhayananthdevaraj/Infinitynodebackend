import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import mailicon from "../../../assets/mailicon.svg";
import passwordicon from "../../../assets/passwordicon.svg";
import forgotpasswords from "../../../assets/forgotpasswords.png";
import "./forgotPassword.component.css";
import { Link, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { forgotPasswordService } from "../../../services/authServices";
function ForgotPassword() {
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  let navigate = useNavigate();
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      let payload = {
        email: formData?.email,
        password: formData?.newPassword,
      };
      const { data, error } = await forgotPasswordService(payload);
      if (data) {
        if (data.error) {
          //error
          addToast(data.message, { appearance: "error" });
        } else {
          //toast
          addToast(data.message, { appearance: "success" });

          navigate("/login");
        }
      } else if (error) {
        addToast(error.message, { appearance: "error" });
      }
    }
  };

  const validateForm = () => {
    const validatePassword = (password) => {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };
    let valid = true;

    // Email validation
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !formData.email.trim()
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

    // New password validation
    if (!formData.newPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "New Password is required",
      }));
      valid = false;
    } else if (
      formData.newPassword.trim().length < 8 ||
      !validatePassword(formData.newPassword)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword:
          "Password must be 8 characters or more and include at least one uppercase, one lowercase, one special character, and one number",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        newPassword: "",
      }));
    }

    // Confirm password validation
    if (!formData.confirmPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Confirm Password is required",
      }));
      valid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "",
      }));
    }
    return valid;
  };

  return (
    <div className="container-fluid container-fluidFP  h-100 ">
      <div className="card h-100">
        <div className="row h-100">
          <div
            className="col-md-6 col-lg-7 col-xl-8 formMargin"
            style={{ paddingRight: "0px" }}
          >
            <div className="loginForgetPage">
              <div className="loginform">
                <div className="logo">
                  <img src={logo} alt="logo" />
                </div>
                <div className="forgetTitle mt-4">
                  <h1 className="mb-1">Forgot Password</h1>
                  <small>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </small>
                </div>
                <div className="formForget">
                  <form>
                    <div className="form-group">
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
                          name="email"
                          className="inputPassword"
                          type="text"
                          data-testid="emailInput"
                          // formControlName="email"
                          placeholder="example@gmail.com"
                          autocomplete="off"
                          value={formData.email}
                          onChange={(e) => {
                            handleInputChange(e);
                          }}
                        />
                        <div className="icon">
                          <img src={mailicon} className="pe-2" alt="mailicon" />
                          <span className="line"></span>
                        </div>
                        {errors.email && (
                          <p className="text-danger" style={{ fontSize: 14 }}>
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="form-group mt-3">
                        <label className="d-block">
                          New Password
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
                            name="newPassword"
                            className="inputPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            data-testid="newPasswordInput"
                            placeholder="********"
                            autocomplete="off"
                            value={formData.newPassword}
                            onChange={(e) => {
                              handleInputChange(e);
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
                          {errors.newPassword && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.newPassword}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-group mt-3">
                        <label className="d-block">
                          Re-enter New Password
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
                            className="inputPassword"
                            type={
                              isConfirmPasswordVisible ? "text" : "password"
                            }
                            name="confirmPassword"
                            placeholder="********"
                            // formControlName="confirmpassword"
                            autocomplete="off"
                            data-testid="confirmNewPasswordInput"
                            value={formData.confirmPassword}
                            onChange={(e) => {
                              handleInputChange(e);
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
                                setisConfirmPasswordVisible(
                                  !isConfirmPasswordVisible
                                );
                              }}
                              className={
                                isConfirmPasswordVisible
                                  ? "fa fa-eye"
                                  : "fa fa-eye-slash"
                              }
                              aria-hidden="true"
                            ></i>
                          </div>
                          {errors.confirmPassword && (
                            <div
                              className="text-danger"
                              style={{ fontSize: 14 }}
                            >
                              {errors.confirmPassword}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group text-center mt-3">
                        <button
                          className="btn resetbtnforgot"
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                        >
                          Reset
                        </button>
                      </div>
                    </div>

                    <div className="form-group text-center mt-4">
                      <small>
                        Remembered your Password? <Link to="/login">Login</Link>{" "}
                      </small>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-5  col-xl-4 formMargin">
            <img
              src={forgotpasswords}
              className="w-100 h-100"
              alt="forgotpasswords"
              style={{ marginLeft: 2 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
