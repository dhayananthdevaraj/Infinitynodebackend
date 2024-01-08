import React, { useState } from "react";
import thankyou from "../../../assets/thankyou.svg";

import "./thankyou.component.css";
import { useNavigate } from "react-router-dom";
import { setUserRole } from "../../../toolkit/userSlice";
import { useDispatch } from "react-redux";
function ThankyouPage() {
  const [show, setShow] = useState(true);
  console.log("thank you");
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let logOutUser = () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const rememberMe = localStorage.getItem("rememberMe");
    dispatch(setUserRole(null));
    localStorage.clear();
    if (username && password && rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      localStorage.setItem("rememberMe", rememberMe);
    }

    navigate("/login");
  };
  return (
    <div>
      {show && (
        <div
          className="modal-backdrop fade show"
          style={{ display: "block" }}
        ></div>
      )}

      <div
        className={`modal fade ${show ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div class="modal-header">
              <button
                onClick={() => {
                  logOutUser();
                }}
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className=" text-center">
                <h1 className="">Thank You!</h1>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <div>
                  <img src={thankyou} alt="thankyou" className="menuspinner" />
                </div>
                <div>
                  <h2 className="fs-10 mt-3">Please Visit Again..</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankyouPage;
