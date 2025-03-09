import React, { useEffect, useState } from 'react';
import axios from "axios";
import User from '../User/User';
import './userDetails.css'; 



const fetchHandler = async (user) => {
  console.log(user)
  return await axios.get(`http://localhost:5000/users?name=${user}`).then((res) => res.data);
};

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHandler = async (user) => {
      try {
          const response = await axios.get(`http://localhost:5000/users?name=${user}`);
          setUsers(response.data.users);
      } catch (error) {
          console.error('Error fetching users:', error);
      }
  };

  useEffect(() => {
      fetchHandler(searchTerm);
  }, [searchTerm]);


 return (
  <div className="user-details">
  <h1 className="user-title">User Details </h1>
  <div className="search-container">
      <input
          type="text"
          name="search"
          placeholder="Search User Details"
          onChange={(e) => setSearchTerm(e.target.value)}
      />
  </div>

    {noResults && <p>No users found</p>}
    
    <div className="user-list">
      {users && users.map((user, i) => (
        <div key={i}>
          <User user={user} />
        </div>
      ))}
    </div>
  </div>
);

}

export default UserDetails;
