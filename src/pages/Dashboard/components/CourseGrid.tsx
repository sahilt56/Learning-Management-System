import React from 'react';
import CourseCard from './CourseCard';
import { ClipboardList, Globe, Megaphone } from 'lucide-react';

export default function CourseGrid() {
  const courses = [
    { 
      title: "Product Management", 
      professor: "Linda Cruz", 
      progress: 65, 
      lessonsLeft: 3, 
      icon: <ClipboardList className="w-20 h-20 text-purple-600 drop-shadow-lg" />, 
      bg: "bg-purple-100" 
    },
    { 
      title: "Advanced Geography", 
      professor: "Linda Cruz", 
      progress: 85, 
      lessonsLeft: 3, 
      icon: <Globe className="w-20 h-20 text-blue-600 drop-shadow-lg" />, 
      bg: "bg-orange-100",
      active: true
    },
    { 
      title: "Mass Communication", 
      professor: "Jonathan Reyes", 
      progress: 85, 
      lessonsLeft: 3, 
      icon: <Megaphone className="w-20 h-20 text-red-600 drop-shadow-lg" />, 
      bg: "bg-red-100" 
    },
  ];

  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <CourseCard key={idx} {...course} />
        ))}
      </div>
    </section>
  );
}
