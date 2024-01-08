import { DataGrid } from "@mui/x-data-grid";
import React, { Suspense, useEffect, useState, lazy } from "react";
import TableComponent from "../../atoms/TableComponent/TableComponent";
import rating from "../../../assets/Rating.svg";
import "./menu.component.css";
import { editMenuInfo, getMenuInfo } from "../../../services/adminModule";
import { formatIndianCurrency } from "../../../commonFunctions/commonFunction";
import { useToasts } from "react-toast-notifications";
// import MenuModal from "../../atoms/ModalComponent/MenuModal";
const MenuModal = lazy(() => import("../../atoms/ModalComponent/MenuModal"));
function AdminMenuComponent() {
  const [menuData, setmenuData] = useState([]);
  const [selectedMenuItem, setselectedMenuItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredMenuData, setFilteredMenuData] = useState([]);

  const { addToast } = useToasts();
  useEffect(() => {
    getTheMenu();
}, [showModal]);

  useEffect(() => {
    if (Object.keys(selectedMenuItem).length > 0) {
      editMenu(selectedMenuItem);
    }
  }, [selectedMenuItem]);

  useEffect(() => {
    setFilteredMenuData(menuData);
  }, [menuData]);

  let selectedMenu = (selectMenu) => {
    if (selectMenu.status.toLowerCase() === "available") {
      setselectedMenuItem({
        _id: selectMenu._id,
        name: selectMenu.name,
        category: selectMenu.category,
        status: "unavailable",
        price: selectMenu.price,
      });
    } else if (selectMenu.status.toLowerCase() === "unavailable") {
      setselectedMenuItem({
        _id: selectMenu._id,
        name: selectMenu.name,
        category: selectMenu.category,
        status: "available",
        price: selectMenu.price,
      });
    }
  };

  const getTheMenu = async () => {
    const { data, error } = await getMenuInfo();

    if (data) {
      if (data.error) {
        //error
      } else {
        let tempArray = [];
        data?.data.map((val) => {
          if (
            val.name.toLowerCase().includes(searchText.toLowerCase()) ||
            val.category.toLowerCase().includes(searchText.toLowerCase()) ||
            val.price.toString().includes(searchText.toLowerCase()) ||
            val.status.toLowerCase().includes(searchText.toLowerCase())
          ) {
            tempArray.push({
              id: val._id,
              col1: val.name,
              col2: val.category,
              col3: formatIndianCurrency(val.price),
              col4: (
                <div className="d-flex  align-items-center justify-content-center ">
                  <div className=" toggle markasalloted ">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={val.status === "available" ? true : false}
                        onChange={() => {
                          selectedMenu(val);
                        }}
                      />
                      <span className="sliderT round"></span>
                    </label>
                  </div>
                  <label
                    style={{
                      color: val.status === "unavailable" ? "#D11C00" : "",
                      width: "35%",
                      paddingLeft: "5%",
                    }}
                  >
                    {val.status === "available" ? "Available" : "Unavailable"}
                  </label>
                </div>
              ),
            });
          }
        });
        setmenuData([...tempArray]);
        setFilteredMenuData([...tempArray]);
      }
    } else if (error) {
    }
  };

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterData(text);
  };

  // const handleSearch = () => {
  // 	filterData(searchText);
  // };
  const filterData = (filter) => {
    const filteredData = menuData.filter((item) => {
      const itemText =
        item.col1 + item.col2 + item.col3 + item.col4 + item.col5;
      const filterText = filter.toLowerCase();

      // Check if the itemText contains the filterText
      return itemText.toLowerCase().includes(filterText);
    });

    setFilteredMenuData(filteredData);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const editMenu = async (payload) => {
    const { data, error } = await editMenuInfo(payload);
    if (data) {
      if (data.error) {
        //error
        addToast(data.message, { appearance: "error" });
      } else {
        getTheMenu();
        addToast(data.message, { appearance: "success" });
      }
    } else if (error) {
    }
  };

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredMenuData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredMenuData.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const numVisiblePages = 3; // Set the number of visible page numbers
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getVisiblePages = () => {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(numVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + numVisiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="listmenu">
      <div className="container-fluid">
        <div className="card cardMenu p-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="p-3">
              <h2 className="fw-bold mb-0 fs-24">Menu Items</h2>
            </div>

            <div className="d-flex align-items-center flex-grow-1 justify-content-center">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            </div>
            <div style={{ marginLeft: "auto", marginRight: "25px" }}>
              {/* Add Button to open the MenuModal */}
              <button
                className="btn btn-warning"
                id="lazy-load-test"
                onClick={() => setShowModal(true)}
              >
                + New Item
              </button>
            </div>
            <div></div>
          </div>

          <div className="">
            <div className="dashboard-table"></div>
            <table className="table ">
              <thead>
                <tr>
                  <th style={{ width: "30%" }}>Item</th>
                  <th style={{ width: "20%" }}>Category</th>
                  <th style={{ width: "20%", paddingLeft: "5%" }}>Price</th>
                  <th style={{ textAlign: "center", width: "30%" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {slicedData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.col1}</td>
                    <td>{item.col2}</td>
                    <td style={{ paddingLeft: "5%" }}>{item.col3}</td>
                    <td>{item.col4}</td>
                    {/* <td>{item.col5}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-wrapper">
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end">
                  <li
                    className={`page-item ${
                      currentPage === 1 ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={handlePrevPage}>
                      Pre
                    </button>
                  </li>
                  {getVisiblePages().map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handleChangePage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li
                    className={`page-item ${
                      currentPage === totalPages ? "disabled" : ""
                    }`}
                  >
                    <button className="page-link" onClick={handleNextPage}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Suspense fallback={<h1>Loading</h1>}>
          <MenuModal
            onClose={() => setShowModal(false)}
            getTheMenu={getTheMenu}
          />
        </Suspense>
      )}
    </div>
  );
}

export default AdminMenuComponent;
