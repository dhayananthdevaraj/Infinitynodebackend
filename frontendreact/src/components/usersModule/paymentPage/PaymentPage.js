import React, { useEffect, useState } from "react";
import "./payment.component.css";

import { Tabs, Tab, Typography, Box } from "@mui/material";
import creditCardIcon from "../../../assets/paymentGateway/Group 846.png";
import inActivecreditCardIcon from "../../../assets/paymentGateway/Group 844.png";

import inActiveUPIIcon from "../../../assets/paymentGateway/Group 847.svg";
import UPIIcon from "../../../assets/paymentGateway/Group 845.svg";

import cashIcon from "../../../assets/paymentGateway/Group 843.png";
import inActivecashIcon from "../../../assets/paymentGateway/Group 848.png";

import eWalletIcon from "../../../assets/paymentGateway/Group 842.png";
import inActiveWalletIcon from "../../../assets/paymentGateway/Group 849.png";
import { useLocation } from "react-router-dom";
import {
  addPaymentService,
  getOrderIDService,
} from "../../../services/userModule";
import { useToasts } from "react-toast-notifications";
import FeedbackModal from "../../atoms/ModalComponent/FeedbackModal";
import ThankyouPage from "../thankyouPage/ThankyouPage";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function PaymentPage() {
  const [imageFlag, setImageFlag] = useState(true);
  const [upiFlag, setUpiFlag] = useState(true);
  const [cashFlag, setCashFlag] = useState(true);
  const [ewalletFlag, setEwalletFlag] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [serviceCharge, setServiceCharge] = useState(0);
  const [starRating, setStarRating] = useState(0);

  const [activeTab, setActiveTab] = useState("tab1");

  const [showFeedbackModal, setshowFeedbackModal] = useState(false);
  // Credit Card Form Fields and Errors

  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [expiryDateError, setExpiryDateError] = useState("");
  const [cardNameError, setCardNameError] = useState("");
  let { addToast } = useToasts();
  const { state } = useLocation();
  useEffect(() => {
    setTotalPrice(state?.subTotal);
    setServiceCharge(state?.serviceCharge);
  }, []);
  // tabs
  const [tabvalue, settabValue] = useState(0);

  const handleChange = (event, newValue) => {
    settabValue(newValue);
  };

  const gobacktoorders = () => {};

  let makePaymentAftergetOrderDetails = async () => {
    let payload = {
      paymentMode: "Credit Card",
      customerId: localStorage.getItem("customerID"),
      email: JSON.parse(localStorage.getItem("loginData"))?.email,
      customerName: localStorage.getItem("customerName"),
      paymentDesc: "new payment",
      totalPrice: totalPrice + serviceCharge,
      phNo: "9999999999",
      status: "successful",
      orderId: JSON.parse(localStorage.getItem("orderId")),
    };

    const { data, error } = await addPaymentService(payload);
    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        //toast
        addToast(data.message, { appearance: "success" });
        setshowFeedbackModal(true);
      }
    } else if (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  const makePayment = async () => {
    const isValid = validateCreditCardFields();
    if (isValid) {
      const { data, error } = await getOrderIDService(
        localStorage.getItem("customerID")
      );
      console.log("data", data);
      if (data) {
        if (data.error) {
          //error
          addToast(data.message, { appearance: "error" });
        } else {
          localStorage.setItem("orderId", JSON.stringify(data?.data._id));
          makePaymentAftergetOrderDetails();
        }
      } else if (error) {
        addToast(error.message, { appearance: "error" });
      }
    }
  };

  const validateCreditCardFields = () => {
    let isValid = true;

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
      setCardNumberError("Invalid card number (must be 16 digits)");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
      setCvvError("Invalid CVV (must be 3 digits)");
      isValid = false;
    } else {
      setCvvError("");
    }

    // Validate expiry date (MM/YYYY format)
    if (!/^(0[1-9]|1[0-2])\/20\d{2}$/.test(expiryDate)) {
      setExpiryDateError("Invalid expiry date (MM/YYYY format)");
      isValid = false;
    } else {
      setExpiryDateError("");
    }

    // Validate card name (non-empty)
    if (cardName.trim() === "") {
      setCardNameError("Card name is required");
      isValid = false;
    } else {
      setCardNameError("");
    }

    return isValid;
  };

  return (
    <div
      style={{ backgroundColor: "#F8F7FC", height: "90vh", overflow: "auto" }}
      className="mt-5"
    >
      <div
        style={{ backgroundColor: "#F8F7FC" }}
        className="col-md-12 d-flex px-4 container-fluid w-100"
      >
        <div className="col-md-8">
          <div className=" mb-4 mx-5">
            <h1 className="paymentHeading">Choose your payment method</h1>
            <div className="card ordercardPayment ">
              <div>
                <Tabs
                  value={tabvalue}
                  onChange={handleChange}
                  variant="fullWidth"
                  indicatorColor="primary"
                  textColor="primary"
                  aria-label="icon tabs example"
                  sx={{ border: "none", marginTop: 1 }}
                >
                  <Tab
                    icon={
                      <img
                        src={
                          tabvalue === 0
                            ? creditCardIcon
                            : inActivecreditCardIcon
                        }
                        alt="creditCardIcon"
                      />
                    }
                    label="Credit Card"
                    style={{ textTransform: "none" }}
                  />
                  <Tab
                    icon={
                      <img
                        src={tabvalue === 1 ? UPIIcon : inActiveUPIIcon}
                        alt="UPIIcon"
                      />
                    }
                    label="UPI"
                    style={{ textTransform: "none" }}
                  />
                  <Tab
                    icon={
                      <img
                        src={tabvalue === 2 ? cashIcon : inActivecashIcon}
                        alt="cashIcon"
                      />
                    }
                    label="Cash"
                    style={{ textTransform: "none" }}
                  />
                  <Tab
                    icon={
                      <img
                        src={tabvalue === 3 ? eWalletIcon : inActiveWalletIcon}
                        alt="eWalletIcon"
                      />
                    }
                    label="E-Wallet"
                    style={{ textTransform: "none" }}
                  />
                </Tabs>

                <TabPanel value={tabvalue} index={0}>
                  <div className="mb-3">
                    <div className="mt-2 mx-5 row">
                      <div className="cardnumberTitle ">
                        Card Number
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </div>
                      <div className="input_wrap w-100">
                        <input
                          className="w-100 cardnumber "
                          type="text"
                          required
                          maxLength="16"
                          id="card_number"
                          placeholder="1234 1234 1234 1234"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div className="text-danger" style={{ fontSize: 14 }}>
                        {cardNumberError}
                      </div>
                    </div>
                    <div className="mt-4 mx-5 row">
                      <div className="col-md-6">
                        <div className="cardnumberTitle">
                          CVV Number
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </div>
                        <div className="input_wrap w-100">
                          <input
                            className="w-100 cardnumber"
                            type="text"
                            required
                            maxLength="3"
                            id="card_number"
                            placeholder="- - -"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                        <div className="text-danger" style={{ fontSize: 14 }}>
                          {cvvError}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="cardnumberTitle">
                          Expiry Date
                          <span
                            style={{
                              color: "red",
                              marginLeft: 2,
                            }}
                          >
                            *
                          </span>
                        </div>
                        <div className="input_wrap w-100">
                          <input
                            className="w-100 cardnumber"
                            type="text"
                            required
                            maxLength="7"
                            id="card_number"
                            placeholder="MM/YYYY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                          />
                        </div>
                        <div className="text-danger" style={{ fontSize: 14 }}>
                          {expiryDateError}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 mx-5 row">
                      <div className="cardnumberTitle">
                        Name On Card
                        <span
                          style={{
                            color: "red",
                            marginLeft: 2,
                          }}
                        >
                          *
                        </span>
                      </div>
                      <div className="input_wrap w-100">
                        <input
                          className="w-100 cardnumber"
                          type="text"
                          required
                          id="card_number"
                          placeholder="Name"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="text-danger" style={{ fontSize: 14 }}>
                        {cardNameError}
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={tabvalue} index={1}>
                  <div className="mb-5 upipage">
                    <div className="upiText">
                      You have selected UPI Payment mode.
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={tabvalue} index={2}>
                  <div className="mb-5 upipage">
                    <div className="upiText">
                      You have selected Cash Payment mode.
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value={tabvalue} index={3}>
                  <div className="mb-5 upipage">
                    <div className="upiText">
                      You have selected E-Wallet Payment mode.
                    </div>
                  </div>
                </TabPanel>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div
          //   className="mt-5"
          >
            <h1 className="summaryHeading">Summary</h1>
          </div>
          <div className="subtotalamount">
            <div className="subTotal col-md-6">Sub Total</div>
            <div className="totalamount col-md-6">₹ {totalPrice} /-</div>
          </div>
          <div className="subtotalamount mt-4">
            <div className="subTotal col-md-6">Service Charges</div>
            <div className="totalamount col-md-6">₹ {serviceCharge} /-</div>
          </div>
          <div className="alltotalamount">
            <div className="Totalpay col-md-6">Total Payables</div>
            <div className="totalamount col-md-6">
              ₹ {totalPrice + serviceCharge} /-
            </div>
          </div>
          <div className="itemDis">
            <p className="itemdiscount"> Have a discount code?</p>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundColor: "#F8F7FC" }}
        className="paymentFooter d-flex p-4 w-100 "
      >
        <div className="row col-md-12">
          <div className="col-md-2 ">
            <button
              className="backbtn btn"
              onClick={gobacktoorders}
              style={{ marginLeft: 50 }}
            >
              Go back
            </button>
          </div>
          <div className="col-md-8 ">
            <p className="footerText">
              By Clicking check out button you agree with our
            </p>
            <p className="footerText">
              terms and conditions and money back guarantee. Thank you for
              trusting our services.
            </p>
          </div>
          <div className="col-md-2 ">
            <button className="Checkoutbtn btn" onClick={makePayment}>
              {" "}
              Check Out <i className="fa fa-angle-right" aria-hidden="true"></i>
            </button>
            <button
              style={{ display: "none" }}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></button>
          </div>
        </div>
      </div>
      {showFeedbackModal && <FeedbackModal />}
    </div>
  );
}

export default PaymentPage;
