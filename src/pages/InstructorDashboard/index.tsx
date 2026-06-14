import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MinimalSidebar from './components/MinimalSidebar';
import DashboardOverview from './views/DashboardOverview';
import CourseManager from './views/CourseManager';
import LiveClasses from './views/LiveClasses';
import AssignmentCreator from './views/AssignmentCreator';
import GradingDesk from './views/GradingDesk';
import StudentAnalytics from './views/StudentAnalytics';
import ClassroomManager from './views/ClassroomManager';
import InstructorSettings from './views/InstructorSettings';

export default function InstructorDashboard() {
  return (
    <div className="flex bg-[#FAFAFA] text-slate-800 font-sans w-full min-h-screen">
      
      {/* LEFT COLUMN: MINIMAL SIDEBAR */}
      <MinimalSidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardOverview />} />
            <Route path="/courses" element={<CourseManager />} />
            <Route path="/students" element={<StudentAnalytics />} />
            <Route path="/classrooms" element={<ClassroomManager />} />
            <Route path="/live" element={<LiveClasses />} />
            <Route path="/assignments" element={<AssignmentCreator />} />
            <Route path="/grading" element={<GradingDesk />} />
            <Route path="/settings" element={<InstructorSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
