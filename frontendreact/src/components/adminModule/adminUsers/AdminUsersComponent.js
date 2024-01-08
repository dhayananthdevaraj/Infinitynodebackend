import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import TableComponent from '../../atoms/TableComponent/TableComponent';
import rating from '../../../assets/Rating.svg';
import './users.component.css';
import { getRatingInfo, getUsersInfo } from '../../../services/adminModule';
import { setusersData } from '../../../toolkit/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function AdminUsersComponent() {
	const dispatch=useDispatch();
	const usersData = useSelector((state) => state?.user?.usersData);
	
	// const [usersData, setusersData] = useState<any[]>([]);
	const [searchText, setSearchText] = useState('');
	const [filteredUsersData, setFilteredUsersData] = useState([]);
	const [isPopupOpen, setIsPopupOpen] = useState(false);
const [selectedUserRating, setSelectedUserRating] = useState(null);
const[allRatingInfo,setRatingInfo]=useState([])
	useEffect(() => {
		getAllUsers();
    getAllRatingsfun();

	}, []);


  async function getAllRatingsfun()
  {
		const { data, error } = await getRatingInfo();

if(data)
{
  console.log("daata is rating",data);
  setRatingInfo(data?.data)
}
  }

	const getAllUsers = async () => {
		const { data, error } = await getUsersInfo();
    console.log("bbbbbbbb",data);
		if (data) {
			if (data.error) {
				//error
			} else {
				let tempArray = [];
				data?.data?.map((val) => {
					tempArray.push({
						id: val._id,
						col1: val.name,
						col2: val.email,
						col3: val.phoneNo,
						col4: (
							<>
								{val?.rating && <img src={rating} alt="rating" />}
							{val?.rating === undefined||null ? 'NA' : val?.rating}
							</>
						),
						col5: val?.feedback=== undefined||null ? 'NA' : val?.feedback,
					});
				});
				dispatch(setusersData([...tempArray]))
				setFilteredUsersData([...tempArray]);
			}
		} else if (error) {
		}
	};

  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredUsersData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(usersData?.length / itemsPerPage);

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
    const startPage = Math.max(1, currentPage - Math.floor(numVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + numVisiblePages - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };


  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    filterData(text);
  };

  const filterData = (filter) => {
    const filteredData = usersData?.filter(
      (item) =>
        item.col1.toLowerCase().includes(filter.toLowerCase()) ||
        item.col2.toLowerCase().includes(filter.toLowerCase()) ||
        item.col3.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsersData(filteredData);
  };

  // const handleSearch = () => {
  // 	filterData(searchText);
  // };
  const RatingPopup = ({ onClose }) => {
    // Assuming you have allRatingInfo as an array of rating details
    const userRatings = allRatingInfo.filter((rating) => rating.customerId === selectedUserRating);
  
    if(userRatings.length)
    {
      return (
<div className="rating-popup">
                <button onClick={onClose}>X</button>

        <h4>Rating Details</h4>

        <table>
          <thead>
            <tr>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {userRatings.map((ratingDetails) => (
              <tr key={ratingDetails._id}>
                <td>{ratingDetails?.rating}</td>
                <td>{ratingDetails?.feedback}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
            }
            else{
              return(
                <div className="rating-popup">
                 <button onClick={onClose}>X</button>
<br/>
                 <h5> No data found</h5>
                  </div>
              )
            }
  };
  

  return (
   <div className={`parentRating `}>

     <div className={`listmenu ${isPopupOpen ? 'overlay' : ''}`}>
      <div className="container-fluid">
        <div className="card cardUsers p-2">
          <div className="d-flex align-items-center justify-content-between ">
            <div className="p-3">
              <h2 className="fw-bold mb-0">Users</h2>
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {/* <button className="search-button" onClick={handleSearch}>
									<i className="fas fa-search search-icon"></i>
								</button> */}
              </div>
            </div>
          </div>

          {usersData?.length > 0 ?(<div className="">
            <div className="dashboard-table"></div>
            {/* <TableComponent
              tableColumns={USER_DETAILS_FOR_TABLE}
              tableRows={usersData}
              tableHeight={350}
            /> */}
            <table className="table ">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>PhoneNo</th>
                  <th>Action</th>
                  {/* <th>Rating</th>
                  <th>Feedback</th> */}
                </tr>
              </thead>
              <tbody>
                {slicedData.map((item, index) => (
                  <tr>
                    <td>{item.col1}</td>
                    <td>{item.col2}</td>
                    <td>{item.col3}</td>
                    <td><button className='ratingButton' onClick={()=>{
                      console.log("item",item);
                      setSelectedUserRating(item.id)
                      setIsPopupOpen(true)
                    }}>View Rating</button></td>
                    {/* <td>{item.col5}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination-wrapper">
              <nav
                aria-label="Page navigation"
                className="pagination-container"
              >
                <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={handleNextPage}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>):(
            <p
              style={{
              textAlign: "center",
              fontWeight: "bolder",
              fontSize: "large",
              }}
              className="table "
              >
                
              No users to display
            </p>
          )}
        </div>
      </div>
    </div>

{isPopupOpen && (
  <RatingPopup
    onClose={() => setIsPopupOpen(false)}
  />
)}

    </div>
  );
}

export default AdminUsersComponent;
