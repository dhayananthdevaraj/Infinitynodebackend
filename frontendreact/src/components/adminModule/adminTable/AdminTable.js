import React, { useEffect, useState } from "react";
import "./tables.component.css";
import adminflowchair from "../../../assets/adminflowchair.svg";

import {
  addTableInfo,
  editTableInfo,
  getTableInfo,
} from "../../../services/adminModule";
import { useToasts } from "react-toast-notifications";
import { useQuery } from "@tanstack/react-query";

function AdminTable() {
  const [tableData, settableData] = useState([]);
  const [selectedTable, setselectedTable] = useState({});
  const { addToast } = useToasts();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (Object.keys(selectedTable).length > 0) {
      editTableStatus(selectedTable);
    }
  }, [selectedTable]);

  const getAllTable = async () => {
    const { data, error } = await getTableInfo();

    if (data) {
      if (data.error) {
        //error
      } else {
        settableData([...data.data]);
      }
    } else if (error) {
    }

    return data.data;
  };
  const { data, error, isLoading } = useQuery([], getAllTable);

  const handleisAvailableChange = (index) => {
    const updatedtableData = [...tableData];
    updatedtableData[index].booked = !updatedtableData[index].booked;
    settableData(updatedtableData);
    setselectedTable(updatedtableData[index]);
  };

  const handleisAllotedChange = (index) => {
    const updatedtableData = [...tableData];
    updatedtableData[index].alloted = !updatedtableData[index].alloted;
    settableData(updatedtableData);
    setselectedTable(updatedtableData[index]);
  };

  const handleisServedChange = (index) => {
    const updatedtableData = [...tableData];
    updatedtableData[index].served = !updatedtableData[index].served;
    settableData(updatedtableData);
    setselectedTable(updatedtableData[index]);
  };

  const editTableStatus = async (selectTable) => {
    let payload = {
      _id: selectTable._id,
      isAvailable: true,
      booked: selectTable.booked,
      alloted: selectTable.alloted,
      served: selectTable.served,
    };
    const { data, error } = await editTableInfo(payload);
    console.log("editdata", data);
    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        //toast
        getAllTable();
        addToast(data.message, { appearance: "success" });
      }
    } else if (error) {
      addToast(error.message, { appearance: "error" });
    }
  };

  let addNewTable = async () => {
    let payload = {
      tableNo: `${tableData.length + 1}`,
      isAvailable: true,
      alloted: false,
      served: false,
      booked: false,
    };

    const { data, error } = await addTableInfo(payload);

    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        //toast
        getAllTable();
        addToast(data.message, { appearance: "success" });
      }
    } else if (error) {
      addToast(error.message, { appearance: "error" });
    }

  };
  return (
    <div className="tables">
      <div className="container-fluid">
        <div className="card cardTable">
          <div className="title d-flex align-items-center justify-content-between p-3">
            <h2 className="fw-bold mb-0 fs-24">Tables</h2>
            <div className="text-center col-md-2">
              <button
                className="button addbutton"
                onClick={async() => {
                  setIsAdding(true)

                  await addNewTable();
                  await new Promise((resolve) => setTimeout(resolve, 1000));
                  setIsAdding(false)

                }}
                disabled={isAdding}

              >
                <i className="fa fa-plus" aria-hidden="true"></i> Add New Table
              </button>
            </div>
          </div>
          <div className="p-3">
            <div className="row d-flex justify-content-end"></div>
            <div className="container-fluid text-center row">
              <div className="col-md-12">
                <form>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-2 g-lg-3">
                    {tableData.map((val, idx) => {
                      return (
                        <div className="col">
                          <div className="p-3">
                            <div className="number text-center">
                              <p className="fw-bold fs-30">{val?.tableNo[0]}</p>
                            </div>
                            <div>
                              <img
                                src={adminflowchair}
                                alt="adminflowchair"
                                className="w-60"
                              />
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-3 ">
                              <label style={{ fontSize: 14 }}>
                                Mark as Un-Available
                              </label>
                              <div
                                className="toggle markasunavailable"
                                style={{ zIndex: 1 }}
                              >
                                <label className="switch">
                                  <input
                                    type="checkbox"
                                    checked={val.booked}
                                    onChange={() => {
                                      handleisAvailableChange(idx);
                                    }}
                                  />
                                  <span className="sliderT round"></span>
                                </label>
                              </div>
                            </div>
                            {val.booked && (
                              <>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                  <label style={{ fontSize: 14 }}>
                                    Mark as Alloted
                                  </label>

                                  <div className="toggle markasalloted ">
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        checked={val.alloted}
                                        onChange={() => {
                                          handleisAllotedChange(idx);
                                        }}
                                      />
                                      <span className="sliderT round"></span>
                                    </label>
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mt-3">
                                  <label style={{ fontSize: 14 }}>Served</label>
                                  <div className="toggle markaserved">
                                    <label className="switch">
                                      <input
                                        type="checkbox"
                                        checked={val.served}
                                        onChange={() => {
                                          handleisServedChange(idx);
                                        }}
                                      />
                                      <span className="sliderT round"></span>
                                    </label>
                                  </div>
                                </div>
                              </>
                            )}
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
  );
}

export default AdminTable;
