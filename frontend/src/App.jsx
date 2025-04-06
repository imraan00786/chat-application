// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'; // placeholder
import ProtectedRoute from './components/ProtectedRoute'; // to be created
import GroupList from './pages/GroupList';
import GroupDetails from './pages/GroupDetails';
import CreateGroup from './pages/CreateGroup';



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/groups" element={<ProtectedRoute><GroupList /></ProtectedRoute>} />
          <Route path="/groups/create" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
          <Route path="/groups/:groupId" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
