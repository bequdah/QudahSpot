import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ReceiverDashboard from './pages/ReceiverDashboard';
import GiverDashboard from './pages/GiverDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import LoadTester from './pages/LoadTester';
import Navbar from './components/Navbar';

// Placeholder for Profile
const Profile = () => (
  <div className="container py-20 text-center">
    <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-3xl font-bold font-serif shadow-xl">A</div>
    <h1 className="text-3xl font-bold mb-2">Ahmed Qudah</h1>
    <p className="text-text-muted mb-8 text-lg">Computer Science Student • 3rd Year</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto">
      <div className="card text-left">
        <h3 className="font-bold mb-2">Account Settings</h3>
        <p className="text-sm text-text-muted">Manage your profile information and preferences.</p>
      </div>
      <div className="card text-left">
        <h3 className="font-bold mb-2">My Activity</h3>
        <p className="text-sm text-text-muted">Track your shared materials and requests.</p>
      </div>
    </div>
  </div>
);

import { MaterialProvider } from './context/MaterialContext';

function App() {
  return (
    <MaterialProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<GiverDashboard />} />
            <Route path="/browse" element={<ReceiverDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tester" element={<LoadTester />} />
          </Routes>
        </Layout>
      </Router>
    </MaterialProvider>
  );
}

export default App;
