import React from 'react';
import CourseCard from './CourseCard';
import { ClipboardList, Globe, Megaphone, BookOpen, FileText } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList className="w-20 h-20 text-purple-600 drop-shadow-lg" />,
  Globe: <Globe className="w-20 h-20 text-blue-600 drop-shadow-lg" />,
  Megaphone: <Megaphone className="w-20 h-20 text-red-600 drop-shadow-lg" />,
  FileText: <FileText className="w-20 h-20 text-green-600 drop-shadow-lg" />,
  BookOpen: <BookOpen className="w-20 h-20 text-yellow-600 drop-shadow-lg" />
};

interface CourseGridProps {
  courses: Array<{
    title: string;
    professor: string;
    progress: number;
    lessonsLeft: number;
    icon: string;
    bg: string;
    active?: boolean;
  }>;
}

export default function CourseGrid({ courses }: CourseGridProps) {
  if (!courses || courses.length === 0) {
    return (
      <section>
        <h2 className="text-2xl font-black uppercase mb-4">My Courses</h2>
        <div className="bg-white border-4 border-black border-dashed rounded-xl p-8 text-center text-gray-500 font-bold">
          No courses enrolled yet.
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-black uppercase mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course, idx) => (
          <CourseCard key={idx} {...course} icon={iconMap[course.icon] || iconMap['BookOpen']} />
        ))}
      </div>
    </section>
  );
}
