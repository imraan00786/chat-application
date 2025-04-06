import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const searchUsers = async (query) => {
  const res = await axios.get(baseURL + `/users/search?query=${query}`);
  return res.data;
};

const UserSearch = ({ onSelectUser }) => {
  const [query, setQuery] = useState('');
  const { data: users = [], refetch } = useQuery(['searchUsers', query], () => searchUsers(query), {
    enabled: !!query,
  });

  const handleChange = (e) => {
    setQuery(e.target.value);
    refetch();
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleChange} placeholder="Search users..." />
      <ul>
        {users.map(user => (
          <li key={user._id} onClick={() => onSelectUser(user)}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
