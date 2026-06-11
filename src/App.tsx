import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import LoginPage from './components/ui/animated-characters-login-page';
import SignupPage from './components/ui/animated-characters-signup-page';
import ForgotPasswordPage from './components/ui/animated-characters-forgot-password-page';
import About from './pages/About';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/instructor/*" element={<InstructorDashboard />} />
      </Routes>
    </div>
  );
}
