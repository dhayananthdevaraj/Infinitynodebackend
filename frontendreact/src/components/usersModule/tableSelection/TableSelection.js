import React, { useEffect, useState } from "react";
import "./TableSelect.component.css";
import food from "../../../assets/food.jpeg";
import { getTableInfo } from "../../../services/adminModule";
import table1bookedImage0 from "../../../assets/selected4chair.png";
import table1bookedImage1 from "../../../assets/bookedtwoverticalseats.svg";
import table1occupiedImage0 from "../../../assets/occupied4verticalseats.svg";
import table1occupiedImage1 from "../../../assets/selected4chair.png";
import table1vaccantImage0 from "../../../assets/selected4chair.png";
import table1vaccantImage1 from "../../../assets/vaccant4seats.svg";
import table2bookedImage0 from "../../../assets/selected6chair.png";
import table2bookedImage1 from "../../../assets/booked6verticalseats.svg";
import table2occupiedImage0 from "../../../assets/selected6chair.png";
import table2occupiedImage1 from "../../../assets/occupied6horizontalseats.svg";
import table2vaccantImage0 from "../../../assets/selected6chair.png";
import table2vaccantImage1 from "../../../assets/vaccant6seats.svg";
import table3bookedImage0 from "../../../assets/selected2chair.png";
import table3bookedImage1 from "../../../assets/booked2horizontalseats.svg";
import table3occupiedImage0 from "../../../assets/selected2chair.png";
import table3occupiedImage1 from "../../../assets/occupied2horizontalseats.svg";
import table3vaccantImage0 from "../../../assets/selected2chair.png";
import table3vaccantImage1 from "../../../assets/vaccant2horizontalseats.svg";
import { convertTo12HourFormat } from "../../../commonFunctions/commonFunction";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { bookTableService } from "../../../services/userModule";
import jsonData from "./offerCardContent.json";
function TableSelection() {
  const [tableData, settableData] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState("lunch");
  const [selectedTables, setselectedTables] = useState([]);
  const [selectedTableIds, setselectedTableIds] = useState([]);
  const [opendateTimeModal, setopendateTimeModal] = useState(false);
  const [orderDateTime, setorderDateTime] = useState({
    orderDate: "",
    orderTime: selectedMeal === "lunch" ? "15:00" : "20:00",
  });
  const [offerCardData, setofferCardData] = useState();
  const { addToast } = useToasts();
  const [minDate, setMinDate] = useState(getTodayDate());

  const [showOfferCard, setshowOfferCard] = useState(false);

  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = (today.getMonth() + 1).toString().padStart(2, "0");
    const dd = today.getDate().toString().padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  let navigate = useNavigate();

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
    setorderDateTime({
      ...orderDateTime,
      orderTime: meal === "lunch" ? "15:00" : "20:00",
    });
  };

  useEffect(() => {
    if (tableData.length > 0) {
      const filteredData = tableData.filter((item) => item.selected === true);

      const tableNumbers = [].concat(
        ...filteredData.map((item) => item.tableNo)
      );
      const tableIds = [].concat(...filteredData.map((item) => item._id));
      setselectedTables([...tableNumbers]);
      setselectedTableIds([...tableIds]);
    }
  }, [tableData]);

  let selectTableNumber = (selectTable) => {
    const targetId = selectTable._id;
    const index = tableData.findIndex((item) => item._id === targetId);
    if (index !== -1) {
      const updatedtableDataData = [...tableData];
      updatedtableDataData[index].selected =
        !updatedtableDataData[index].selected;
      settableData([...updatedtableDataData]);
    }
  };

  const getAllTable = async () => {
    const { data, error } = await getTableInfo();

    if (data) {
      if (data.error) {
        //error
      } else {
        const tableNumbers = data?.data.map((item) => item.tableNo[0]);
        const numbersToCheck = [13, 14, 15, 16];
        const areNumbersPresent = numbersToCheck.every((number) =>
          tableNumbers.includes(number)
        );

        if (areNumbersPresent) {
          setshowOfferCard(false);
        } else {
          setshowOfferCard(true);
        }

        let tempArray = [];
        data?.data.map((val) => {
          val.selected = false;
          tempArray.push(val);
        });
        settableData([...tempArray]);
      }
    } else if (error) {
    }
  };

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    setorderDateTime({ ...orderDateTime, orderDate: formattedDate });
    getOfferDishData().then((data) => {
      setofferCardData(data.data);
    });
    getAllTable();
  }, []);

  function getOfferDishData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(jsonData);
      }, 0);
    });
  }

  const handleClose = () => setopendateTimeModal(false);
  const handleShow = () => setopendateTimeModal(true);

  let saveTableBooking = async () => {
    let payload = {
      _id: selectedTableIds.join(","),
      bookingDate: orderDateTime.orderDate,
      bookingTime: convertTo12HourFormat(orderDateTime.orderTime),
      booked: true,
    };
    const { data, error } = await bookTableService(payload);

    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        //toast
        addToast(data.message, { appearance: "success" });
        console.log("aaaaaa",data);
        localStorage.setItem("tableno", JSON.stringify(data?.data.tableNo));
        navigate("/user/orders");
      }
    } else if (error) {
      addToast(error.message, { appearance: "error" });
    }
  };
  return tableData?.length < 1 ? (
    <p
      style={{
        textAlign: "center",
        fontWeight: "bolder",
        fontSize: "large",
      }}
    >
      No Tables to display
    </p>
  ) : (
    <div className="select-table mt-3 ">
      {/* modal start */}
      <div
        className={`modal fade ${opendateTimeModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: opendateTimeModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select preferred date and time</h5>
              <button type="button" className="close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="timePicker" className="form-label">
                  Select Date:
                </label>
                <input
                  type="date"
                  min={minDate}
                  className="form-control"
                  value={orderDateTime.orderDate}
                  onChange={(e) =>
                    setorderDateTime({
                      ...orderDateTime,
                      orderDate: e.target.value,
                    })
                  }
                />
              </div>

              <div
                className="btn-group mt-4"
                role="group"
                aria-label="Meal Selection"
              >
                <button
                  type="button"
                  className={`btn ${
                    selectedMeal === "lunch" ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => handleMealSelection("lunch")}
                >
                  Lunch
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedMeal === "dinner" ? "btn-success" : "btn-secondary"
                  }`}
                  onClick={() => handleMealSelection("dinner")}
                >
                  Dinner
                </button>
              </div>

              <div className="mt-2">
                <label htmlFor="timePicker" className="form-label">
                  Selected Time:{" "}
                  {convertTo12HourFormat(orderDateTime.orderTime)}
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="timePicker"
                  value={orderDateTime.orderTime}
                  onChange={(e) =>
                    setorderDateTime({
                      ...orderDateTime,
                      orderTime: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveTableBooking}
              >
                Proceed to order
              </button>
            </div>
          </div>
        </div>
      </div>

      {opendateTimeModal && (
        <div
          className="modal-backdrop fade show"
          style={{ display: "block" }}
        ></div>
      )}

      <div className="container-fluid ">
        <div className="card select-table-card  ">
          <div className="tables pt-2">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5 g-2 g-lg-3">
              <div className="col d-flex align-items-center flex-column h-100">
                {tableData.map((tables, i) => {
                  return (
                    <div>
                      {(tables.tableNo[0] === 1 ||
                        tables.tableNo[0] === 2 ||
                        tables.tableNo[0] === 3) && (
                        <div>
                          <div
                            className="table1 position-relative"
                            style={{ zIndex: 90 }}
                          >
                            <small
                              style={{
                                color: tables.selected ? "white" : "black",
                              }}
                              className="tableno"
                            >
                              T{tables.tableNo[0]}
                            </small>
                            {!tables.booked === true &&
                              tables.alloted === true && (
                                <img
                                  src={
                                    !tables.selected
                                      ? table1occupiedImage0
                                      : table1occupiedImage1
                                  }
                                  alt="ro1"
                                />
                              )}

                            {!tables.booked === true &&
                              tables.alloted === false && (
                                <img
                                  onClick={() => {
                                    selectTableNumber(tables);
                                  }}
                                  src={
                                    !tables.selected
                                      ? table1vaccantImage1
                                      : table1vaccantImage0
                                  }
                                />
                              )}

                            {((!tables.booked === false &&
                              tables.alloted === false) ||
                              (!tables.booked === false &&
                                tables.alloted === true)) && (
                              <img
                                src={
                                  !tables.selected
                                    ? table1bookedImage1
                                    : table1bookedImage0
                                }
                              />
                            )}

                            <div className="table-details">
                              {!tables.booked === false && (
                                <div className="booked text-start">
                                  <small className="d-block"></small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#D4C500", lineHeight: 1 }}
                                  >
                                    Booked
                                  </small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#909090", lineHeight: 1 }}
                                  ></small>
                                </div>
                              )}
                              {!tables.booked === true &&
                                tables.alloted === true && (
                                  <div className="occupied text-start">
                                    <small className="d-block"></small>
                                    <small
                                      className="d-block"
                                      style={{
                                        color: "#17A39D",
                                        lineHeight: 1,
                                      }}
                                    >
                                      Occupied
                                    </small>
                                  </div>
                                )}
                              {!tables.booked === true &&
                                tables.alloted === false && (
                                  <div className="booked text-start">
                                    <small
                                      className="d-block"
                                      style={{
                                        color: tables.selected
                                          ? "white"
                                          : "#5EBB48",
                                        lineHeight: 2,
                                      }}
                                    >
                                      Vacant
                                    </small>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="col d-flex  align-items-center flex-column">
                {tableData.map((tables, i) => {
                  return (
                    <div>
                      {(tables.tableNo[0] === 4 || tables.tableNo[0] === 5) && (
                        <div>
                          <div
                            className="table4 position-relative"
                            style={{ zIndex: 0 }}
                          >
                            <small
                              className="tableno"
                              style={{
                                color: tables.selected ? "white" : "black",
                              }}
                            >
                              T{tables.tableNo[0]}
                            </small>

                            {!tables.booked === true &&
                              tables.alloted === true && (
                                <img
                                  className="mb-2"
                                  src={
                                    !tables.selected
                                      ? table2occupiedImage1
                                      : table2occupiedImage0
                                  }
                                />
                              )}

                            {!tables.booked === true &&
                              tables.alloted === false && (
                                <img
                                  onClick={() => {
                                    selectTableNumber(tables);
                                  }}
                                  className="mb-2"
                                  src={
                                    tables.selected === true
                                      ? table2vaccantImage0
                                      : table2vaccantImage1
                                  }
                                />
                              )}

                            {!tables.booked === false && (
                              <img
                                className="mb-2"
                                src={
                                  !tables.selected
                                    ? table2bookedImage1
                                    : table2bookedImage0
                                }
                              />
                            )}

                            <div className="table-details">
                              {!tables.booked === false && (
                                <div className="booked text-start">
                                  <small className="d-block"></small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#D4C500", lineHeight: 1 }}
                                  >
                                    Booked
                                  </small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#909090", lineHeight: 1 }}
                                  ></small>
                                </div>
                              )}

                              {!tables.booked === true &&
                                tables.alloted === true && (
                                  <div className="occupied text-start">
                                    <small className="d-block"></small>
                                    <small
                                      className="d-block"
                                      style={{
                                        color: "#17A39D",
                                        lineHeight: 1,
                                      }}
                                    >
                                      Occupied
                                    </small>
                                  </div>
                                )}

                              {!tables.booked === true &&
                                tables.alloted === false && (
                                  <div className="booked text-start">
                                    <small
                                      className="d-block"
                                      style={{
                                        lineHeight: 2,
                                        color: tables.selected
                                          ? "white"
                                          : "#5EBB48",
                                      }}
                                    >
                                      Vacant
                                    </small>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="col d-flex  align-items-center flex-column">
                {tableData.map((tables, i) => {
                  return (
                    <div>
                      {(tables.tableNo[0] === 6 ||
                        tables.tableNo[0] === 7 ||
                        tables.tableNo[0] === 8 ||
                        tables.tableNo[0] === 9) && (
                        <div>
                          <div
                            className="table6 position-relative"
                            style={{ zIndex: 0 }}
                          >
                            <small
                              className="tableno"
                              style={{
                                color: tables.selected ? "white" : "black",
                              }}
                            >
                              T{tables.tableNo}
                            </small>

                            {!tables.booked === true &&
                              tables.alloted === true && (
                                <img
                                  src={
                                    !tables.selected
                                      ? table3occupiedImage1
                                      : table3occupiedImage0
                                  }
                                />
                              )}

                            {!tables.booked === true &&
                              tables.alloted === false && (
                                <img
                                  onClick={() => {
                                    selectTableNumber(tables);
                                  }}
                                  src={
                                    !tables.selected
                                      ? table3vaccantImage1
                                      : table3occupiedImage0
                                  }
                                />
                              )}

                            {!tables.booked === false && (
                              <img
                                src={
                                  !tables.selected
                                    ? table3bookedImage1
                                    : table3bookedImage0
                                }
                              />
                            )}

                            <div className="table-details">
                              {!tables.booked === false && (
                                <div className="booked text-start">
                                  <small className="d-block"></small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#D4C500", lineHeight: 1 }}
                                  >
                                    Booked
                                  </small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#909090", lineHeight: 1 }}
                                  ></small>
                                </div>
                              )}

                              {!tables.booked === true &&
                                tables.alloted === true && (
                                  <div className="occupied text-start">
                                    <small className="d-block"></small>
                                    <small
                                      className="d-block"
                                      style={{
                                        color: "#17A39D",
                                        lineHeight: 1,
                                      }}
                                    >
                                      Occupied
                                    </small>
                                  </div>
                                )}

                              {!tables.booked === true &&
                                tables.alloted === false && (
                                  <div className="booked text-start">
                                    <small
                                      className={
                                        tables.selected
                                          ? 'white "d-block"'
                                          : '#5EBB48 "d-block"'
                                      }
                                      style={{
                                        lineHeight: 2,
                                        color: tables.selected
                                          ? "white"
                                          : "#5EBB48",
                                      }}
                                    >
                                      Vacant
                                    </small>
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="col d-flex flex-column align-items-center">
                {tableData.map((tables, i) => {
                  return (
                    <div>
                      {(tables.tableNo[0] === 10 ||
                        tables.tableNo[0] === 11 ||
                        tables.tableNo[0] === 12) && (
                        <div>
                          <div
                            className="table10 position-relative"
                            style={{ zIndex: 0 }}
                          >
                            <small
                              className="tableno"
                              style={{
                                color: tables.selected ? "white" : "black",
                              }}
                            >
                              T{tables.tableNo}
                            </small>

                            {!tables.booked === true &&
                              tables.alloted === true && (
                                <img
                                  className="mb-2"
                                  src={
                                    !tables.selected
                                      ? table1occupiedImage1
                                      : table1occupiedImage0
                                  }
                                />
                              )}

                            {!tables.booked === true &&
                              tables.alloted === false && (
                                <img
                                  onClick={() => {
                                    selectTableNumber(tables);
                                  }}
                                  className="mb-2"
                                  src={
                                    !tables.selected
                                      ? table1vaccantImage1
                                      : table1vaccantImage0
                                  }
                                />
                              )}

                            {!tables.booked === false && (
                              <img
                                className="mb-2"
                                src={
                                  !tables.selected
                                    ? table1bookedImage1
                                    : table1bookedImage0
                                }
                              />
                            )}

                            {!tables.booked === false && (
                              <div className="table-details">
                                <div className="booked text-start" />
                                <small className="d-block"></small>
                                <small
                                  className="d-block"
                                  style={{ color: "#D4C500", lineHeight: 1 }}
                                >
                                  Booked
                                </small>
                                <small
                                  className="d-block"
                                  style={{ color: "#909090", lineHeight: 1 }}
                                ></small>
                              </div>
                            )}

                            {!tables.booked === true &&
                              tables.alloted === true && (
                                <div className="occupied text-start">
                                  <small className="d-block"></small>
                                  <small
                                    className="d-block"
                                    style={{ color: "#17A39D", lineHeight: 1 }}
                                  >
                                    Occupied
                                  </small>
                                </div>
                              )}

                            {!tables.booked === true &&
                              tables.alloted === false && (
                                <div className="table-details">
                                  <div className="booked text-start" />
                                  <small className="d-block"></small>
                                  <small
                                    className="d-block"
                                    style={{
                                      lineHeight: 1,
                                      color: tables.selected
                                        ? "white"
                                        : "#5EBB48",
                                    }}
                                  >
                                    Vacant
                                  </small>
                                  <small
                                    className="d-block"
                                    style={{
                                      lineHeight: 1,
                                      color: tables.selected
                                        ? "white"
                                        : "#5EBB48",
                                    }}
                                  ></small>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {showOfferCard && (
                <div>
                  <div className="offerTable ">
                    <div className=" flip-cardTable">
                      <div className="flip-card-innerTable">
                        <div className="">
                          <div className="card-offer-table">
                            <p className="mb-0">
                              {offerCardData[0].dishDiscount}% off
                            </p>
                          </div>
                          <img src={food} className="mt-4  w-100" alt="food" />
                          <div className="col-md-12 d-flex justify-content-center">
                            <p className="m-0 mt-3 text-bold item-name-table mb-2">
                              {offerCardData[0].dishName}
                            </p>
                          </div>
                          <div className="col-md-12">
                            <p className="item-discription m-0 mb-2">
                              {offerCardData[0].dishDetails}
                            </p>
                            <p className="item-price-table text-center m-0">
                              <span>₹{offerCardData[0].dishPrice}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="col d-flex flex-column align-items-center">
                {tableData.map((tables, i) => {
                  return (
                    <div className="w-100">
                      <div>
                        {(tables.tableNo[0] === 13 ||
                          tables.tableNo[0] === 14 ||
                          tables.tableNo[0] === 15 ||
                          tables.tableNo[0] === 16) && (
                          <div>
                            <div
                              className="table6 position-relative"
                              style={{ zIndex: 0 }}
                            >
                              <small
                                className="tableno"
                                style={{
                                  color: tables.selected ? "white" : "black",
                                }}
                              >
                                T{tables.tableNo}
                              </small>

                              {!tables.booked === true &&
                                tables.alloted === true && (
                                  <img
                                    src={
                                      !tables.selected
                                        ? table3occupiedImage1
                                        : table3occupiedImage0
                                    }
                                  />
                                )}

                              {!tables.booked === true &&
                                tables.alloted === false && (
                                  <img
                                    onClick={() => {
                                      selectTableNumber(tables);
                                    }}
                                    src={
                                      !tables.selected
                                        ? table3vaccantImage1
                                        : table3occupiedImage0
                                    }
                                  />
                                )}

                              {!tables.booked === false && (
                                <img
                                  src={
                                    !tables.selected
                                      ? table3bookedImage1
                                      : table3bookedImage0
                                  }
                                />
                              )}

                              <div className="table-details">
                                {!tables.booked === false && (
                                  <div className="booked text-start">
                                    <small className="d-block"></small>
                                    <small
                                      className="d-block"
                                      style={{
                                        color: "#D4C500",
                                        lineHeight: 1,
                                      }}
                                    >
                                      Booked
                                    </small>
                                    <small
                                      className="d-block"
                                      style={{
                                        color: "#909090",
                                        lineHeight: 1,
                                      }}
                                    ></small>
                                  </div>
                                )}

                                {!tables.booked === true &&
                                  tables.alloted === true && (
                                    <div className="occupied text-start">
                                      <small className="d-block"></small>
                                      <small
                                        className="d-block"
                                        style={{
                                          color: "#17A39D",
                                          lineHeight: 1,
                                        }}
                                      >
                                        Occupied
                                      </small>
                                    </div>
                                  )}

                                {!tables.booked === true &&
                                  tables.alloted === false && (
                                    <div className="booked text-start">
                                      <small
                                        className={
                                          tables.selected
                                            ? 'white "d-block"'
                                            : '#5EBB48 "d-block"'
                                        }
                                        style={{
                                          lineHeight: 2,
                                          color: tables.selected
                                            ? "white"
                                            : "#5EBB48",
                                        }}
                                      >
                                        Vacant
                                      </small>
                                    </div>
                                  )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="card footercard m-3 p-3">
            <div className="footer d-flex  justify-content-between">
              <div className="text-center order-1 order-sm-1"></div>
              <div className="text-center d-none d-sm-block order-3 order-sm-2 fs-24">
                <h2
                  className="mb-0 fs-24 text-center"
                  style={{ fontWeight: 500 }}
                >
                  {!selectedTables?.length > 0
                    ? "Please select table to order"
                    : `Selected table: ${selectedTables}`}
                </h2>
              </div>
              <div className="text-center order-2 order-sm-3">
                <button
                  onClick={handleShow}
                  className={
                    selectedTables?.length === 0 || selectedTables === null
                      ? "btn  btn-secondary"
                      : "btn  btn-primary"
                  }
                  disabled={
                    selectedTables?.length === 0 || selectedTables === null
                  }
                >
                  Select & Order food
                </button>
              </div>
            </div>
            <div className="text-left d-sm-none order-3 order-sm-2 mt-3">
              <h2 className="mb-0" style={{ fontWeight: 500 }}>
                Selected Table NUMBER
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableSelection;
