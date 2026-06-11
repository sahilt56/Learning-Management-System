import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutGrid, BookOpen, Video, FileEdit, Settings, LogOut, CheckCircle, Users } from 'lucide-react';

export default function MinimalSidebar() {
  const menuItems = [
    { name: 'Overview', icon: <LayoutGrid className="w-5 h-5" />, path: '/instructor', exact: true },
    { name: 'Course Manager', icon: <BookOpen className="w-5 h-5" />, path: '/instructor/courses' },
    { name: 'Students', icon: <Users className="w-5 h-5" />, path: '/instructor/students' },
    { name: 'Live Classes', icon: <Video className="w-5 h-5" />, path: '/instructor/live' },
    { name: 'Assignments', icon: <FileEdit className="w-5 h-5" />, path: '/instructor/assignments' },
    { name: 'Grading Desk', icon: <CheckCircle className="w-5 h-5" />, path: '/instructor/grading' },
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col pt-8">
      
      {/* Brand */}
      <div className="px-8 mb-12">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">
          Instructor<span className="text-blue-600 font-light">Hub</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            end={item.exact}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-700' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 cursor-pointer transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </div>
        <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
          <LogOut className="w-5 h-5" />
          Log out
        </Link>
      </div>

    </div>
  );
}
