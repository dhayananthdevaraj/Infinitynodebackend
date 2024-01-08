import React, { useEffect, useState } from "react";
import TableComponent from "../../atoms/TableComponent/TableComponent";
import "./payments.component.css";
import { getPaymentInfo } from "../../../services/adminModule";
import { formatIndianCurrency } from "../../../commonFunctions/commonFunction";
function AdminPaymentsComponent() {
  const [usersData, setusersData] = useState([]);
  const [totalPayment, settotalPayment] = useState(0);

  const [searchText, setSearchText] = useState("");
  const [filteredPaymentData, setFilteredPaymentData] = useState([]);

  useEffect(() => {
    getAllPayment();
  }, []);

  const getAllPayment = async () => {
    const { data, error } = await getPaymentInfo();
    if (data) {
      if (data.error) {
        //error
      } else {
        let tempArray= [];
        let totalPay = 0;
        data?.data.map((val) => {
          tempArray.push({
            id: val._id,
            col1: val.customerName,
            col2: val.email,
            col3: val.phNo,
            col4: `${(val.totalPrice)}/-`,
            col5: (
              <p
                style={{
                  color: val.status === "successful" ? "green" : "",
                }}
              >
                {val.status}
              </p>
            ),
          });
          totalPay += val.totalPrice;
        });
        console.log("aaaaaaaaaaa",totalPay)
        let tPrice=0;
        data.data?.forEach((val) => {

          if (val.totalPrice !== undefined) {
      
              tPrice += val.totalPrice;
      
          }
      
      });
        setusersData([...tempArray]);
        settotalPayment(tPrice);

        setFilteredPaymentData([...tempArray]);
      }
    } else if (error) {
    }
  };

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredPaymentData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredPaymentData.length / itemsPerPage);

  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterData(text);
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

  const filterData = (filter) => {
    const filteredData = usersData.filter(
      (item) =>
        item.col1.toLowerCase().includes(filter.toLowerCase()) ||
        item.col2.toLowerCase().includes(filter.toLowerCase()) ||
        item.col3.toLowerCase().includes(filter.toLowerCase()) ||
        item.col4.toLowerCase().includes(filter.toLowerCase()) ||
        item.col5.props.children.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredPaymentData(filteredData);
  };

  return (
    <div className="listmenu">
      <div className="container-fluid">
        <div className="card cardPC p-2">
          <div className="d-flex align-items-center justify-content-between">
            <div className="p-3">
              <h2 className="fw-bold mb-0 fs-24">Payments</h2>
            </div>
            <div>
              <h2 className="fw-bold mb-0 payment fs-24 ">
                Total Payment : {totalPayment}/-
              </h2>
            </div>
            <div className="d-flex align-items-center">
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
          </div>

          <div className="">
            <div className="dashboard-table"></div>

            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>PhoneNo</th>
                  <th>Spent</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {slicedData.map((item, index) => (
                  <tr>
                    <td>{item.col1}</td>
                    <td>{item.col2}</td>
                    <td>{item.col3}</td>
                    <td>{item.col4}</td>
                    <td>{item.col5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-wrapperPay">
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
    </div>
  );
}

export default AdminPaymentsComponent;
