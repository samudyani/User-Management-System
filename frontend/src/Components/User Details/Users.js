import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import User from "../User/User";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './userdetails.css';  // Import the CSS file

const URL = "http://localhost:5000/users"; // Adjust this if needed

// Fetch users from API
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => setUsers(data.users));
  }, []);

  // Reference to the component for PDF capture
  const ComponentsRef = useRef();

  // Function to generate PDF and download automatically
  const handleDownload = () => {
    const input = ComponentsRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert to PNG
      const pdf = new jsPDF("p", "mm", "a4"); // Portrait mode, millimeters, A4 size
      const imgWidth = 250; // Width for A4
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight); // Add image to PDF
      pdf.save("User_Report.pdf"); // Download file
    });
  };

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredUsers = data.users.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUsers(filteredUsers); // Set filtered users
      setNoResults(filteredUsers.length === 0); // Set noResults based on filtered length
    });
  };

  return (
    <div className="container">
      <h1 className="display">User Details Display Page</h1>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search Users"
      />
      <button onClick={handleSearch}>Search</button>

      {noResults ? (
        <div className="no-results">
          <p>No User Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef} className="user-list">
          {users.length > 0 ? (
            users.map((user, i) => (
              <div key={i} className="user-item">
                <User user={user} />
              </div>
            ))
          ) : (
            <p>Loading users...</p>
          )}
        </div>
      )}

      <button onClick={handleDownload} className="download-btn">
        Download PDF
      </button>
    </div>
  );
}

export default Users;
