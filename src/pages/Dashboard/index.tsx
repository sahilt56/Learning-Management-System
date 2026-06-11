import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./views/DashboardOverview";
import ClassSchedule from "./views/ClassSchedule";
import Courses from "./views/Courses";
import Assignments from "./views/Assignments";
import QuizArena from "./views/QuizArena";
import Resources from "./views/Resources";
import Certificates from "./views/Certificates";
import SettingsView from "./views/SettingsView";
import Performance from "./views/Performance";
import Community from "./views/Community";

export default function Dashboard() {
  return (
    <div className="flex bg-[#f4f7f9] text-black font-sans w-full min-h-screen">
      
      {/* LEFT COLUMN: SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/schedule" element={<ClassSchedule />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/quiz" element={<QuizArena />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/community" element={<Community />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </div>

    </div>
  );
}
