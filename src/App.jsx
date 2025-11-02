import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Student/Signup';
import Login from './Shared/Login';
import AdminSignup from './Admin/AdminSignup';
import StudentDashboard from './Student/StudentDashboard';
import UploadProject from './Student/UploadProject';
import AdminDashboard from "./Admin/AdminDashboard";
import ExportProjects from "./Student/ExportProjects";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/student/signup" element={<Signup />} />
        {/* You can add more routes here, like dashboards */}
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/upload" element={<UploadProject />} /> 
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/export-projects" element={<ExportProjects />} />

      </Routes>
    </Router>
  );
};

export default App;
