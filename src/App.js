import './App.css';
import React from 'react';
import Home from './components/Home Page/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login Page/Login';
import NotFound from './components/NotFound';
import UserPage from './components/User Page/UserPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Home" element={<ProtectedRoute requiredRole="admin"><Home /></ProtectedRoute>} />
        <Route path="/UserPage" element={<ProtectedRoute requiredRole="user"><UserPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
