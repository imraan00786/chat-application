// src/pages/GroupList.jsx
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const GroupList = () => {
  const { AuthContext } = useContext(AuthContext);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(baseURL + '/groups/my', {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        setGroups(res.data);
      } catch (err) {
        console.error('Error fetching groups:', err);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Groups</h2>
      <Link to="/groups/create" className="text-blue-600 mb-4 inline-block">+ Create New Group</Link>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li key={group._id} className="p-4 border rounded shadow-sm hover:bg-gray-100 transition">
            <Link to={`/groups/${group._id}`} className="font-medium text-lg">
              {group.name}
            </Link>
            <p className="text-sm text-gray-500">Members: {group.members.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
