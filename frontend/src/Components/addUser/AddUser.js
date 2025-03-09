import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import './AddUser.css';  // Import the CSS file

function AddUser() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
    stream: "",
    gender: "",
    role: "Student"
  });

  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    age: '',
    guardianPhone: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
    switch (name) {
      case 'email':
        setErrors({
          ...errors,
          email: value && !validateEmail(value) ? 'Please enter a valid email address.' : '',
        });
        break;
      case 'phone':
        setErrors({
          ...errors,
          phone: value && !validatePhone(value) ? 'Phone number must be 10 digits.' : '',
        });
        break;
       case 'guardianPhone':
        setErrors({
          ...errors,
          guardianPhone: value && !validatePhone(value) ? 'Phone number must be 10 digits.' : '',
        });
        break;
      case 'age':
        setErrors({
          ...errors,
          age: value && !validateAge(value) ? 'Age must be between 16 and 50.' : '',
        });
        break;
      default:
        break;
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const validateAge = (age) => {
    return age >= 16 && age <= 50;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!inputs.email || !validateEmail(inputs.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!inputs.phone || !validatePhone(inputs.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (!inputs.gphone || !validatePhone(inputs.gphone)) {
      newErrors.gphone = 'Phone number must be 10 digits.';
    }
    if (!inputs.age || !validateAge(inputs.age)) {
      newErrors.age = 'Age must be between 16 and 50.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit the form or perform further actions
      console.log('Form submitted successfully!', inputs);
      setErrors({});
    }
    sendRequest().then(() => navigate('/userDetails'));
  };
  
  const sendRequest = async () => {
    await axios.post("http://localhost:5000/users", {
      name: String(inputs.name),
      studentID: String(inputs.studentID),
      age: Number(inputs.age),
      email: String(inputs.email),
      phone: String(inputs.phone),
      guardianName: String(inputs.guardianName),
      guardianPhone: String(inputs.guardianPhone),
      address: String(inputs.address),
      stream: String(inputs.stream),
      gender: String(inputs.gender),
      role: String(inputs.role)
    }).then(res => res.data);
  };

  return (
    <div className="add-user-container">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input 
          type="text" 
          name="name" 
          onChange={handleChange} 
          value={inputs.name} 
          required 
          title="Please enter your full name."
        />

        <label>Email</label>
        <input 
          type="email" 
          name="email" 
          onChange={handleChange} 
          value={inputs.email} 
          required 
          title="Please enter a valid email address."
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}

        <label>Phone</label>
        <input 
          type="text" 
          name="phone" 
          onChange={handleChange} 
          value={inputs.phone} 
          required 
          pattern="[0-9]{10}" 
          title="Phone number must be 10 digits."
        />
        {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}

        <label>Age</label>
        <input 
          type="number" 
          name="age" 
          onChange={handleChange} 
          value={inputs.age} 
          required 
          min="1" 
          title="Please enter a valid age."
        />
       {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}

        <label>Guardian Name</label>
        <input 
          type="text" 
          name="guardianName" 
          onChange={handleChange} 
          value={inputs.guardianName} 
          required 
          title="Guardian's name is required for students under 18."
        />

        <label>Guardian Phone</label>
        <input 
          type="text" 
          name="guardianPhone" 
          onChange={handleChange} 
          value={inputs.guardianPhone} 
          required 
          pattern="[0-9]{10}" 
          title="Guardian's phone number must be 10 digits."
        />
        {errors.guardianPhone && <span style={{ color: 'red' }}>{errors.guardianPhone}</span>}


        <label>Address</label>
        <input 
          type="text" 
          name="address" 
          onChange={handleChange} 
          value={inputs.address} 
          required 
          title="Please enter your address."
        />

        <label>Stream</label>
        <select 
          name="stream" 
          onChange={handleChange} 
          value={inputs.stream} 
          required 
          title="Please select your stream."
        >
          <option value="">Select Stream</option>
          <option value="Science">Science</option>
          <option value="Commerce">Commerce</option>
          <option value="Technology">Technology</option>
        </select>

        <label>Gender</label>
        <select 
          name="gender" 
          onChange={handleChange} 
          value={inputs.gender} 
          required 
          title="Please select your gender."
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Role</label>
        <input 
          type="text" 
          name="role" 
          onChange={handleChange} 
          value={inputs.role} 
          required 
          title="Please enter the user's role."
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddUser;
