import React from 'react';
import { Link } from 'react-router-dom';  // Import Link component for navigation
import axios from 'axios';  // Import axios to make HTTP requests
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook for navigation after deletion
import './User.css';  // Import the component's CSS file for styling

function User({ user, onDelete }) {  // Accepting `user` object and `onDelete` function as props
  // Destructuring the `user` object to get individual properties
  const { _id, name, studentID, age, email, phone, guardianName, guardianPhone, address, stream, gender, role } = user;

  const navigate = useNavigate();  // Initialize navigation hook

  // Handler function for deleting a user
  const deleteHandler = async () => {
    // Prompt the user for confirmation before deleting
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;  // Stop the function if the user cancels
    }
    try {
      // Send DELETE request to backend to delete the user by ID
      await axios.delete(`http://localhost:5000/users/${_id}`);

      // If `onDelete` prop is passed, call it to update the parent state
      if (onDelete) {
        onDelete(_id);  // Remove the deleted user from the state in the parent component
      }

      // Navigate to the '/userdetails' route after successful deletion
      navigate("/userdetails");

      // Optionally reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      // If an error occurs, log it and show an alert
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  // JSX rendering the user details in a table format
  return (
    <div className="user-container">
      <table className="user-table">
        <tbody>
          <tr>
            <td><strong>User name:</strong></td>
            <td>{name}</td>
          </tr>
          <tr>
            <td><strong>ID:</strong></td>
            <td>{_id}</td>
          </tr>
          <tr>
            <td><strong>Student ID:</strong></td>
            <td>{studentID}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{age}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{email}</td>
          </tr>
          <tr>
            <td><strong>Phone:</strong></td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td><strong>Guardian Name:</strong></td>
            <td>{guardianName}</td>
          </tr>
          <tr>
            <td><strong>Guardian Phone:</strong></td>
            <td>{guardianPhone}</td>
          </tr>
          <tr>
            <td><strong>Address:</strong></td>
            <td>{address}</td>
          </tr>
          <tr>
            <td><strong>Stream:</strong></td>
            <td>{stream}</td>
          </tr>
          <tr>
            <td><strong>Gender:</strong></td>
            <td>{gender}</td>
          </tr>
          <tr>
            <td><strong>Role:</strong></td>
            <td>{role}</td>
          </tr>
        </tbody>
      </table>
      {/* Link to update user details */}
      <Link to={`/updateusers/${_id}`} className="update-btn">UPDATE</Link>
      
      {/* Button to trigger user deletion */}
      <button onClick={deleteHandler} className="delete-btn">DELETE</button>
    </div>
  );
}

export default User;  // Export the component to use it elsewhere in the application
