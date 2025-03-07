import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './AddUser.css';  // Import the updated CSS file

function AddUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    studentID: "",
    guardianName: "",
    guardianPhone: "",
    stream: "",
    gender: "",
    role: "Student",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate('/userdetails'));
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      name: String(inputs.name),
      email: String(inputs.email),
      phone: String(inputs.phone),
      age: Number(inputs.age),
      address: String(inputs.address),
      studentID: String(inputs.studentID),
      guardianName: String(inputs.guardianName),
      guardianPhone: String(inputs.guardianPhone),
      stream: String(inputs.stream),
      gender: String(inputs.gender),
      role: String(inputs.role),
    }).then(res => res.data);
    navigate('/userDetails');
  };

  return (
    <div className="add-user-container">
      <h1 className="page-heading">Add User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="inline-fields">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required title="Name is required" />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} value={inputs.email} required title="Valid email is required" />
        </div>

        <div className="inline-fields">
          <label>Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            onChange={handleChange} 
            value={inputs.phone} 
            required 
            pattern="^\d{10}$" 
            title="Phone number must be exactly 10 digits"
          />

          <label>Age</label>
          <input 
            type="number" 
            name="age" 
            onChange={handleChange} 
            value={inputs.age} 
            min="16" 
            required 
            title="Age is required and must be at least 16"
          />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required title="Address is required" />
        </div>

        <div className="inline-fields">
          <label>Student ID</label>
          <input type="text" name="studentID" onChange={handleChange} value={inputs.studentID} required title="Student ID is required" />

          <label>Guardian Name</label>
          <input type="text" name="guardianName" onChange={handleChange} value={inputs.guardianName} required title="Guardian Name is required" />
        </div>

        <div className="inline-fields">
          <label>Guardian Phone</label>
          <input 
            type="text" 
            name="guardianPhone" 
            onChange={handleChange} 
            value={inputs.guardianPhone} 
            required 
            pattern="^\d{10}$" 
            title="Guardian's phone number must be exactly 10 digits"
          />

          <label>Stream</label>
          <select name="stream" onChange={handleChange} value={inputs.stream} required title="Please select a stream">
            <option value="">Select Stream</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>

        <div className="inline-fields">

          <label>Gender</label>
          <select name="gender" onChange={handleChange} value={inputs.gender} required title="Please select a gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Role</label>
          <select name="role" onChange={handleChange} value={inputs.role} required title="Please select a role">
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
