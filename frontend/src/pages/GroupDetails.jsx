// src/pages/GroupDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;

const GroupDetails = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [email, setEmail] = useState('');

  const fetchGroup = async () => {
    try {
      const res = await axios.get(baseURL + `/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      });
      setGroup(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddMember = async () => {
    try {
      await axios.post(
        `/api/groups/${groupId}/members`,
        { email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        }
      );
      setEmail('');
      fetchGroup();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding member');
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      await axios.delete(`/api/groups/${groupId}/members/${memberId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
      });
      fetchGroup();
    } catch (err) {
      alert(err.response?.data?.message || 'Error removing member');
    }
  };

  useEffect(() => {
    fetchGroup();
  }, [groupId]);

  if (!group) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{group.name}</h2>
      <h3 className="font-semibold mb-2">Members</h3>
      <ul className="mb-4">
        {group.members.map((member) => (
          <li key={member._id} className="flex justify-between items-center mb-2">
            <span>{member.username} ({member.email})</span>
            <button
              className="text-red-500 hover:underline text-sm"
              onClick={() => handleRemoveMember(member._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          placeholder="User email to add"
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded flex-1"
        />
        <button onClick={handleAddMember} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
    </div>
  );
};

export default GroupDetails;
