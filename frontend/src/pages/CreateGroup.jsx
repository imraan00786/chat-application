// src/pages/CreateGroup.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        '/api/groups',
        { name },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        }
      );
      navigate(`/groups/${res.data._id}`);
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating group');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Group</h2>
      <input
        type="text"
        value={name}
        placeholder="Group name"
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <button onClick={handleCreate} className="w-full bg-blue-600 text-white p-2 rounded">
        Create
      </button>
    </div>
  );
};

export default CreateGroup;
