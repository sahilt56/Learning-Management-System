import React from 'react';
import { BookOpen, LayoutDashboard, CalendarDays, GraduationCap, ClipboardList, FolderOpen, Award, Settings, LogOut, TrendingUp, Users, BrainCircuit } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';

export default function Sidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard', exact: true },
    { name: 'Class Schedule', icon: <CalendarDays className="w-5 h-5" />, path: '/dashboard/schedule' },
    { name: 'Courses', icon: <GraduationCap className="w-5 h-5" />, path: '/dashboard/courses' },
    { name: 'Assignments', icon: <ClipboardList className="w-5 h-5" />, path: '/dashboard/assignments' },
    { name: 'Quizzes & Tests', icon: <BrainCircuit className="w-5 h-5" />, path: '/dashboard/quiz' },
    { name: 'Resources', icon: <FolderOpen className="w-5 h-5" />, path: '/dashboard/resources' },
    { name: 'Performance', icon: <TrendingUp className="w-5 h-5" />, path: '/dashboard/performance' },
    { name: 'Community', icon: <Users className="w-5 h-5" />, path: '/dashboard/community' },
    { name: 'Certificates', icon: <Award className="w-5 h-5" />, path: '/dashboard/certificates' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r-4 border-black bg-[#f0f4f8] flex flex-col min-h-screen z-10 sticky top-0">
      <Link to="/" className="p-6 flex items-center gap-3">
        <div className="bg-blue-600 border-2 border-black p-1.5 rounded text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer">
          <BookOpen className="w-6 h-6" />
        </div>
        <h1 className="font-black text-xl tracking-tight uppercase">Eduverse</h1>
      </Link>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border-2 ${
                isActive 
                  ? 'bg-blue-200 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1' 
                  : 'border-transparent text-gray-600 hover:border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 space-y-2">
        <NavLink 
          to="/dashboard/settings" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all cursor-pointer border-2 ${
              isActive 
                ? 'bg-blue-200 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-1' 
                : 'border-transparent text-gray-600 hover:border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            }`
          }
        >
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
        <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-gray-600 hover:bg-white hover:text-black border-2 border-transparent hover:border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer">
          <LogOut className="w-5 h-5" />
          Log out
        </Link>
      </div>
    </aside>
  );
}
