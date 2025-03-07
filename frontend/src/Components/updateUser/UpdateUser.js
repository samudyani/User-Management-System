import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import './UpdateUser.css'
import Nav from '../Nav/Nav';

function UpdateUser() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    guardianName: '',
    guardianPhone: '',
    stream: '',
    dateOfBirth: '',
    gender: '',
    role: '',
    studentID: ''
  });

  const history = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        setInputs(res.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        name: inputs.name,
        email: inputs.email,
        phone: inputs.phone,
        age: Number(inputs.age),
        address: inputs.address,
        guardianName: inputs.guardianName,
        guardianPhone: inputs.guardianPhone,
        stream: inputs.stream,
        gender: inputs.gender,
        role: inputs.role,
        studentID: inputs.studentID
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    history('/userdetails');
  };

  return (
    <div>
      <Nav/>
    <div>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="inline-fields">
          <label>Name</label>
          <input type="text" name="name" onChange={handleChange} value={inputs.name} required />

          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} value={inputs.email} required />
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
            title="Phone number must be 10 digits"
          />

          <label>Age</label>
          <input type="number" name="age" onChange={handleChange} value={inputs.age} min="16" max="40" required />

          <label>Address</label>
          <input type="text" name="address" onChange={handleChange} value={inputs.address} required />
        </div>

        <div className="inline-fields">
          <label>Student ID</label>
          <input type="text" name="studentID" onChange={handleChange} value={inputs.studentID} required />

          <label>Guardian Name</label>
          <input type="text" name="guardianName" onChange={handleChange} value={inputs.guardianName} required />
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
            title="Phone number must be 10 digits"
          />

          <label>Stream</label>
          <select name="stream" onChange={handleChange} value={inputs.stream} required>
            <option value="">Select Stream</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Commerce">Commerce</option>
          </select>
        </div>

        <div className="inline-fields">
        

          <label>Gender</label>
          <select name="gender" onChange={handleChange} value={inputs.gender} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Role</label>
          <select name="role" onChange={handleChange} value={inputs.role}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default UpdateUser;
