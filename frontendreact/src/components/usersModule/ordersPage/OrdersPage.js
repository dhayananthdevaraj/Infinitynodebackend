import React, { useEffect, useState } from "react";
import "./orderas.component.css";
import "./order.component.css";
import starters from "../../../assets/starters.svg";
import maingroup from "../../../assets/maingroup.svg";
import deserts from "../../../assets/deserts.svg";
import bevarages from "../../../assets/bevarages.svg";
import dish from "../../../assets/dish.png";
import chickenleg from "../../../assets/chicken-leg.png";
import { getMenuInfo } from "../../../services/adminModule";
import { formatIndianCurrency } from "../../../commonFunctions/commonFunction";
import OrderBilling from "./orderBilling/OrderBilling";
import { useNavigate } from "react-router-dom";

function OrdersPage() {
  const [menuData, setmenuData] = useState([]);
  const [startersData, setstartersData] = useState([]);
  const [mainCourseData, setmainCourseData] = useState([]);
  const [desertsData, setdesertsData] = useState([]);
  const [beverageData, setbeverageData] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("veg");
  const [cartItemsData, setcartItemsData] = useState([]);
  const [showLoginPrompt, setshowLoginPrompt] = useState(false);
  const [role, setrole] = useState("");
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    setrole(localStorage.getItem("role"));
    getTheMenu();
  }, []);

  let navigate = useNavigate();

  const getTheMenu = async () => {
    const { data, error } = await getMenuInfo();
    if (data) {
      if (data.error) {
        //error
      } else {
        setmenuData(data?.data);
console.log("data?.data",data?.data);

        const starterDishes = data?.data
          .filter((item) => item.category === "starter")
          .map((item) => ({ ...item, count: 0 }));
        setstartersData(starterDishes);

        const mainCourseDishes = data?.data
          .filter((item) => item.category === "main course")
          .map((item) => ({ ...item, count: 0 }));
          console.log("mainCourseDishes",mainCourseDishes);
        setmainCourseData(mainCourseDishes);

        const desertDishes = data?.data
          .filter((item) => item.category === "deserts")
          .map((item) => ({ ...item, count: 0 }));
        setdesertsData(desertDishes);

        const beverageDishes = data?.data
          .filter((item) => item.category === "breverage")
          .map((item) => ({ ...item, count: 0 }));
        setbeverageData(beverageDishes);
      }
    } else if (error) {
    }
  };

  let changeDishCount = (dish, type, category) => {
    if (role === "user") {
      if (category === "starter") {
        if (type === "decrement") {
          const targetId = dish._id;
          const index = startersData.findIndex((item) => item._id === targetId);
          const updatedstartersData = [...startersData];
          //main logic
          if (index !== -1) {
            if (updatedstartersData[index].count >= 1) {
              updatedstartersData[index].count -= 1;
              setstartersData([...updatedstartersData]);

              // cart logic
              const cartIndex = cartItemsData.findIndex(
                (item) => item._id === targetId
              );
              const updatedcartItemsData = [...cartItemsData];

              if (cartIndex !== -1) {
                if (updatedcartItemsData[cartIndex].count >= 1) {
                  updatedcartItemsData[cartIndex].count =
                    updatedstartersData[index].count;
                  setcartItemsData([...updatedcartItemsData]);
                }
              } else {
                updatedcartItemsData.push(updatedstartersData[index]);
                setcartItemsData([...updatedcartItemsData]);
              }
            }
          }
        }

        if (type === "increment") {
          const targetId = dish._id;
          const index = startersData.findIndex((item) => item._id === targetId);
          const updatedstartersData = [...startersData];

          if (index !== -1) {
            // Increment the count value by 1 for the found object
            updatedstartersData[index].count += 1;
            setstartersData([...updatedstartersData]);

            // cart logic
            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedstartersData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedstartersData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }

        if (type === "delete") {
          const targetId = dish._id;
          const index = startersData.findIndex((item) => item._id === targetId);
          const updatedstartersData = [...startersData];

          if (index !== -1) {
            updatedstartersData[index].count = 0;
            setstartersData([...updatedstartersData]);

            // cart logic
            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedstartersData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedstartersData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
      }
      if (category === "main course") {
        if (type === "decrement") {
          const targetId = dish._id;
          const index = mainCourseData.findIndex(
            (item) => item._id === targetId
          );
          const updatedmainCourseData = [...mainCourseData];

          if (index !== -1) {
            if (updatedmainCourseData[index].count >= 1) {
              updatedmainCourseData[index].count -= 1;
              setmainCourseData([...updatedmainCourseData]);
            }
          }
        }

        if (type === "increment") {
          const targetId = dish._id;
          const index = mainCourseData.findIndex(
            (item) => item._id === targetId
          );
          const updatedmainCourseData = [...mainCourseData];
          if (index !== -1) {
            // Increment the count value by 1 for the found object
            updatedmainCourseData[index].count += 1;
            setmainCourseData([...updatedmainCourseData]);

            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedmainCourseData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedmainCourseData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
        if (type === "delete") {
          const targetId = dish._id;
          const index = mainCourseData.findIndex(
            (item) => item._id === targetId
          );
          const updatedmainCourseData = [...mainCourseData];
          if (index !== -1) {
            updatedmainCourseData[index].count = 0;
            setmainCourseData([...updatedmainCourseData]);

            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedmainCourseData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedmainCourseData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
      }

      if (category === "deserts") {
        if (type === "decrement") {
          const targetId = dish._id;
          const index = desertsData.findIndex((item) => item._id === targetId);
          const updatedesertsData = [...desertsData];

          if (index !== -1) {
            if (updatedesertsData[index].count >= 1) {
              updatedesertsData[index].count -= 1;
              setdesertsData([...updatedesertsData]);

              const cartIndex = cartItemsData.findIndex(
                (item) => item._id === targetId
              );
              const updatedcartItemsData = [...cartItemsData];

              if (cartIndex !== -1) {
                if (updatedcartItemsData[cartIndex].count >= 1) {
                  updatedcartItemsData[cartIndex].count =
                    updatedesertsData[index].count;
                  setcartItemsData([...updatedcartItemsData]);
                }
              } else {
                updatedcartItemsData.push(updatedesertsData[index]);
                setcartItemsData([...updatedcartItemsData]);
              }
            }
          }
        }

        if (type === "increment") {
          const targetId = dish._id;
          const index = desertsData.findIndex((item) => item._id === targetId);
          const updatedesertsData = [...desertsData];
          if (index !== -1) {
            // Increment the count value by 1 for the found object
            updatedesertsData[index].count += 1;
            setdesertsData([...updatedesertsData]);

            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedesertsData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedesertsData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
        if (type === "delete") {
          const targetId = dish._id;
          const index = desertsData.findIndex((item) => item._id === targetId);
          const updatedesertsData = [...desertsData];
          if (index !== -1) {
            // Increment the count value by 1 for the found object
            updatedesertsData[index].count = 0;
            setmainCourseData([...updatedesertsData]);

            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatedesertsData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatedesertsData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
      }
      if (category === "breverage") {
        if (type === "decrement") {
          const targetId = dish._id;
          const index = beverageData.findIndex((item) => item._id === targetId);
          const updatebeverageData = [...beverageData];

          if (index !== -1) {
            if (updatebeverageData[index].count >= 1) {
              updatebeverageData[index].count -= 1;
              setbeverageData([...updatebeverageData]);

              const cartIndex = cartItemsData.findIndex(
                (item) => item._id === targetId
              );
              const updatedcartItemsData = [...cartItemsData];

              if (cartIndex !== -1) {
                if (updatedcartItemsData[cartIndex].count >= 1) {
                  updatedcartItemsData[cartIndex].count =
                    updatebeverageData[index].count;
                  setcartItemsData([...updatedcartItemsData]);
                }
              } else {
                updatedcartItemsData.push(updatebeverageData[index]);
                setcartItemsData([...updatedcartItemsData]);
              }
            }
          }
        }

        if (type === "increment") {
          const targetId = dish._id;
          const index = beverageData.findIndex((item) => item._id === targetId);
          const updatebeverageData = [...beverageData];
          if (index !== -1) {
            // Increment the count value by 1 for the found object
            updatebeverageData[index].count += 1;
            setbeverageData([...updatebeverageData]);
            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatebeverageData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatebeverageData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
        if (type === "delete") {
          const targetId = dish._id;
          const index = beverageData.findIndex((item) => item._id === targetId);
          const updatebeverageData = [...beverageData];
          if (index !== -1) {
            updatebeverageData[index].count = 0;
            setbeverageData([...updatebeverageData]);
            const cartIndex = cartItemsData.findIndex(
              (item) => item._id === targetId
            );
            const updatedcartItemsData = [...cartItemsData];

            if (cartIndex !== -1) {
              updatedcartItemsData[cartIndex].count =
                updatebeverageData[index].count;
              setcartItemsData([...updatedcartItemsData]);
            } else {
              updatedcartItemsData.push(updatebeverageData[index]);
              setcartItemsData([...updatedcartItemsData]);
            }
          }
        }
      }
    } else {
      setshowLoginPrompt(true);
    }
  };

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 mt-2">
          <div className="card order-card" style={{ width: "100%" }}>
            <div className="card-body">
              <ul
                className="nav tabs nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "tab1" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab1")}
                    href="#"
                  >
                    <div className="btncontent">
                      <img src={starters} alt="" />
                      &nbsp;Starters
                    </div>
                    <div className="activdeline"></div>
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "tab2" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab2")}
                    href="#"
                  >
                    <div className="btncontent">
                      <img src={maingroup} alt="" />
                      &nbsp;Main Course
                    </div>
                    <div className="activdeline"></div>
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "tab3" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab3")}
                    href="#"
                  >
                    <div>
                      <img src={deserts} alt="" />
                      &nbsp;Deserts
                    </div>

                    <div className="activdeline"></div>
                  </a>
                </li>

                <li className="nav-item" role="presentation">
                  <a
                    className={`nav-link ${
                      activeTab === "tab4" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("tab4")}
                    href="#"
                  >
                    <div className="btncontent">
                      <img src={bevarages} alt="" />
                      &nbsp;Beverages
                    </div>
                    <div className="activdeline"></div>
                  </a>
                </li>
              </ul>

              {/* tab content */}

              <div className="tab-content" id="pills-tabContent">
                {/* tab 1 */}
                <div
                  className={`tab-pane ${
                    activeTab === "tab1" ? "show active" : ""
                  }`}
                  id="tab1"
                >
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-2 category-col">
                        <div className="row">
                          <div className="col-md-11">
                            <div className="row d-flex justify-content-center">
                              <img
                                onClick={() => {
                                  setselectedCategory("veg");
                                }}
                                src={dish}
                                alt="dish"
                                className={
                                  selectedCategory === "veg"
                                    ? "category-img isSelected "
                                    : "category-img !isSelectedVeg"
                                }
                              />
                            </div>
                            <div className="row">
                              <h3
                                style={{
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                Veg
                              </h3>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <div className="row d-flex justify-content-center">
                              <img
                                onClick={() => {
                                  setselectedCategory("non veg");
                                }}
                                src={chickenleg}
                                alt="chicken-leg"
                                className={
                                  selectedCategory === "non veg"
                                    ? "category-img isSelected "
                                    : "category-img !isSelectedVeg"
                                }
                              />
                            </div>
                            <div className="row">
                              <h3
                                style={{
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                Non-Veg
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-10 itemListDiv">
                        <form>
                          <div className="row mb-3">
                            {startersData
                              .filter(
                                (item) => item.subCategory === selectedCategory
                              )
                              .map((val, idx) => {
                                return (
                                  <div
                                    key={idx}
                                    className="col-md-6 col-lg-4 mt-3"
                                  >
                                    <div
                                      className="flip-card-order"
                                      style={{ width: "75%" }}
                                    >
                                      <div className="flip-card-order-inner">
                                        <div
                                          className="flip-card-order-front"
                                          id="style-test-id"
                                          style={{
                                            backgroundColor: "white",
                                            color: "black",
                                            borderRadius: "10px",
                                            padding: "10px",
                                          }}
                                        >
                                          <div className="card-offer-order">
                                            <p className="mb-0">20% off</p>
                                          </div>

                                          <img
                                            className="items-img mt-4 rounded-circle"
                                            src={val.imgPath}
                                            width="64px"
                                            height="64px"
                                          />
                                          <div className="col-md-12 d-flex justify-content-center mt-2">
                                            <p
                                              className="m-0 text-bold"
                                              style={{ fontSize: 16 }}
                                            >
                                              {val.name}
                                            </p>
                                          </div>
                                          <div className="col-md-12">
                                            <p
                                              className="item-discription m-0 "
                                              style={{
                                                color: "#858585",
                                                fontSize: 10,
                                              }}
                                            >
                                              {val.description}
                                            </p>
                                            <p className="item-price m-0 fs-16 mt-2">
                                              <span>
                                                {formatIndianCurrency(
                                                  val.price
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flip-card-order-back">
                                          <div className="item-count">
                                            <div className="input-group mb-3">
                                              <span
                                                className="input-group-text"
                                                style={{
                                                  cursor: "pointer",
                                                  textAlign: "center",
                                                }}
                                                onClick={() => {
                                                  changeDishCount(
                                                    val,
                                                    "decrement",
                                                    "starter"
                                                  );
                                                }}
                                              >
                                                -
                                              </span>
                                              <input
                                                type="text"
                                                className="form-control input-text-field inputOrder "
                                                readOnly
                                                // formControlName="foodCount"
                                                value={val.count}
                                                disabled
                                              />
                                              <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  changeDishCount(
                                                    val,
                                                    "increment",
                                                    "starter"
                                                  );
                                                }}
                                              >
                                                +
                                              </span>
                                            </div>
                                          </div>

                                          <div className="col-md-12 d-flex justify-content-center">
                                            <p className="m-0 text-bold fs-18">
                                              {val.name}
                                            </p>
                                          </div>
                                          <div className="col-md-12">
                                            <p className="item-discription m-0 fs-10 mt-2 mb-2">
                                              {val.description}
                                            </p>
                                            <p className="item-price m-0">
                                              <span className="text-white fs-16">
                                                {formatIndianCurrency(
                                                  val.price
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tab 2 */}
                <div
                  className={`tab-pane ${
                    activeTab === "tab2" ? "show active" : ""
                  }`}
                  id="tab2"
                >
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-2 category-col">
                        <div className="row">
                          <div className="col-md-11">
                            <div className="row d-flex justify-content-center">
                              <img
                                onClick={() => {
                                  setselectedCategory("veg");
                                }}
                                src={dish}
                                alt="dish"
                                className={
                                  selectedCategory === "veg"
                                    ? "category-img isSelected "
                                    : "category-img !isSelectedVeg"
                                }
                              />
                            </div>
                            <div className="row">
                              <h3
                                style={{
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                Veg
                              </h3>
                            </div>
                          </div>
                          <div className="col-md-11">
                            <div className="row d-flex justify-content-center">
                              <img
                                onClick={() => {
                                  setselectedCategory("non veg");
                                }}
                                src={chickenleg}
                                alt="chicken-leg"
                                className={
                                  selectedCategory === "nonveg"
                                    ? "category-img isSelected "
                                    : "category-img !isSelectedVeg"
                                }
                              />
                            </div>
                            <div className="row">
                              <h3
                                style={{
                                  textAlign: "center",
                                  padding: "0px",
                                  fontSize: "16px",
                                  fontWeight: 500,
                                  cursor: "pointer",
                                }}
                              >
                                Non-Veg
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-10 itemListDiv">
                        <form>
                          <div className="row mb-3">
                            {mainCourseData
                              .filter(
                                (item) => item.subCategory === selectedCategory
                              )
                              .map((val, idx) => {
                                return (
                                  <div className="col-md-6 col-lg-4 mt-3">
                                    <div
                                      className="flip-card-order"
                                      style={{ width: "75%" }}
                                    >
                                      <div className="flip-card-order-inner">
                                        <div className="flip-card-order-front">
                                          <div className="card-offer-order">
                                            <p className="mb-0">20% off</p>
                                          </div>

                                          <img
                                            className="items-img mt-4 rounded-circle"
                                            src={val.imgPath}
                                            width="64px"
                                            height="64px"
                                          />
                                          <div className="col-md-12 d-flex justify-content-center mt-2">
                                            <p
                                              className="m-0 text-bold"
                                              style={{ fontSize: 16 }}
                                            >
                                              {val.name}
                                            </p>
                                          </div>
                                          <div className="col-md-10">
                                            <p
                                              className="item-discription m-0  mb-2"
                                              style={{
                                                color: "#858585",
                                                fontSize: 10,
                                              }}
                                            >
                                              {val.description}
                                            </p>
                                            <p className="item-price m-0 fs-16">
                                              <span>
                                                {formatIndianCurrency(
                                                  val.price
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                        <div className="flip-card-order-back">
                                          <div className="item-count">
                                            <div className="input-group mb-3">
                                              <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  changeDishCount(
                                                    val,
                                                    "decrement",
                                                    "main course"
                                                  );
                                                }}
                                              >
                                                -
                                              </span>
                                              <input
                                                type="text"
                                                className="form-control input-text-field inputOrder"
                                                readOnly
                                                // formControlName="foodCount"
                                                value={val.count}
                                              />
                                              <span
                                                className="input-group-text"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => {
                                                  changeDishCount(
                                                    val,
                                                    "increment",
                                                    "main course"
                                                  );
                                                }}
                                              >
                                                +
                                              </span>
                                            </div>
                                          </div>

                                          <div className="col-md-12 d-flex justify-content-center">
                                            <p className="m-0 text-bold fs-18">
                                              {val.name}
                                            </p>
                                          </div>
                                          <div className="col-md-12">
                                            <p className="item-discription m-0 fs-16 mt-2 mb-2">
                                              {val.description}
                                            </p>
                                            <p className="item-price m-0">
                                              <span className="text-white fs-18">
                                                {formatIndianCurrency(
                                                  val.price
                                                )}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tab3 */}

                <div
                  className={`tab-pane ${
                    activeTab === "tab3" ? "show active" : ""
                  }`}
                  id="tab3"
                >
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12 itemListDiv pr-0">
                        <form>
                          <div className="row mb-3">
                            {desertsData.map((val, idx) => {
                              return (
                                <div className="col-md-6 col-lg-4 mt-3">
                                  <div
                                    className="flip-card-order"
                                    style={{ width: "75%" }}
                                  >
                                    <div className="flip-card-order-inner">
                                      <div className="flip-card-order-front">
                                        <div className="card-offer-order">
                                          <p className="mb-0">20% off</p>
                                        </div>

                                        <img
                                          className="items-img mt-4 rounded-circle"
                                          src={val.imgPath}
                                          width="64px"
                                          height="64px"
                                        />
                                        <div className="col-md-12 d-flex justify-content-center mt-2">
                                          <p
                                            className="m-0 text-bold fs-18"
                                            style={{
                                              fontSize: 16,
                                            }}
                                          >
                                            {val.name}
                                          </p>
                                        </div>
                                        <div className="col-md-12">
                                          <p
                                            className="item-discription m-0 fs-10 mt-2 mb-2"
                                            style={{
                                              color: "#858585",
                                              fontSize: 10,
                                            }}
                                          >
                                            {val.description}
                                          </p>
                                          <p className="item-price m-0 fs-18">
                                            <span>
                                              {formatIndianCurrency(val.price)}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flip-card-order-back">
                                        <div className="item-count">
                                          <div className="input-group mb-3">
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "decrement",
                                                  "deserts"
                                                );
                                              }}
                                            >
                                              -
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control input-text-field inputOrder "
                                              readOnly
                                              // formControlName="foodCount"
                                              value={val.count}
                                            />
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "increment",
                                                  "deserts"
                                                );
                                              }}
                                            >
                                              +
                                            </span>
                                          </div>
                                        </div>
                                        <img
                                          className="items-img mt-4"
                                          src={val.imgPath}
                                        />
                                        <div className="col-md-12 d-flex justify-content-center">
                                          <h3 className="m-0 text-bold">
                                            {val.name}
                                          </h3>
                                        </div>
                                        <div className="col-md-12">
                                          <p className="item-discription m-0">
                                            {val.description}
                                          </p>
                                          <p className="item-price m-0">
                                            <span>
                                              {formatIndianCurrency(val.price)}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flip-card-order-back">
                                        <div className="item-count">
                                          <div className="input-group mb-3">
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "decrement",
                                                  "deserts"
                                                );
                                              }}
                                            >
                                              -
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control input-text-field inputOrder"
                                              readOnly
                                              // formControlName="foodCount"
                                              value={val.count}
                                            />
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "increment",
                                                  "deserts"
                                                );
                                              }}
                                            >
                                              +
                                            </span>
                                          </div>
                                        </div>

                                        <div className="col-md-12 d-flex justify-content-center">
                                          <p className="m-0 text-bold fs-18">
                                            {val.name}
                                          </p>
                                        </div>
                                        <div className="col-md-12">
                                          <p className="item-discription m-0 fs-10 mt-2 mb-2">
                                            {val.description}
                                          </p>
                                          <p className="item-price m-0">
                                            <span className="text-white fs-18">
                                              {formatIndianCurrency(val.price)}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/* tab 4 */}
                <div
                  className={`tab-pane ${
                    activeTab === "tab4" ? "show active" : ""
                  }`}
                  id="tab4"
                >
                  <div className="container-fluid">
                    <div className="row mt-4">
                      <div className="col-md-12 itemListDiv pr-0">
                        <form>
                          <div className="row mb-3">
                            {beverageData.map((val, idx) => {
                              return (
                                <div
                                  key={idx}
                                  className="col-md-6 col-lg-4 mt-3"
                                >
                                  <div
                                    className="flip-card-order"
                                    style={{ width: "75%" }}
                                  >
                                    <div className="flip-card-order-inner">
                                      <div className="flip-card-order-front">
                                        <div className="card-offer-order">
                                          <p className="mb-0">20% off</p>
                                        </div>

                                        <img
                                          className="items-img mt-4 rounded-circle"
                                          src={val.imgPath}
                                          width="64px"
                                          height="64px"
                                        />
                                        <div className="col-md-12 d-flex justify-content-center">
                                          <p
                                            className="m-0 text-bold mt-2"
                                            style={{ fontSize: 16 }}
                                          >
                                            {val.name}
                                          </p>
                                        </div>
                                        <div className="col-md-12">
                                          <p
                                            className="item-discription m-0 "
                                            style={{
                                              color: "#858585",
                                              fontSize: 10,
                                            }}
                                          >
                                            {val.description}
                                          </p>
                                          <p className="item-price m-0 fs-18 mt-2">
                                            <span>
                                              {formatIndianCurrency(val.price)}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="flip-card-order-back">
                                        <div className="item-count">
                                          <div className="input-group mb-3">
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "decrement",
                                                  "breverage"
                                                );
                                              }}
                                            >
                                              -
                                            </span>
                                            <input
                                              type="text"
                                              className="form-control input-text-field inputOrder"
                                              readonly
                                              // formControlName="foodCount"
                                              value={val.count}
                                            />
                                            <span
                                              className="input-group-text"
                                              style={{ cursor: "pointer" }}
                                              onClick={() => {
                                                changeDishCount(
                                                  val,
                                                  "increment",
                                                  "breverage"
                                                );
                                              }}
                                            >
                                              +
                                            </span>
                                          </div>
                                        </div>

                                        <div className="col-md-12 d-flex justify-content-center">
                                          <p className="m-0 text-bold fs-18">
                                            {val.name}
                                          </p>
                                        </div>
                                        <div className="col-md-12">
                                          <p className="item-discription m-0 fs-10 mt-2 mb-2">
                                            {val.description}
                                          </p>
                                          <p className="item-price m-0">
                                            <span className="text-white fs-18">
                                              {formatIndianCurrency(val.price)}
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <OrderBilling
            title="Preview Order"
            cartItemsData={cartItemsData}
            changeDishCount={changeDishCount}
          />
        </div>
      </div>

      <div>
        {showLoginPrompt && (
          <div
            className="modal-backdrop fade show"
            style={{ display: "block" }}
          ></div>
        )}

        <div
          className={`modal fade ${showLoginPrompt ? "show" : ""}`}
          tabIndex="-1"
          role="dialog"
          style={{ display: showLoginPrompt ? "block" : "none" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <div className=" fs-24 text-center">
                  Please login to continue ordering
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="btn btn-secondary me-4"
                    onClick={() => {
                      setshowLoginPrompt(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // OLD
  );
}

export default OrdersPage;
