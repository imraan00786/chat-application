import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// import AppRoutes from './routes';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';
import './App.css';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
