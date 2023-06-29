import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://reqres.in/api/users?page=2');
      setUsers(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`app`}> 
      <h1>User List</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by first name"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <div>
        {filteredUsers.map(user => (
          <div key={user.id} className="user-item">
            <div className="user-avatar">
              <span className="user-id">{user.id}</span>
              <img src={user.avatar} alt={user.first_name} />
            </div>
            <span>{user.first_name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;