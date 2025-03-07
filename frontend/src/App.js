import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Components/Home/Home";
import Nav from './Components/Nav/Nav'; // Import the Nav component
import UserDetails from './Components/User Details/Users';
import AddUser from './Components/AddUsers/AddUser';
import UpdateUser from './Components/updateUser/UpdateUser';

function App() {
  return (
    <div>
      <Nav /> {/* Include the navigation */}
      <Routes>
        {/* Define the routes */}
        <Route path="/" element={<Home />} />
        <Route path="/mainhome" element={<Home />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/updateusers/:id" element={<UpdateUser />} /> 


      </Routes>
    </div>
  );
}

export default App;
