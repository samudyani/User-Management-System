import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import UserDetails from './Components/userDetails/UserDetails';
import Nav from './Components/Nav/Nav';
import AddUser from './Components/addUser/AddUser';
import UpdateUser from './Components/UpdateUser/UpdateUser';
import Login from './Components/Login/Login';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    const adminStatus = localStorage.getItem("isAdmin");
    setIsAdmin(adminStatus === "true");
  }, []);


  return (
    <div>
      <Nav isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <Routes>
        <Route path="/" element={<Login setIsAdmin={setIsAdmin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addUser" element={isAdmin ? <AddUser /> : <Navigate to="/login" />} />
        <Route path="/userDetails" element={isAdmin ? <UserDetails /> : <Navigate to="/login" />} />
        <Route path="/userDetails/:id" element={isAdmin ? <UpdateUser /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
