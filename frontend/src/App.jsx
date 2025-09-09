// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import RemindersPage from './pages/RemindersPage';
import CaretakerPage from './pages/CaretakerPage';
import Layout from './components/Layout';

function App() {
  // You can add state management for user and token here later
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes wrapped in a layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reminders" element={<RemindersPage />} />
          <Route path="/caretaker" element={<CaretakerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;