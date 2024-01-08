import React, { useState } from "react";
import "./feedback.component.css";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { addRatingService } from "../../../services/userModule";
function FeedbackModal() {
  const [show, setShow] = useState(true);
  const [rating, setRating] = useState(5);
  const [feedback, setfeedback] = useState("");
  const [feedbackError, setfeedbackError] = useState("");
  let navigate = useNavigate();
  let { addToast } = useToasts();
  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const validateFeedbackFields = () => {
    let isValid = true;
    if (feedback.trim() === "") {
      setfeedbackError("Feedback is required");
      isValid = false;
    } else {
      setfeedbackError("");
    }

    return isValid;
  };

  let addRatings = async () => {
    const isValid = validateFeedbackFields();
    if (isValid) {
      let payload = {
        customerId: localStorage.getItem("customerID"),
        email: JSON.parse(localStorage.getItem("loginData")).email,
        rating: rating,
        feedback: feedback,
      };
      const { data, error } = await addRatingService(payload);
      if (data) {
        if (data.error) {
          //error
          addToast(data.message, { appearance: "error" });
        } else {
          //toast
          addToast(data.message, { appearance: "success" });
          navigate("/user/thankyou");
        }
      } else if (error) {
        addToast(error.message, { appearance: "error" });
      }
    }
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
            <div className="modal-header">
              <h5 className="modal-title">Please provide feedback</h5>
            </div>
            <div className="modal-body">
              <div className="mb-4">
                <p style={{ fontSize: 20, marginBottom: 0 }}>Rating</p>
                <div className="rating">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <span
                      key={index}
                      className={`star ${index <= rating ? "filled" : ""}`}
                      onClick={() => handleRatingClick(index)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label
                  htmlFor="itemName"
                  style={{ fontSize: 15, marginLeft: -5 }}
                >
                  Enter description
                  <span
                    style={{
                      color: "red",
                      marginLeft: 2,
                    }}
                  >
                    *
                  </span>
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Description"
                  style={{ borderRadius: 10 }}
                  onChange={(e) => {
                    setfeedback(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="text-danger" style={{ fontSize: 14 }}>
                {feedbackError}
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={addRatings}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FeedbackModal;
