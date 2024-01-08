import React, { useEffect, useState } from "react";
import "./AdminDashboard.component.css";
import {
  getMenuInfo,
  getPaymentInfo,
  getTableInfo,
  getUsersInfo,
} from "../../../services/adminModule";
import { formatIndianCurrency } from "../../../commonFunctions/commonFunction";
function AdminDashboard() {
  const [totalAmount, settotalAmount] = useState(0);
  const [totalUsers, settotalUsers] = useState(0);
  const [totalDishes, settotalDishes] = useState(0);
  const [totalTables, settotalTables] = useState(0);

  useEffect(() => {
    getTheMenu();
    getAllUsers();
    getAllPayment();
    getAllTable();
  }, []);

  // get all menu
  const getAllPayment = async () => {
    const { data, error } = await getPaymentInfo();
    if (data) {
      if (data.error) {
        //error
      } else {
        let tPrice = 0;
        data.data?.forEach((val) => {
          if (val.totalPrice !== undefined) {
              tPrice += val.totalPrice;
          }
      });
        settotalAmount(formatIndianCurrency(tPrice));
      }
    } else if (error) {
    }
  };

  // get all users
  const getAllUsers = async () => {
    const { data, error } = await getUsersInfo();
    if (data) {
      if (data.error) {
        //error
      } else {
        settotalUsers(data?.data.length);
      }
    } else if (error) {
    }
  };

  const getTheMenu = async () => {
    const { data, error } = await getMenuInfo();

    if (data) {
      if (data.error) {
        //error
      } else {
        settotalDishes(data?.data.length);
      }
    } else if (error) {
    }
  };

  const getAllTable = async () => {
    const { data, error } = await getTableInfo();

    if (data) {
      if (data.error) {
        //error
      } else {
        settotalTables(data?.data.length);
      }
    } else if (error) {
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="card dashboard-card p-4">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-2">
              <div
                className={"card p-3 dashboard-content-card"}
                style={{
                  backgroundImage:
                    "linear-gradient(278deg, #dc3586 0%, #000000 120%)",
                  color: "white",
                  padding: " 10px 30px",
                }}
              >
                <div className="card-title">
                  <p className="fs-16">Total Amount</p>
                </div>
                <div>
                  <h1 className="fs-40" style={{ fontWeight: 500 }}>
                    {totalAmount}/-
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-2">
              <div
                className="card p-3 dashboard-content-card"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(239,96,162,1) 15%, rgba(243,155,148,1) 84%)",
                  color: "white",
                  padding: "10px 30px",
                }}
              >
                <div className="card-title">
                  <p className="fs-16">Total No. of Users</p>
                </div>
                <div>
                  <h1 className="fs-40" style={{ fontWeight: 500 }}>
                    {totalUsers}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-2">
              <div
                className="card p-3 dashboard-content-card"
                style={{
                  background:
                    " linear-gradient(180deg, rgba(86,119,192,1) 0%, rgba(112,203,233,1) 100%)",
                  color: "white",
                  padding: "10px 30px",
                }}
              >
                <div className="card-title">
                  <p className="fs-16">Total No. of Dishes</p>
                </div>
                <div>
                  <h1 className="fs-40" style={{ fontWeight: 500 }}>
                    {totalDishes}
                  </h1>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-md-6 col-lg-3 mb-2">
              <div
                className="card p-3 dashboard-content-card"
                style={{
                  background:
                    "linear-gradient(141deg, rgba(5,105,140,1) 0%, rgba(4,63,91,1) 100%)",
                  color: "white",
                  padding: "10px 30px",
                }}
              >
                <div className="card-title">
                  <p className="fs-16">Total No. of Tables</p>
                </div>
                <div>
                  <h1 className="fs-40" style={{ fontWeight: 500 }}>
                    {totalTables}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
