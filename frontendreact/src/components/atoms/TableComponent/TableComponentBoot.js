import React, { useState } from "react";

function TableComponentBoot() {
    const data = [
            {  name: 'John', email: 'john@example.com' },
            { id: 2, name: 'Jane', email: 'jane@example.com' },
            { id: 3, name: 'Bob', email: 'bob@example.com' },
            { id: 4, name: 'Alice', email: 'alice@example.com' },
            { id: 5, name: 'Charlie', email: 'charlie@example.com' },
            { id: 6, name: 'David', email: 'david@example.com' },
            { id: 7, name: 'Eva', email: 'eva@example.com' },
            { id: 8, name: 'Frank', email: 'frank@example.com' },
            { id: 9, name: 'Grace', email: 'grace@example.com' },
            { id: 10, name: 'Hannah', email: 'hannah@example.com' },
            {  name: 'Ivy', email: 'ivy@example.com' },
            { id: 12, name: 'Jack', email: 'jack@example.com' },
            { id: 13, name: 'Karen', email: 'karen@example.com' },
            { id: 14, name: 'Leo', email: 'leo@example.com' },
            { id: 15, name: 'Mia', email: 'mia@example.com' },
            { id: 16, name: 'Noah', email: 'noah@example.com' },
            { id: 17, name: 'Olivia', email: 'olivia@example.com' },
            { id: 18, name: 'Peter', email: 'peter@example.com' },
            { id: 19, name: 'Quinn', email: 'quinn@example.com' },
            { id: 20, name: 'Rachel', email: 'rachel@example.com' },
      ];
    
      const itemsPerPage = 5;
      const [currentPage, setCurrentPage] = useState(1);
    
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const slicedData = data.slice(startIndex, endIndex);
    
      const totalPages = Math.ceil(data.length / itemsPerPage);
    
      const handleChangePage = (newPage) => {
        setCurrentPage(newPage);
      };
    
      return (
        <div className="container mt-4">
          <h1>Bootstrap Table with Pagination</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {slicedData.map((item, index) => (
                <tr key={item.email}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation">
            <ul className="pagination">
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handleChangePage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
    
    );
  };

export default TableComponentBoot;
