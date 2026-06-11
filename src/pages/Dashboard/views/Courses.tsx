import React from 'react';
import { Search, SlidersHorizontal, PlayCircle } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { ClipboardList, Globe, Megaphone, MonitorPlay, Palette, Code } from 'lucide-react';

export default function Courses() {
  const allCourses = [
    { title: "Product Management", professor: "Linda Cruz", progress: 65, lessonsLeft: 3, icon: <ClipboardList className="w-20 h-20 text-purple-600 drop-shadow-lg" />, bg: "bg-purple-100" },
    { title: "Advanced Geography", professor: "Linda Cruz", progress: 85, lessonsLeft: 3, icon: <Globe className="w-20 h-20 text-blue-600 drop-shadow-lg" />, bg: "bg-orange-100", active: true },
    { title: "Mass Communication", professor: "Jonathan Reyes", progress: 10, lessonsLeft: 12, icon: <Megaphone className="w-20 h-20 text-red-600 drop-shadow-lg" />, bg: "bg-red-100" },
    { title: "UI/UX Mastery", professor: "Sarah Jenkins", progress: 40, lessonsLeft: 8, icon: <Palette className="w-20 h-20 text-pink-600 drop-shadow-lg" />, bg: "bg-pink-100" },
    { title: "Advanced React", professor: "Alex Dev", progress: 0, lessonsLeft: 15, icon: <Code className="w-20 h-20 text-emerald-600 drop-shadow-lg" />, bg: "bg-emerald-100" },
    { title: "Video Editing", professor: "Chris Parker", progress: 100, lessonsLeft: 0, icon: <MonitorPlay className="w-20 h-20 text-yellow-600 drop-shadow-lg" />, bg: "bg-yellow-100" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase mb-2">My Courses</h1>
          <p className="font-bold text-gray-500">Pick up right where you left off.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="bg-white border-4 border-black rounded-xl py-2 pl-10 pr-4 font-bold outline-none focus:ring-4 focus:ring-blue-400 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full md:w-64"
            />
          </div>
          <button className="bg-yellow-400 border-4 border-black rounded-xl p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            <SlidersHorizontal className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b-4 border-black pb-4 overflow-x-auto">
        <button className="bg-black text-white px-6 py-2 rounded-full font-black uppercase border-2 border-black whitespace-nowrap">In Progress (5)</button>
        <button className="bg-white text-gray-500 hover:text-black px-6 py-2 rounded-full font-black uppercase border-2 border-transparent hover:border-black transition-all whitespace-nowrap">Completed (1)</button>
        <button className="bg-white text-gray-500 hover:text-black px-6 py-2 rounded-full font-black uppercase border-2 border-transparent hover:border-black transition-all whitespace-nowrap">Saved</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allCourses.map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </div>
    </div>
  );
}
