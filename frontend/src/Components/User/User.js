import React, { useState } from 'react';
import './User.css';  // Import the CSS for styling
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function User(props) {
  const { _id, name, studentID, age, email, phone, guardianName, guardianPhone, address, stream, gender, role, isActive } = props.user || {}; 

  const handleUpdateClick = () => {
    console.log("Update user with ID:", _id);
  };


  const history = useNavigate();

  const deleteHandler = async () => {
    await axios.delete(`http://localhost:5000/users/${_id}`)
      .then(res => res.data)
      .then(() => history("/"))
      .then(() => history("/UserDetails"));
  };

  return (
    <div className="user-container">      
      
      <hr />
      
      <table className="user-table">
        <tbody>
          <tr>
            <td className="label">Name:</td>
            <td>{name}</td>
          </tr>
          <tr>
            <td className="label">Student ID:</td>
            <td>{studentID}</td>
          </tr>
          <tr>
            <td className="label">Email:</td>
            <td>{email}</td>
          </tr>
          <tr>
            <td className="label">Phone:</td>
            <td>{phone}</td>
          </tr>
          <tr>
            <td className="label">Age:</td>
            <td>{age}</td>
          </tr>
          <tr>
            <td className="label">Guardian Name:</td>
            <td>{guardianName}</td>
          </tr>
          <tr>
            <td className="label">Guardian Phone:</td>
            <td>{guardianPhone}</td>
          </tr>
          <tr>
            <td className="label">Address:</td>
            <td>{address}</td>
          </tr>
          <tr>
            <td className="label">Stream:</td>
            <td>{stream}</td>
          </tr>
          <tr>
            <td className="label">Gender:</td>
            <td>{gender}</td>
          </tr>
          <tr>
            <td className="label">Role:</td>
            <td>{role}</td>
          </tr>
          
        </tbody>
      </table>

      <Link to={`/UserDetails/${_id}`}>
        Update
      </Link>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}

export default User;