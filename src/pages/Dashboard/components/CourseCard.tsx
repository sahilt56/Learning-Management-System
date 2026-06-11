import React from 'react';
import { LayoutDashboard, Globe, Megaphone } from 'lucide-react';

interface CourseCardProps {
  title: string;
  professor: string;
  progress: number;
  lessonsLeft: number;
  icon: React.ReactNode;
  bg: string;
  active?: boolean;
}

export default function CourseCard({ title, professor, progress, lessonsLeft, icon, bg, active }: CourseCardProps) {
  return (
    <div className={`border-4 border-black rounded-2xl p-4 flex flex-col h-full bg-white transition-all cursor-pointer ${
      active 
        ? 'shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] border-blue-500 -translate-y-2' 
        : 'shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]'
    }`}>
      <div className={`${bg} rounded-xl aspect-video flex items-center justify-center mb-4 border-2 border-black relative overflow-hidden`}>
        {icon}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <h4 className="font-black text-lg leading-tight mb-1">{title}</h4>
          <p className="text-xs font-bold text-gray-500">Prof. {professor}</p>
        </div>
        
        <div>
          <div className="w-full bg-gray-200 border-2 border-black rounded-full h-3 mb-2 overflow-hidden">
            <div className={`${active ? 'bg-blue-600' : 'bg-black'} h-full rounded-r-full`} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="flex justify-between text-xs font-bold text-gray-600 uppercase">
            <span>Lessons left: {lessonsLeft}</span>
            <span>Completed: {progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
